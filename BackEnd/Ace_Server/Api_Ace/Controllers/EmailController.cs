using BLL.Interface;
using Common.DTO.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly IUserService _userService;

        public EmailController(IEmailService emailService, IUserService userService)
        {
            _emailService = emailService;
            _userService = userService;

        }

        [HttpPost("otp-email")]
        public async Task<IActionResult> SendOtpEmail(string email)
        {
            var user = await _userService.GetUserByEmail(email);
            if (user == null)
            {
                return NotFound(new ResponseDTO("Email không tồn tại", 404, false));
            }

            var otpDto = _emailService.GenerateOTP();

            await _emailService.SendOTPEmail(user.Email, user.UserName, otpDto, "ACE: OTP Code For Reseting Password");
            await _userService.SetOtp(user.Email, otpDto);
            return Ok(new ResponseDTO("Gửi otp thành công" + user.Email, 201, true, otpDto));
        }
    }
}
