using BLL.Interface;
using Common.DTO.CardPosition;
using Common.DTO.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class CardPositionController : ControllerBase
	{
		private readonly ICardPositionService _cardPositionService;
		public CardPositionController(ICardPositionService cardPositionService)
		{
			_cardPositionService = cardPositionService;
		}
		[HttpPost("meanings")]
		public async Task<IActionResult> ViewMeaningOfCards(List<CardAfterPickDTO> model,int topicId)
		{
			ResponseDTO responseDTO = await _cardPositionService.ViewMeaningOfCards(model, topicId);
			if (responseDTO.IsSuccess == false)
			{
				if (responseDTO.StatusCode == 404)
				{
					return NotFound(responseDTO);
				}
				if (responseDTO.StatusCode == 400)
				{
					return BadRequest(responseDTO);
				}
			}

			return Ok(responseDTO);
		}
	}
}
