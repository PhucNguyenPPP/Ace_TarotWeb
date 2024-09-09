using Common.DTO.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Common.DTO.General;
using BLL.Interface;
using Common.DTO.Auth;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        public AuthController(IUserService userService, IAuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }
        [HttpPost("new-customer")]
        public async Task<IActionResult> SignUpCustomer([FromForm] SignUpCustomerRequestDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO(ModelState.ToString() ?? "Unknow error", 400, false, null));
            }

            var checkValid = await _userService.CheckValidationSignUpCustomer(model);
            if (!checkValid.IsSuccess)
            {
                return BadRequest(checkValid);
            }

            var signUpResult = await _userService.SignUpCustomer(model);
            if (signUpResult)
            {
                return Ok(new ResponseDTO("Đăng kí thành công", 200, true, null));
            }
            else
            {
                return BadRequest(new ResponseDTO("Đăng kí không thành công", 400, true, null));
            }
        }
        [HttpPost("new-reader")]
        public async Task<IActionResult> SignUpReader([FromForm] SignUpReaderRequestDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO(ModelState.ToString() ?? "Unknow error", 400, false, null));
            }

            var checkValid = await _userService.CheckValidationSignUpReader(model);
            if (!checkValid.IsSuccess)
            {
                return BadRequest(checkValid);
            }

            var signUpResult = await _userService.SignUpReader(model);
            if (signUpResult)
            {
                return Ok(new ResponseDTO("Đăng kí thành công", 200, true, null));
            }
            else
            {
                return BadRequest(new ResponseDTO("Đăng kí không thành công", 400, true, null));
            }
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginRequestDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO(ModelState.ToString() ?? "Unknown error", 400, false, ModelState));
            }
            var result = await _authService.CheckLogin(loginRequestDTO);
            if (result != null)
            {
                return Ok(new ResponseDTO("Đăng nhập thành công", 200, true, result));
            }
            return BadRequest(new ResponseDTO("Đăng nhập thất bại", 400, false));
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> GetNewTokenFromRefreshToken([FromBody] RequestTokenDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO(ModelState.ToString() ?? "Unknown error", 400, false));
            }

            var result = await _authService.RefreshAccessToken(model);
            if (result == null || string.IsNullOrEmpty(result.AccessToken))
            {
                return BadRequest(new ResponseDTO("Tạo refresh token thất bại", 400, false, result));
            }
            return Ok(new ResponseDTO("Tạo refresh token thành công", 200, true, result));
        }

        [HttpGet("/user/access-token/{accessToken}")]
        public async Task<IActionResult> GetUserByToken(string accessToken)
        {
            var result = await _authService.GetUserByAccessToken(accessToken);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }

        [HttpGet("/otp-verifying")]
        public async Task<IActionResult> VerifyingOtp(string email, string otp)
        {
            var result = await _userService.VerifyingOtp(email, otp);
            if(result)
            {
                return Ok(new ResponseDTO("OTP hợp lệ", 200, true));
            }
            return BadRequest(new ResponseDTO("OTP không hợp lệ", 400, false));
        }

        [HttpPost("password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO(ModelState.ToString() ?? "Unknown error", 400, false));
            }

            var result = await _userService.ChangePassword(model);
            if(result)
            {
                return Ok(new ResponseDTO("Thay đổi mật khẩu thành công", 200, true));
            }
            return BadRequest(new ResponseDTO("Thay đổi mật khẩu không thành công", 400, false));
        } 
    }
}
