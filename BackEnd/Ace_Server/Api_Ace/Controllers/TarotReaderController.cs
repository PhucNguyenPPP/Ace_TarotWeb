using BLL.Interface;
using Common.DTO.General;
using Common.DTO.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TarotReaderController : ControllerBase
	{
		private readonly ITarotReaderService _tarotReaderService;
		public TarotReaderController(ITarotReaderService tarotReaderService)
		{
			_tarotReaderService = tarotReaderService;
		}
		[HttpGet("readers")]
		public async Task<IActionResult> ViewTarotReader([FromQuery] String? readerName, int pageNumber,int rowsPerpage)
		{
			ResponseDTO responseDTO = await _tarotReaderService.GetTarotReader(readerName,pageNumber,rowsPerpage);
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
