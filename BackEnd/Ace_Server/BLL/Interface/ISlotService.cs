using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.General;
using Common.DTO.Slot;
using DAL.Entities;

namespace BLL.Interface
{
	public interface ISlotService
	{
		Task<ResponseDTO> AddSlot(DateOnly start, DateOnly end);
		List<SlotResponseSystemDTO> GetAllSlotOfSystem();
		
	}
}
