using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.General;

namespace BLL.Services
{
    public interface IUserSlotService
    {
        Task<ResponseDTO> PickSlot(List<Guid> slotIDs, Guid userID);
        Task<ResponseDTO> GetSlotOfDate(DateOnly date, Guid guid);
        Task<ResponseDTO> GetAvailableDateOfMonth(int year, int month, Guid userID);
    }
}
