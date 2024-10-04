using BLL.Interface;
using BLL.Services;
using BLL.WebSocketHandler;
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
		private readonly WebSocketHandler _webSocketHandler;
		public MessageController(IMessageService messageService, WebSocketHandler webSocketHandler)
		{
			_messageService = messageService;
			_webSocketHandler = webSocketHandler;
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
		public async Task<IActionResult> CreateMessage([FromBody] MessageDTO messageDTO)
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

            await _webSocketHandler.BroadcastMessageAsync (messageDTO.Content);

            return Ok(responseDTO);
		}

        [HttpGet("chat-users")]
        public IActionResult GetAllUserChat (Guid userId)
		{
			var result =  _messageService.GetAllUserChat(userId);
			if(result.Count > 0)
			{
				return Ok(new ResponseDTO("Lấy toàn bộ đoạn chat thành công", 200, true, result));
			} else
			{
				return NotFound(new ResponseDTO("Không tìm thấy đoạn chat nào", 404, false, result));
			}
		}
	}
}
