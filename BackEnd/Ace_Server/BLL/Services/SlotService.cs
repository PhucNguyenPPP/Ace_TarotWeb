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
	public class SlotService : ISlotService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public SlotService(IUnitOfWork unitOfWork, IMapper mapper,
			IImageService imageService)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}

		public async Task<ResponseDTO> AddSlot(DateOnly start, DateOnly end)
		{
			TimeSpan slotDuration = TimeSpan.FromMinutes(30);
			DateTime startDateTime = start.ToDateTime(TimeOnly.MinValue);
			DateTime endDateTime = end.ToDateTime(TimeOnly.MinValue);
			int totalSlots = (int)((startDateTime - endDateTime).TotalMinutes / slotDuration.TotalMinutes);
			List<Slot> slots = new List<Slot>();
			for (int i = 0; i < totalSlots; i++)
			{
				DateTime startTime = start.ToDateTime(TimeOnly.MinValue).AddMinutes(i * slotDuration.TotalMinutes);
				DateTime endTime = startTime.Add(slotDuration);

				slots.Add(new Slot
				{
					SlotId = Guid.NewGuid(), // Tạo ID duy nhất
					StartTime = startTime,
					EndTime = endTime,
					Status = true // Hoặc gán giá trị mặc định khác
				});
			}
			await _unitOfWork.Slot.AddRangeAsync(slots);
			bool addslots =await  _unitOfWork.SaveChangeAsync();
			if (addslots) {
				return new ResponseDTO("Thêm các slot thành công", 200, true);
			}
			else
			{
				return new ResponseDTO("Thêm các slot thất bại", 400, false);
			}
		}
	}
}
