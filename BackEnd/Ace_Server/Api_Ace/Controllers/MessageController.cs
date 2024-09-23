using BLL.Interface;
using BLL.Services;
using Common.DTO.General;
using Common.DTO.Message;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MessageController : ControllerBase
	{
		private readonly IMessageService _messageService;
		public MessageController(IMessageService messageService)
		{
			_messageService = messageService;
		}
		[HttpGet("messages")]
		public async Task<IActionResult> GetMessage(Guid user1, Guid user2)
		{
			ResponseDTO responseDTO = await _messageService.GetMessages(user1,user2);
			if (responseDTO.IsSuccess == false)
			{
				if (responseDTO.StatusCode == 404)
				{
					return NotFound(responseDTO);
				}
				if (responseDTO.StatusCode == 500 || responseDTO.StatusCode ==400)
				{
					return BadRequest(responseDTO);
				}
			}

			return Ok(responseDTO);
		}
		[HttpPost("message")]
		public async Task<IActionResult> CreateMessage([FromForm] MessageDTO messageDTO)
		{
			ResponseDTO responseDTO = await _messageService.CreateMessage(messageDTO);
			if (responseDTO.IsSuccess == false)
			{
				if (responseDTO.StatusCode == 404)
				{
					return NotFound(responseDTO);
				}
				if (responseDTO.StatusCode == 500 || responseDTO.StatusCode == 400)
				{
					return BadRequest(responseDTO);
				}
			}

			return Ok(responseDTO);
		}
	}
}
