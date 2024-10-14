using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.General;

namespace BLL.Interface
{
    public interface IDashboardService
    {
        Task<ResponseDTO> GetProfitByTimeRange(DateOnly startdate, DateOnly enddate, Guid roleid, Guid tarotReaderId);
        Task<ResponseDTO> GetRevenueByTimeRange(DateOnly startdate, DateOnly enddate, Guid roleid, Guid tarotReaderId);
        Task<ResponseDTO> GetTotalUser(string role);
        Task<ResponseDTO> GetAmountBookingByTimeRange(DateOnly startDate, DateOnly endDate, Guid roleId, Guid tarotReaderId);
        Task<ResponseDTO> GetAmountBookingCompleteByTimeRange(DateOnly startDate, DateOnly endDate, Guid roleId, Guid tarotReaderId);
    }
}
