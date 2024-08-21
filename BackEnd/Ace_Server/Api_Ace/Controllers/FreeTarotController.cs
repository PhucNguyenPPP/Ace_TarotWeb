using BLL.Interface;
using BLL.Services;
using Common.DTO.Card;
using Common.DTO.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FreeTarotController : ControllerBase
    {
        private readonly IFreeTarotService _freeTarotService;
        public FreeTarotController(IFreeTarotService freeTarotService)
        {
            _freeTarotService = freeTarotService;
        }
        [HttpPost("GetRandomCard")]
        public async Task<IActionResult> GetRandomCard(int cardType)
        {
            ResponseDTO responseDTO = await _freeTarotService.GetRandomCard(cardType);
            if (responseDTO.IsSuccess == false)
            {
                return BadRequest(responseDTO);
            }
            else
            {
                return Ok(responseDTO);
            }
        }
    }
}
