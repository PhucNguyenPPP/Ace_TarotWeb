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
        public FormMeetingController(IFormMeetingService formMeetingService)
        {
            _formMeetingService = formMeetingService;
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
    }
}
