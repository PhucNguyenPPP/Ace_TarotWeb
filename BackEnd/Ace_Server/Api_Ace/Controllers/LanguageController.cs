using BLL.Interface;
using BLL.Services;
using Common.DTO.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : ControllerBase
    {
        private readonly ILanguageService _languageService;
        private readonly IUserService _userService;
        public LanguageController(ILanguageService languageService, IUserService userService)
        {
            _languageService = languageService;
            _userService = userService;
        }

        [HttpGet("Languages")]
        public async Task<IActionResult> GetAllLanguage()
        {
            ResponseDTO responseDTO = await _languageService.GetAllLanguage();
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

        [HttpGet("languages-tarot-reader")]
        public async Task<IActionResult> GetAllFormMeetingTarotReader(Guid userId)
        {
            var checkExist = await _userService.CheckUserExistById(userId);
            if (!checkExist)
            {
                return NotFound(new ResponseDTO("Tarot reader không tồn tại", 404, false));
            }
            var result = _languageService.GetAllLanguageOfTarotReader(userId);
            if (result.Count == 0)
            {
                return NotFound(new ResponseDTO("Tarot reader chưa đăng ký bất kỳ ngôn ngữ nào", 404, false));
            }

            return Ok(new ResponseDTO("Lấy các ngôn ngữ của tarot reader thành công", 200, true, result));
        }
    }
}
