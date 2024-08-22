using BLL.Interface;
using Common.DTO.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CardTypeController : ControllerBase
	{
		private readonly ICardTypeService _cardTypeService;
		public CardTypeController(ICardTypeService cardTypeService)
		{
			_cardTypeService = cardTypeService;
		}
		[HttpGet("card-types")]
		public async Task<IActionResult> ViewCardTypeList()
		{
			ResponseDTO responseDTO = await _cardTypeService.ViewCardTypeList();
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
