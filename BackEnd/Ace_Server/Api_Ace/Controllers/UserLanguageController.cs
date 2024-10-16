using System.ComponentModel.DataAnnotations;
using BLL.Interface;
using BLL.Services;
using Common.DTO.General;
using Common.DTO.User;
using Common.DTO.UserLanguage;
using DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLanguageController : ControllerBase
    {
        private readonly IUserLanguageService _userLanguageService;
        public UserLanguageController(IUserLanguageService userLanguageService)
        {
            _userLanguageService = userLanguageService;
        }
        [HttpPut]
        public async Task<IActionResult> RegisterUserLanguage([Required] RegisterUserLanguageDTO registerUserLanguageDTO)
        {
            ResponseDTO responseDTO = await _userLanguageService.RegisterUserLanguage(registerUserLanguageDTO);
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
        [HttpDelete]
        public async Task<IActionResult> RemoveUserLanguage([Required]Guid userLanguageId)
        {
            ResponseDTO responseDTO = await _userLanguageService.RemoveUserLanguage(userLanguageId);
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
