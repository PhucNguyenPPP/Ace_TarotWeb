using BLL.Interface;
using BLL.Services;
using Common.DTO.CardPosition;
using Common.DTO.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SlotController : ControllerBase
	{
		private readonly ISlotService _slotService;
		public SlotController(ISlotService slotService)
		{
			_slotService = slotService;
		}
		[HttpPost("new-slots")]
		public async Task<IActionResult> AddSlot(DateOnly start, DateOnly end)//lam 24h
		{
			ResponseDTO responseDTO = await _slotService.AddSlot(start,end);
			if (responseDTO.IsSuccess == false)
			{	
				return BadRequest(responseDTO);
			}
			return Ok(responseDTO);
		}
	}
}
