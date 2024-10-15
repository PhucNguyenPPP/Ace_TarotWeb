using AutoMapper;
using BLL.Interface;
using Common.DTO.Auth;
using Common.DTO.General;
using DAL.Entities;
using DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        public AuthService(IUnitOfWork unitOfWork, IUserService userService,
            IMapper mapper, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _userService = userService;
            _mapper = mapper;
            _config = config;

        }

        public async Task<LoginResponseDTO?> CheckLogin(LoginRequestDTO loginRequestDTO)
        {
            var user = _unitOfWork.User.GetAllByCondition(x => x.UserName == loginRequestDTO.UserName)
                .Include(u => u.Role).FirstOrDefault();

            if (user == null)
            {
                return null;
            }

            if (VerifyPasswordHash(loginRequestDTO.Password, user.PasswordHash, user.Salt))
            {
                string jwtTokenId = $"JTI{Guid.NewGuid()}";

                string refreshToken = await CreateNewRefreshToken(user.UserId, jwtTokenId);

                var refreshTokenValid = _unitOfWork.RefreshToken
                    .GetAllByCondition(a => a.UserId == user.UserId
                    && a.RefreshToken1 != refreshToken)
                    .ToList();

                foreach (var token in refreshTokenValid)
                {
                    token.IsValid = false;
                }

                _unitOfWork.RefreshToken.UpdateRange(refreshTokenValid);
                await _unitOfWork.SaveChangeAsync();

                var accessToken = CreateToken(user, jwtTokenId);

                return new LoginResponseDTO
                {
                    AccessToken = accessToken,
                    User = _mapper.Map<LocalUserDTO>(user),
                    RefreshToken = refreshToken
                };
            };
            return null;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHashDb, byte[] salt)
        {
            var passwordHash = _userService.GenerateHashedPassword(password, salt);
            bool areEqual = passwordHashDb.SequenceEqual(passwordHash);
            return areEqual;
        }

        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }

        private async Task<string> CreateNewRefreshToken(Guid userId, string jwtId)
        {
            RefreshToken refreshAccessToken = new()
            {
                RefreshTokenId = Guid.NewGuid(),
                UserId = userId,
                JwtId = jwtId,
                ExpiredAt = DateTime.Now.AddHours(24),
                IsValid = true,
                RefreshToken1 = CreateRandomToken(),
            };
            await _unitOfWork.RefreshToken.AddAsync(refreshAccessToken);
            await _unitOfWork.SaveChangeAsync();
            return refreshAccessToken.RefreshToken1;
        }

        private string CreateToken(User user, string jwtId)
        {
            var roleName = user.Role.RoleName;


            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.FullName.ToString()),
                new Claim(ClaimTypes.Role, roleName.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, jwtId),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Exp, DateTime.Now.AddMinutes(60).ToString(), ClaimValueTypes.Integer64)
            };

            var key = _config.GetSection("ApiSetting")["Secret"];
            var securityKey = new SymmetricSecurityKey(System.Text.Encoding.ASCII.GetBytes(key ?? ""));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
               claims: claims,
               expires: DateTime.Now.AddMinutes(60),
               signingCredentials: credentials
           );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<TokenDTO> RefreshAccessToken(RequestTokenDTO model)
        {
            // Find an existing refresh token
            var existingRefreshToken = _unitOfWork.RefreshToken
                .GetAllByCondition(r => r.RefreshToken1 == model.RefreshToken)
                .FirstOrDefault();

            if (existingRefreshToken == null)
            {
                return new TokenDTO()
                {
                    Message = "Token không tồn tại"
                };
            }

            // Compare data from exixsting refresh and access token provided and if there is any missmatch then consider it as fraud
            var isTokenValid = GetAccessTokenData(model.AccessToken, existingRefreshToken.UserId, existingRefreshToken.JwtId);
            if (!isTokenValid)
            {
                existingRefreshToken.IsValid = false;
                await _unitOfWork.SaveChangeAsync();
                return new TokenDTO()
                {
                    Message = "Token không hợp lệ"
                };
            }

            // Check accessToken expire ?
            var tokenHandler = new JwtSecurityTokenHandler();
            var test = tokenHandler.ReadJwtToken(model.AccessToken);
            if (test == null) return new TokenDTO()
            {
                Message = "Lỗi khi tạo mới token"
            };

            var accessExpiredDateTime = test.ValidTo;
            // Sử dụng accessExpiredDateTime làm giá trị thời gian hết hạn

            if (accessExpiredDateTime > DateTime.UtcNow)
            {
                return new TokenDTO()
                {
                    Message = "Token chưa hết hạn"
                };
            }
            // When someone tries to use not valid refresh token, fraud possible

            if (!existingRefreshToken.IsValid)
            {
                var chainRecords = _unitOfWork.RefreshToken
                    .GetAllByCondition(u => u.UserId == existingRefreshToken.UserId 
                    && u.JwtId == existingRefreshToken.JwtId)
                    .ToList();

                foreach (var item in chainRecords)
                {
                    item.IsValid = false;
                }
                _unitOfWork.RefreshToken.UpdateRange(chainRecords);
                await _unitOfWork.SaveChangeAsync();
                return new TokenDTO 
                { 
                    Message = "Token không hợp lệ"
                };
            }

            // If it just expired then mark as invalid and return empty

            if (existingRefreshToken.ExpiredAt < DateTime.Now)
            {
                existingRefreshToken.IsValid = false;
                await _unitOfWork.SaveChangeAsync();
                return new TokenDTO() 
                { 
                    Message = "Token đã hết hạn"
                };
            }

            // Replace old refresh with a new one with updated expired date
            var newRefreshToken = await ReNewRefreshToken(existingRefreshToken.UserId, 
                existingRefreshToken.JwtId);

            // Revoke existing refresh token
            existingRefreshToken.IsValid = false;
            await _unitOfWork.SaveChangeAsync();
            // Generate new access token
            var user = _unitOfWork.User.GetAllByCondition(a => a.UserId == existingRefreshToken.UserId)
                .Include(u => u.Role)
                .FirstOrDefault();

            if (user == null)
            {
                return new TokenDTO();
            }

            var newAccessToken = CreateToken(user, existingRefreshToken.JwtId);

            return new TokenDTO()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
                Message = "Tạo mới token thành công"
            };
        }

        private bool GetAccessTokenData(string accessToken, Guid expectedUserId, string expectedTokenId)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwt = tokenHandler.ReadJwtToken(accessToken);
                var jwtId = jwt.Claims.FirstOrDefault(a => a.Type == JwtRegisteredClaimNames.Jti)?.Value;
                var userId = jwt.Claims.FirstOrDefault(a => a.Type == JwtRegisteredClaimNames.Sub)?.Value;
                userId = userId ?? string.Empty;
                return Guid.Parse(userId) == expectedUserId && jwtId == expectedTokenId;
            }
            catch
            {
                return false;
            }
        }

        private async Task<string> ReNewRefreshToken(Guid userId, string jwtId)
        {
            var time = _unitOfWork.RefreshToken.GetAllByCondition(a => a.JwtId == jwtId)
                .FirstOrDefault();
            RefreshToken refreshAccessToken = new()
            {
                RefreshTokenId = Guid.NewGuid(),
                UserId = userId,
                JwtId = jwtId,
                ExpiredAt = time?.ExpiredAt != null ? time.ExpiredAt : DateTime.Now.AddHours(24),
                IsValid = true,
                RefreshToken1 = CreateRandomToken(),
            };
            await _unitOfWork.RefreshToken.AddAsync(refreshAccessToken);
            await _unitOfWork.SaveChangeAsync();
            return refreshAccessToken.RefreshToken1;
        }

        public async Task<ResponseDTO> GetUserByAccessToken(string accessToken)
        {
            if (string.IsNullOrWhiteSpace(accessToken))
            {
                return new ResponseDTO("Token is empty", 400, false);
            }
            var userId = ExtractUserIdFromToken(accessToken);
            if (userId == "Token is expired")
            {
                return new ResponseDTO("Token is expired", 400, false);
            }
            if (userId == "Token is invalid")
            {
                return new ResponseDTO("Token is invalid", 400, false);
            }
            var user = await _unitOfWork.User.GetAllByCondition(c => c.UserId.ToString() == userId
            && c.Status == true).Include(c => c.Role).FirstOrDefaultAsync();
            if (user == null)
            {
                return new ResponseDTO("User not found", 400, false);
            }
            var mapUser = _mapper.Map<LocalUserDTO>(user);
            return new ResponseDTO("Get user by token successfully", 200, true, mapUser);
        }

        private string ExtractUserIdFromToken(string accessToken)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadJwtToken(accessToken);

                //token expired
                var expiration = jwtToken.ValidTo;

                if (expiration < DateTime.UtcNow)
                {
                    return "Token is expired";
                }
                else
                {
                    string userId = jwtToken.Subject;
                    return userId;
                }
            }
            catch (Exception ex)
            {
                return "Token is invalid";
            }
        }

        public async Task<bool> LogOut(string refreshToken)
        {
            // update refresh token in db (revoke token)
            var refreshTokenDb = await _unitOfWork.RefreshToken.GetByCondition(c => c.RefreshToken1 == refreshToken);

            if (refreshTokenDb != null)
            {
                refreshTokenDb.IsValid = false;

                _unitOfWork.RefreshToken.Update(refreshTokenDb);
                return await _unitOfWork.SaveChangeAsync();       
            } else
            {
                return false;
            }
        }

    }
}
