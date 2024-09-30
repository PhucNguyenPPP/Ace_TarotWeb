using BLL.Interface;
using BLL.Services;
using Common.DTO.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class UserSlotController : ControllerBase
	{
		private readonly IUserSlotService _userSlotService;
		public UserSlotController(IUserSlotService userSlotService)
		{
			_userSlotService = userSlotService;
		}
		[HttpPost("user-slots")]
		public async Task<IActionResult> PickSlot(List<Guid> slotIDs, Guid userID)//lam 24h
		{
			ResponseDTO responseDTO = await _userSlotService.PickSlot(slotIDs, userID);
			if (responseDTO.IsSuccess == false)
			{
				return BadRequest(responseDTO);
			}
			return Ok(responseDTO);
		}
		[HttpGet("slots-of-date")]
		public async Task<IActionResult> GetSlotsOfDate(DateOnly date, Guid userID)//lam 24h
		{
			ResponseDTO responseDTO = await _userSlotService.GetSlotOfDate(date, userID);
			if (responseDTO.StatusCode == 404)
			{
				return NotFound(responseDTO);
			}	
			if (responseDTO.IsSuccess == false)
			{
				return BadRequest(responseDTO);
			}
			return Ok(responseDTO);
		}
		[HttpGet("dates-of-month")]
		public async Task<IActionResult> GetSlotsOfDate(int year,int month, Guid userID)//lam 24h
		{
			ResponseDTO responseDTO = await _userSlotService.GetAvailableDateOfMonth(year,month, userID);
			if (responseDTO.StatusCode == 404)
			{
				return NotFound(responseDTO);
			}
			if (responseDTO.IsSuccess == false)
			{
				return BadRequest(responseDTO);
			}
			return Ok(responseDTO);
		}
	}
}
