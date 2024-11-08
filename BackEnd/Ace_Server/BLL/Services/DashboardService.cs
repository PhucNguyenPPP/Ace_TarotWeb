﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.Constant;
using Common.DTO.Dashboard;
using Common.DTO.General;
using DAL.Entities;
using DAL.UnitOfWork;
using Microsoft.Identity.Client;
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

        public async Task<ResponseDTO> GetProfitByTimeRange(DateOnly startdate, DateOnly enddate, Guid roleid, Guid tarotReaderId)
        {
            var revenue = await GetRevenueByTimeRange(startdate, enddate, roleid, tarotReaderId);
            decimal revenueSum = 0;
            if (revenue.IsSuccess)
            {
                revenueSum = (decimal)revenue.Result;
            }
            else
            {
                return revenue;
            }
            var readerRole = await _userService.GetReaderRole();
            decimal profit;
            if (roleid.Equals(readerRole.RoleId))
            {
                profit = revenueSum * 70 / 100;
            }
            else
            {
                profit = revenueSum * 30 / 100;
            }
            return new ResponseDTO("Lấy thông tin lợi nhuận thành công", 200, true, profit);
        }

        public async Task<ResponseDTO> GetProfitByYear(int year)
        {
            List<ProfitByMonthDTO> list = new List<ProfitByMonthDTO>();
            var adminRole = await _userService.GetAdminRole();
            for (int i = 1; i <= 12; i++)
            {
                ProfitByMonthDTO profitByMonth = new ProfitByMonthDTO();
                profitByMonth.Month = i;
                list.Add(profitByMonth);
            }
            foreach (var item in list)
            {
                var lastDayOfMonth = new DateOnly();
                var firstDayOfNextMonth = new DateOnly();
                if (item.Month == 12)
                {
                    lastDayOfMonth = new DateOnly(year, 12, 31);
                }
                else
                {
                    firstDayOfNextMonth = new DateOnly(year, item.Month + 1, 1);
                    lastDayOfMonth = firstDayOfNextMonth.AddDays(-1);
                }
                var firstDayOfMonth = new DateOnly(year,item.Month, 1);
                var profit = await GetProfitByTimeRange(firstDayOfMonth, lastDayOfMonth,adminRole.RoleId,Guid.Empty);
                item.Profit = (decimal)profit.Result;
            }
            return new ResponseDTO("Lấy thông tin lợi nhuận theo năm thành công", 200, true, list);

        }

        public async Task<ResponseDTO> GetProfitByYear(int year, Guid roleid, Guid tarotReaderId)
        {
            List<ProfitByMonthDTO> list = new List<ProfitByMonthDTO>();
            var tarotReaderRole = await _userService.GetReaderRole();
            var adminRole = await _userService.GetAdminRole();
            if (roleid == tarotReaderRole.RoleId)
            {
                if (tarotReaderId == Guid.Empty)
                {
                    return new ResponseDTO("Vui lòng nhập Tarot Reader Id", 400, false);
                }
            }
            else if (roleid != adminRole.RoleId)
            {
                return new ResponseDTO("Vui lòng nhập Role hợp lệ", 400, false);
            }
            for (int i = 1; i <= 12; i++)
            {
                ProfitByMonthDTO profitByMonth = new ProfitByMonthDTO();
                profitByMonth.Month = i;
                list.Add(profitByMonth);
            }
            foreach (var item in list)
            {
                var lastDayOfMonth = new DateOnly();
                var firstDayOfNextMonth = new DateOnly();
                if (item.Month == 12)
                {
                    lastDayOfMonth = new DateOnly(year, 12, 31);
                }
                else
                {
                    firstDayOfNextMonth = new DateOnly(year, item.Month + 1, 1);
                    lastDayOfMonth = firstDayOfNextMonth.AddDays(-1);
                }
                var firstDayOfMonth = new DateOnly(year, item.Month, 1);
                var profit = await GetProfitByTimeRange(firstDayOfMonth, lastDayOfMonth, roleid, tarotReaderId);
                item.Profit = (decimal)profit.Result;
            }
            return new ResponseDTO("Lấy thông tin lợi nhuận theo năm thành công", 200, true, list);
        }

        public async Task<ResponseDTO> GetRevenueByTimeRange(DateOnly startdate, DateOnly enddate, Guid roleid, Guid tarotReaderId)
        {
            var readerRole = await _userService.GetReaderRole();
            if (roleid.Equals(readerRole.RoleId))
            {
                if (tarotReaderId == Guid.Empty)
                {
                    return new ResponseDTO("Vui lòng nhập Tarot reader Id", 400, false);
                }
                else
                {
                    var tarotReader = await _userService.GetUserDetailById(tarotReaderId);
                    if (tarotReader == null)
                    {
                        return new ResponseDTO("Không tồn tại Tarot Reader này", 404, false);
                    }
                }
            }
            var list = _unitOfWork.Booking.GetAllByCondition(b =>
             b.StartTime.Date >= startdate.ToDateTime(TimeOnly.MinValue)
            && (b.StartTime.Date <= enddate.ToDateTime(TimeOnly.MinValue)));
            list = list.Where(b => b.Status == BookingStatus.Refunded || b.Status == BookingStatus.ComplaintSuccessfully || b.Status == BookingStatus.Completed);
            decimal sum = 0;
            if (tarotReaderId != Guid.Empty)
            {
                list = list.Where(b => b.TarotReaderId.Equals(tarotReaderId));
            }
            foreach (var item in list)
            {
                if (item.Status == BookingStatus.Refunded || item.Status == BookingStatus.ComplaintSuccessfully)
                {
                    item.Price = (decimal)(item.Price - (item.Price * item.ComplaintRefundPercentage / 100));
                }
                sum += item.Price;
            }
            return new ResponseDTO("Lấy tổng doanh thu theo thời gian thành công", 200, true, sum);
        }

        public async Task<ResponseDTO> GetTotalUser(string role)
        {
            if (role.Equals(RoleConstant.Customer))
            {
                List<User> customer = _unitOfWork.User.GetAllByCondition(c => c.Role.RoleName.ToUpper().Equals(RoleConstant.Customer.ToUpper())).ToList();
                return new ResponseDTO("Lấy tổng khách hàng thành công!", 200, true, customer.Count);
            }else if(role.Equals(RoleConstant.TarotReader))
            {
                List<User> reader = _unitOfWork.User.GetAllByCondition(c=> c.Role.RoleName.ToUpper().Equals(RoleConstant.TarotReader.ToUpper())).ToList();
                return new ResponseDTO("Lấy tổng Tarot Reader thành công!", 200, true, reader.Count);
            }
            return new ResponseDTO("Role không hợp lệ!", 400, false);
        }

        public async Task<ResponseDTO> GetAmountBookingByTimeRange(DateOnly startDate, DateOnly endDate, string roleName, Guid tarotReaderId)
        {
            
            if (roleName.ToUpper().Equals(RoleConstant.Admin.ToUpper()))
            {
                var booking = _unitOfWork.Booking.
                    GetAllByCondition(c =>
                    c.CreatedDate.Date >= startDate.ToDateTime(TimeOnly.MinValue) &&
                    c.CreatedDate.Date <= endDate.ToDateTime(TimeOnly.MinValue))
                    .ToList();
                return new ResponseDTO("Lấy tổng đơn hàng theo thời gian thành công", 200, true, booking.Count);
            }
            else if (roleName.ToUpper().Equals(RoleConstant.TarotReader.ToUpper()))
            {
                if(tarotReaderId == Guid.Empty)
                {
                    return new ResponseDTO("Vui lòng nhập Tarot Reader ID!", 400, false);
                }
                var booking = _unitOfWork.Booking.
                    GetAllByCondition(c =>
                    c.CreatedDate.Date >= startDate.ToDateTime(TimeOnly.MinValue) &&
                    c.CreatedDate.Date <= endDate.ToDateTime(TimeOnly.MinValue) &&
                    c.TarotReaderId == tarotReaderId)
                    .ToList();
                return new ResponseDTO("Lấy tổng đơn hàng theo thời gian thành công", 200, true, booking.Count);
            }
            return new ResponseDTO("Role không hợp lệ!", 400, false);
        }

        public async Task<ResponseDTO> GetAmountBookingCompleteByTimeRange(DateOnly startDate, DateOnly endDate, string roleName, Guid tarotReaderId)
        {
            if (roleName.ToUpper().Equals(RoleConstant.Admin.ToUpper()))
            {
                var booking = _unitOfWork.Booking.
                    GetAllByCondition(c => c.Status.Equals(BookingStatus.Completed) &&
                    c.EndDate.Value.Date >= startDate.ToDateTime(TimeOnly.MinValue) &&
                    c.EndDate.Value.Date <= endDate.ToDateTime(TimeOnly.MinValue))
                    .ToList();
                return new ResponseDTO("Lấy tổng đơn hàng hoàn thành theo thời gian thành công", 200, true, booking.Count);
            }
            else if (roleName.ToUpper().Equals(RoleConstant.TarotReader.ToUpper()))
            {
                if (tarotReaderId == Guid.Empty)
                {
                    return new ResponseDTO("Vui lòng nhập Tarot Reader ID!", 400, false);
                }
                var booking = _unitOfWork.Booking.
                    GetAllByCondition(c => c.Status.Equals(BookingStatus.Completed) &&
                    c.EndDate.Value.Date >= startDate.ToDateTime(TimeOnly.MinValue) &&
                    c.EndDate.Value.Date <= endDate.ToDateTime(TimeOnly.MinValue) &&
                    c.TarotReaderId == tarotReaderId)
                    .ToList();
                return new ResponseDTO("Lấy tổng đơn hàng hoàn thành theo thời gian thành công", 200, true, booking.Count);
            }
            return new ResponseDTO("Role không hợp lệ!", 400, false);
        }
    }
}
