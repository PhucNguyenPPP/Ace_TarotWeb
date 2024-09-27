using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.General;
using Common.DTO.Message;
using DAL.Entities;

namespace BLL.Interface
{
	public interface IMessageService
	{
		Task<ResponseDTO> CreateMessage(MessageDTO newMessage);
		Task<ResponseDTO> GetMessages(Guid per1Id, Guid per2Id);
		List<UserChatDTO?> GetAllUserChat(Guid userId);
	}
}

