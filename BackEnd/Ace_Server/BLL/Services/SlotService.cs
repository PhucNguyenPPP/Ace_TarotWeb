using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.DTO.General;
using Common.DTO.Slot;
using DAL.Entities;
using DAL.UnitOfWork;
using Microsoft.OpenApi.Any;
using static System.Reflection.Metadata.BlobBuilder;

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
			if (start > end)
			{
				return new ResponseDTO("Ngày kết thúc phải xa hơn ngày bắt đầu", 400, false);
			}
			TimeSpan slotDuration = TimeSpan.FromMinutes(30);
			DateTime startDateTime = start.ToDateTime(TimeOnly.MinValue);
			DateTime endDateTime = end.ToDateTime(TimeOnly.MaxValue);
			var occupiedDates =  _unitOfWork.Slot.GetAllByCondition(s => s.StartTime >= startDateTime && s.EndTime <= endDateTime)
			.Select(s => s.StartTime.Date)
			.Distinct()
			.OrderBy(d => d)
			.ToList();
			if (occupiedDates.Any()) {
				return new ResponseDTO("Đã tồn tại slot tại các ngày trong khoảng",400,false,occupiedDates);//trả ra các ngày đã có slot, có thể làm thông báo gì đó 
			}
			if (startDateTime<DateTime.Now.AddDays(2)) 
			{
				return new ResponseDTO("Ngày kết thúc phải xa hơn hiện tại ít nhất 2 ngày", 400, false); //ngày kết thúc xa hơn ngày hiện tại ít nhất 2 ngày 
			}
			int totalDays = (endDateTime - startDateTime).Days + 1;
			List<Slot> dailySlots = new List<Slot>();
			for (int day = 0; day < totalDays; day++)
			{
				DateTime dayStart = startDateTime.AddDays(day);
				DateTime dayEnd = dayStart.AddDays(1).AddMinutes(-30); 
				int daySlots = (int)((dayEnd - dayStart).TotalMinutes / slotDuration.TotalMinutes);
				for (int i = 0; i < daySlots; i++)
				{
					DateTime startTime = dayStart.AddMinutes(i * slotDuration.TotalMinutes);
					DateTime endTime = startTime.Add(slotDuration);
					dailySlots.Add(new Slot
					{
						SlotId = Guid.NewGuid(),
						StartTime = startTime,
						EndTime = endTime,
						Status = true
					});
				}
			}
			await _unitOfWork.Slot.AddRangeAsync(dailySlots);
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
