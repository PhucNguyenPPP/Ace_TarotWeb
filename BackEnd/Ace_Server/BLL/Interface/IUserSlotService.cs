using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.General;

namespace BLL.Interface
{
	public interface IUserSlotService
	{
		Task<ResponseDTO> PickSlot(List<Guid> slotIDs, Guid userID);
		Task<ResponseDTO> GetSlotOfDate(DateOnly date, Guid guid);
	}
}
