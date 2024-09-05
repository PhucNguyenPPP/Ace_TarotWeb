using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.DTO.General;
using DAL.Entities;
using DAL.UnitOfWork;

namespace BLL.Services
{
	public class UserSlotService : IUserSlotService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public UserSlotService(IUnitOfWork unitOfWork, IMapper mapper,
			IImageService imageService)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}
		public async Task<ResponseDTO> PickSlot(List<Guid> slotIDs, Guid userID)
		{
			var expiredSlot = _unitOfWork.Slot.GetAllByCondition(slot => slotIDs.Contains(slot.SlotId) && slot.StartTime.Date <= DateTime.Now.Date);
			if (expiredSlot.Any())
			{
				return new ResponseDTO("Không được chọn slot trong các ngày ở quá khứ hoặc hiện tại", 400, false, expiredSlot); //expiredSlot là các slot trong quá khứ
			}
			var pickedSlot = _unitOfWork.UserSlot.GetAllByCondition(u => u.UserId == userID && slotIDs.Contains(u.SlotId));
			if (pickedSlot.Any())
			{
				return new ResponseDTO("Không được đăng ký lại các slot đã đăng ký trước đó", 400, false, pickedSlot);
			}
			var deletedSlot = _unitOfWork.Slot.GetAllByCondition(slot => slotIDs.Contains(slot.SlotId) && slot.Status.Equals(true));
			if (deletedSlot.Any()) 
			{
				return new ResponseDTO("Không được đăng ký các slot đã bị xoá bởi admin", 400, false, deletedSlot);
			}
			List<UserSlot> userSlots = new List<UserSlot>();
			foreach (var slot in slotIDs) 
			{
				UserSlot userSlot = new UserSlot();
				userSlot.UserSlotId = Guid.NewGuid();
				userSlot.UserId = userID;
				userSlot.SlotId = slot;
				userSlot.Status = true; //có slot nhưng chưa có khách book lịch, false là đã có khách book lịch, delete slot là xoá thẳng, không update status
				userSlots.Add(userSlot);
			}
			await _unitOfWork.UserSlot.AddRangeAsync(userSlots);
			bool picked = await _unitOfWork.SaveChangeAsync();
			if (!picked)
			{
				return new ResponseDTO("Không đăng ký slot thành công", 500, false);
			}
			return new ResponseDTO("Đăng ký slot thành công", 200, true);
		}
	}
}
