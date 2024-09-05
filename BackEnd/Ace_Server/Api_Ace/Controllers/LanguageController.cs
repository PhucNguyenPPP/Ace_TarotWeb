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
        public LanguageController(ILanguageService languageService)
        {
            _languageService = languageService;
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
    }
}
