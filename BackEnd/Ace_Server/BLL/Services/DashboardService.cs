using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.Constant;
using Common.DTO.General;
using DAL.Entities;
using DAL.UnitOfWork;
using Swashbuckle.AspNetCore.Filters;

namespace BLL.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        public DashboardService(IUnitOfWork unitOfWork, IMapper mapper, IUserService userService, IBookingService bookingService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<ResponseDTO> GetRevenueByTimeRange(DateOnly startdate, DateOnly enddate, Guid roleid, Guid tarotReaderId)
        {
            var readerRole =  await _userService.GetReaderRole();
            if (roleid.Equals(readerRole.RoleId))
            {
                if (tarotReaderId == Guid.Empty)
                {
                    return new ResponseDTO("Vui lòng nhập Tarot reader Id", 400, false);
                }
                else
                {
                    var tarotReader = await _userService.GetUserDetailById(tarotReaderId);    
                    if(tarotReader == null)
                    {
                        return new ResponseDTO("Không tồn tại Tarot Reader này", 404, false);
                    }    
                }
            }
            var list = _unitOfWork.Booking.GetAllByCondition( b=>
             b.StartTime.Date >= startdate.ToDateTime(TimeOnly.MinValue)
            && (b.StartTime.Date <= enddate.ToDateTime(TimeOnly.MinValue)));
            list = list.Where(b => b.Status == BookingStatus.Refunded || b.Status == BookingStatus.ComplaintSuccessfully || b.Status == BookingStatus.Completed);
            decimal sum = 0;
            if(tarotReaderId != Guid.Empty)
            {
                list = list.Where(b=>b.TarotReaderId.Equals(tarotReaderId));
            }
            foreach (var item in list)
            {
                if (item.Status == BookingStatus.Refunded || item.Status == BookingStatus.ComplaintSuccessfully)
                {
                    item.Price = (decimal)(item.Price - (item.Price * item.ComplaintRefundPercentage / 100));
                }
                sum += item.Price;
            }
            return new ResponseDTO("Lấy tổng doanh thu theo thời gian thành công", 200, true,sum);
        }
    }
}
