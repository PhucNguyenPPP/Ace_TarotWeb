using Common.DTO.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Common.DTO.General;
using BLL.Interface;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("new-customer")]
        public async Task<IActionResult> SignUpCustomer([FromForm] SignUpCustomerRequestDTO model)
        {
            if(!ModelState.IsValid)
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
            } else
            {
                return BadRequest(new ResponseDTO("Đăng kí không thành công", 400, true, null));
            }
        }

    }
}
