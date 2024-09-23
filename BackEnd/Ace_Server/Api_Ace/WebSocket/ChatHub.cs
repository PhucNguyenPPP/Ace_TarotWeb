using BLL.Interface;
using Common.DTO.Message;
using DAL.Entities;
using Microsoft.AspNetCore.SignalR;

namespace Api_Ace.WebSocket
{
	public class ChatHub:Hub
	{
		private readonly IMessageService _messageService;

		public ChatHub(IMessageService messageService)
		{
			_messageService = messageService;
		}
		public async Task SendMessage(Guid recipientId, string message,Guid senderId)
		{
			var newMessage = new MessageDTO
			{
				// ...
				SendUserId = senderId,  

				ReceiveUserId = recipientId
			};

			await _messageService.CreateMessage(newMessage);
			// Gửi tin nhắn đến người nhận cụ thể
			await Clients.Client(recipientId.ToString()).SendAsync("ReceiveMessage", message);
		}
	}
}

