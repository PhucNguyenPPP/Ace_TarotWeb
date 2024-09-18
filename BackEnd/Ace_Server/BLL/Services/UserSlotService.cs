using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.DTO.General;
using Common.DTO.UserSlot;
using DAL.Entities;
using DAL.UnitOfWork;
using Microsoft.IdentityModel.Tokens;
using static System.Reflection.Metadata.BlobBuilder;

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

		public async Task<ResponseDTO> GetAvailableDateOfMonth(int year, int month, Guid userID)
		{
			var firstDayOfMonth = new DateTime(year, month, 1);
			var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
			var slots = _unitOfWork.Slot
				.GetAllByCondition(s => s.StartTime.Date >= firstDayOfMonth.Date && s.StartTime.Date <= lastDayOfMonth.Date && s.StartTime.Date > DateTime.Now)
				.Select(s=>s.SlotId);
			var slotOfUser = _unitOfWork.UserSlot.GetAllByCondition(uslot => slots.Contains(uslot.SlotId) && uslot.UserId.Equals(userID) && uslot.Status.Equals(true)).Select(s => s.SlotId);
			var dateOfMonth = _unitOfWork.Slot.GetAllByCondition(s => slotOfUser.Contains(s.SlotId)).GroupBy(s => s.StartTime.Date)
			.Where(g => g.Any(s => s.Status))
			.Select(g => g.Key);
			if (dateOfMonth.Count() > 0)
			{
				return new ResponseDTO("Lấy các ngày trống lịch của Tarot Reader thành công", 200, true, dateOfMonth);
			}
			return new ResponseDTO("Không tìm được ngày trống lịch trong tháng của Tarot Reader", 404, false);
		}

		public async Task<ResponseDTO> GetSlotOfDate(DateOnly date, Guid guid)
		{
			var slotList = _unitOfWork.Slot.GetAllByCondition(s => s.StartTime.Date == date.ToDateTime(TimeOnly.MinValue).Date).Select(s => s.SlotId).ToList();
			var userSlotList = _unitOfWork.UserSlot.GetAllByCondition(uslot => slotList.Contains(uslot.SlotId));
			var listDTO = _mapper.Map<List<UserSlotOfDateDTO>>(userSlotList);
			if (listDTO.Count() > 0)
			{
				foreach (var item in listDTO)
				{
					Slot? slot = await _unitOfWork.Slot.GetByCondition(s => s.SlotId.Equals(item.SlotId));
					if (slot != null)
					{
						int startHour = slot.StartTime.Hour;
						int startMin = slot.StartTime.Minute;
						string startString;
						if (startMin == 0)
						{
							startString = $"{startHour}:{startMin}0";
						}
						else
						{
							startString = $"{startHour}:{startMin}";
						}
						int endHour = slot.EndTime.Hour;
						int endMin = slot.EndTime.Minute;
						string endString;
						if(endMin == 0)
						{
							endString = $"{endHour}:{endMin}0";
						}
						else
						{
							endString = $"{endHour}:{endMin}";
						}
						if (!startString.IsNullOrEmpty() & !endString.IsNullOrEmpty())
						{
							item.StartTime = startString;
							item.EndTime = endString;
						}
						else
						{
							return new ResponseDTO("Không thể lấy được giờ của slot", 500, false);
						}
					}
				}

				return new ResponseDTO("Hiện slot theo ngày của Tarot Reader thành công", 200, true, listDTO);
			}
			else
			{
				return new ResponseDTO("Không tìm thấy slot trống theo ngày đã chọn", 404, false);
			}
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
			var deletedSlot = _unitOfWork.Slot.GetAllByCondition(slot => slotIDs.Contains(slot.SlotId) && slot.Status.Equals(false));
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
