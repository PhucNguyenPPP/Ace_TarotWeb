﻿using System.ComponentModel.DataAnnotations;
using BLL.Interface;
using BLL.Services;
using Common.DTO.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;
        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }
        [HttpGet("revenue")]
        public async Task<IActionResult> GetRevenueByTimeRange([Required] DateOnly startdate,
                                                                [Required] DateOnly enddate,
                                                                 [Required] Guid roleid,
                                                                 Guid tarotReaderId)
        {
            ResponseDTO responseDTO = await _dashboardService.GetRevenueByTimeRange(startdate,enddate, roleid, tarotReaderId);
            if (responseDTO.IsSuccess == false)
            {
                if (responseDTO.StatusCode == 404)
                {
                    return NotFound(responseDTO);
                }
                else
                {
                    return BadRequest(responseDTO);
                }
            }

            return Ok(responseDTO);
        }
        [HttpGet("profit")]
        public async Task<IActionResult> GetProfitByTimeRange([Required] DateOnly startdate,
                                                                [Required] DateOnly enddate,
                                                                 [Required] Guid roleid,
                                                                 Guid tarotReaderId)
        {
            ResponseDTO responseDTO = await _dashboardService.GetProfitByTimeRange(startdate, enddate, roleid, tarotReaderId);
            if (responseDTO.IsSuccess == false)
            {
                if (responseDTO.StatusCode == 404)
                {
                    return NotFound(responseDTO);
                }
                else
                {
                    return BadRequest(responseDTO);
                }
            }

            return Ok(responseDTO);
        }
        [HttpGet("profit-of-month")]
        public async Task<IActionResult> GetProfitByYear([Required] int year, [Required] Guid roleid,
                                                                 Guid tarotReaderId)
        {
            ResponseDTO responseDTO = await _dashboardService.GetProfitByYear(year, roleid,tarotReaderId);
            if (responseDTO.IsSuccess == false)
            {
                if (responseDTO.StatusCode == 404)
                {
                    return NotFound(responseDTO);
                }
                else
                {
                    return BadRequest(responseDTO);
                }
            }

            return Ok(responseDTO);
        }

        [HttpGet("total-user")]
        public async Task<IActionResult> GetTotalUser(string role)
        {
            ResponseDTO responseDTO = await _dashboardService.GetTotalUser(role);
            if(responseDTO.IsSuccess == false)
            {
                if(responseDTO.StatusCode == 400)
                {
                    return NotFound(responseDTO);
                }
                else
                {
                    return BadRequest(responseDTO);
                }
            }
            return Ok(responseDTO);
        }

        [HttpGet("total-booking-created")]
        public async Task<IActionResult> GetAmountBookingByTimeRange([Required]DateOnly startDate, 
                                                                    [Required]DateOnly endDate, 
                                                                    [Required]string roleName, 
                                                                    Guid tarotReaderId)
        {
            ResponseDTO responseDTO = await _dashboardService.GetAmountBookingByTimeRange(startDate, endDate, roleName, tarotReaderId);
            if (responseDTO.IsSuccess == false)
            {
                if (responseDTO.StatusCode == 400)
                {
                    return NotFound(responseDTO);
                }
                else
                {
                    return BadRequest(responseDTO);
                }
            }
            return Ok(responseDTO);
        }

        [HttpGet("total-booking-completed")]
        public async Task<IActionResult> GetAmountBookingCompleteByTimeRange([Required] DateOnly startDate,
                                                                    [Required] DateOnly endDate,
                                                                    [Required] string roleName,
                                                                    Guid tarotReaderId)
        {
            ResponseDTO responseDTO = await _dashboardService.GetAmountBookingCompleteByTimeRange(startDate, endDate, roleName, tarotReaderId);
            if (responseDTO.IsSuccess == false)
            {
                if (responseDTO.StatusCode == 400)
                {
                    return NotFound(responseDTO);
                }
                else
                {
                    return BadRequest(responseDTO);
                }
            }
            return Ok(responseDTO);
        }
    }
}
