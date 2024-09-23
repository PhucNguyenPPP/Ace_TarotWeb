using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.DTO.General;
using Common.DTO.Message;
using DAL.Entities;
using DAL.UnitOfWork;
using FirebaseAdmin.Messaging;

namespace BLL.Services
{
	public class MessageService:IMessageService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
		public MessageService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}
		public async Task<ResponseDTO> CreateMessage(MessageDTO message)

		{
			var mes = new DAL.Entities.Message();
			// Tạo một đối tượng Message mới với các thuộc tính cần thiết
			mes.MessageId = Guid.NewGuid();
			mes.Content = message.Content;
			mes.CreatedDate = DateTime.UtcNow;
			mes.SendUserId = message.SendUserId;
			mes.ReceiveUserId = message.ReceiveUserId;
			mes.Status = true; // Giả sử trạng thái mặc định là "đã gửi"

			// Lưu đối tượng Message vào cơ sở dữ liệu thông qua repository
			await _unitOfWork.Message.AddAsync(mes);
			bool ok = await _unitOfWork.SaveChangeAsync();
			if (ok)
			{
				return new ResponseDTO("Gửi tin nhắn thành công", 200, true, null);
			} 
			return new ResponseDTO("Gửi tin nhắn thất bại", 500, false, null);
		}
		public async Task<ResponseDTO> GetMessages(Guid per1Id, Guid per2Id)
		{
			var list = _unitOfWork.Message.GetAllByCondition(m => m.SendUserId.Equals(per1Id)|| m.SendUserId.Equals(per2Id) || m.ReceiveUserId.Equals(per1Id) || m.ReceiveUserId.Equals(per2Id)).ToList();
			var listDTO = _mapper.Map<List<MessageDTO>>(list);
			if (!listDTO.Any())
			{
				return new ResponseDTO("Không có tin nhắn giữa 2 user", 404, false, listDTO);
			}
			return new ResponseDTO("Hiển thị tin nhắn thành công", 200, true, listDTO);
		}
	}
}
