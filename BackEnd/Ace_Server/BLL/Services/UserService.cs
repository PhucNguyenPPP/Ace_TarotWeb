using AutoMapper;
using BLL.Interface;
using Common.Constant;
using Common.DTO.General;
using Common.DTO.User;
using DAL.Entities;
using DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;
        public UserService(IUnitOfWork unitOfWork, IMapper mapper,
            IImageService imageService)
        {
            _unitOfWork = unitOfWork;   
            _mapper = mapper;
            _imageService = imageService;
        }

        public async Task<ResponseDTO> CheckValidationSignUpCustomer(SignUpCustomerRequestDTO model)
        {
            if(model.DateOfBirth >= DateTime.Now)
            {
                return new ResponseDTO("Ngày sinh không hợp lệ", 400, false);
            }

            if(model.Gender != GenderConstant.Male && model.Gender != GenderConstant.Female
                && model.Gender != GenderConstant.Other)
            {
                return new ResponseDTO("Giới tính không hợp lệ", 400, false);
            }

            var checkUserNameExist = CheckUserNameExist(model.UserName);
            if(checkUserNameExist)
            {
                return new ResponseDTO("Tên đăng nhập đã tồn tại", 400, false);
            }

            var checkEmailExist = CheckEmailExist(model.Email);
            if (checkEmailExist)
            {
                return new ResponseDTO("Email đã tồn tại", 400, false);
            }

            var checkPhoneExist = CheckPhoneExist(model.Phone);
            if (checkPhoneExist)
            {
                return new ResponseDTO("Số điện thoại đã tồn tại", 400, false);
            }

            return new ResponseDTO("Check thành công", 200, true);
        }

        public async Task<bool> SignUpCustomer(SignUpCustomerRequestDTO model)
        {
            var customer =  _mapper.Map<User>(model);
            var role = await GetCustomerRole();
            if(role == null)
            {
                return false;
            }
            var salt = GenerateSalt();
            var passwordHash = GenerateHashedPassword(model.Password, salt);
            var avatarLink = await _imageService.StoreImageAndGetLink(model.AvatarLink);

            customer.UserId = Guid.NewGuid();
            customer.RoleId = role.RoleId;
            customer.Salt = salt;
            customer.PasswordHash = passwordHash;
            customer.AvatarLink = avatarLink;
            customer.Status = true;
            
            await _unitOfWork.User.AddAsync(customer);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<Role?> GetCustomerRole()
        {
            var result = await _unitOfWork.Role.GetByCondition(c => c.RoleName == RoleConstant.Customer);
            return result;
        }

        public byte[] GenerateSalt()
        {
            byte[] saltBytes = new byte[32];
            var rng = RandomNumberGenerator.Create();
            rng.GetNonZeroBytes(saltBytes);
            return saltBytes;
        }

        public byte[] GenerateHashedPassword(string password, byte[] saltBytes)
        {
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] passwordWithSaltBytes = new byte[passwordBytes.Length + saltBytes.Length];

            for (int i = 0; i < passwordBytes.Length; i++)
            {
                passwordWithSaltBytes[i] = passwordBytes[i];
            }

            for (int i = 0; i < saltBytes.Length; i++)
            {
                passwordWithSaltBytes[passwordBytes.Length + i] = saltBytes[i];
            }

            var cryptoProvider = SHA512.Create();
            byte[] hashedBytes = cryptoProvider.ComputeHash(passwordWithSaltBytes);

            return hashedBytes;
        }

        public bool CheckUserNameExist(string userName)
        {
            var userList = _unitOfWork.User.GetAll();
            if(userList.Any(c => c.UserName == userName))
            {
                return true;
            }
            return false;
        }

        public bool CheckEmailExist(string email)
        {
            var userList = _unitOfWork.User.GetAll();
            if (userList.Any(c => c.Email == email))
            {
                return true;
            }
            return false;
        }

        public bool CheckPhoneExist(string phone)
        {
            var userList = _unitOfWork.User.GetAll();
            if (userList.Any(c => c.Phone == phone))
            {
                return true;
            }
            return false;
        }
    }
}
