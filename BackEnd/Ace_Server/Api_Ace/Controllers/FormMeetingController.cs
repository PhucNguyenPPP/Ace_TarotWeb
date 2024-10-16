using BLL.Interface;
using BLL.Services;
using Common.DTO.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormMeetingController : ControllerBase
    {
        private readonly IFormMeetingService _formMeetingService;
        private readonly IUserService _userService;
        public FormMeetingController(IFormMeetingService formMeetingService, IUserService userService)
        {
            _formMeetingService = formMeetingService;
            _userService = userService;
        }
        [HttpGet("form_meetings")]
        public async Task<IActionResult> GetAllFormMeeting()
        {
            ResponseDTO responseDTO = await _formMeetingService.GetAllFormMeeting();
            if (responseDTO.IsSuccess == false)
            {
                if (responseDTO.StatusCode == 400)
                {
                    return NotFound(responseDTO);
                }
                if (responseDTO.StatusCode == 500)
                {
                    return BadRequest(responseDTO);
                }
            }

            return Ok(responseDTO);
        }

        [HttpGet("form-meetings-tarot-reader")]
        public async Task<IActionResult> GetAllFormMeetingTarotReader(Guid userId)
        {
            var checkExist = await _userService.CheckUserExistById(userId);
            if (!checkExist)
            {
                return NotFound(new ResponseDTO("Tarot reader không tồn tại", 404, false));
            }
            var result = _formMeetingService.GetAllFormMeetingOfTarotReader(userId);
            if(result.Count == 0)
            {
                return NotFound(new ResponseDTO("Tarot reader chưa đăng ký bất kỳ hình thức nào", 404, false));
            }

            return Ok(new ResponseDTO("Lấy các hình thức của tarot reader thành công", 200, true, result));
        }

        [HttpPost("user_service_type")]
        public async Task<IActionResult> RegisteredFormMeeting(Guid userID, Guid formMeetingId)
        {
            ResponseDTO responseDTO = await _formMeetingService.RegisteredFormMeeting(userID, formMeetingId);
            if (responseDTO.IsSuccess == false)
            {
                if (responseDTO.StatusCode == 404)
                {
                    return NotFound(responseDTO);
                }
                if (responseDTO.StatusCode == 500)
                {
                    return BadRequest(responseDTO);
                }
            }

            return Ok(responseDTO);
        }

        [HttpDelete("user_service_type")]
        public async Task<IActionResult> DeleteFormMeeting(Guid userID, Guid formMeetingId)
        {
            ResponseDTO responseDTO = await _formMeetingService.DeleteFormMeeting(userID, formMeetingId);
            if (responseDTO.IsSuccess == false)
            {
                if (responseDTO.StatusCode == 404)
                {
                    return NotFound(responseDTO);
                }
                if (responseDTO.StatusCode == 500)
                {
                    return BadRequest(responseDTO);
                }
            }

            return Ok(responseDTO);
        }
    }
}
