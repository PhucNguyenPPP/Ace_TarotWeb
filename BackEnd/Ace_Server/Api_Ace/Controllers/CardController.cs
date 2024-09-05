using BLL.Interface;
using Common.DTO.Card;
using Common.DTO.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ICardService _cardService;
        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpPost("new-card")]
        public async Task<IActionResult> AddCard([FromForm] CardRequestDTO model)
        {
            var result = await _cardService.AddCard(model);
            if(result)
            {
                return Ok(new ResponseDTO("Tạo thẻ bài thành công", 200, true));
            } else
            {
                return BadRequest(new ResponseDTO("Tạo thẻ bài thất bại", 400, false));
            }
        }
        [HttpPost("GetRandomCard")]
        public async Task<IActionResult> GetRandomCard(int cardType)
        {
            ResponseDTO responseDTO = await _cardService.GetRandomCard(cardType);
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
