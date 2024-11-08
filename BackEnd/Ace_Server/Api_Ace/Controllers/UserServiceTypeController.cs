﻿using BLL.Interface;
using Common.DTO.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserServiceTypeController : ControllerBase
    {
        private readonly IUserServiceTypeService _userServiceTypeService;
        public UserServiceTypeController(IUserServiceTypeService userServiceTypeService)
        {
            _userServiceTypeService = userServiceTypeService;
        }
        [HttpGet("user_service_type")]
        public async Task<IActionResult> GetAllServiceType(Guid userId)
        {
            ResponseDTO responseDTO = _userServiceTypeService.GetAllServiceType(userId);
            if (responseDTO.IsSuccess == false)
            {
                if (responseDTO.StatusCode == 400)
                {
                    return NotFound(responseDTO);
                }
                if (responseDTO.StatusCode == 500)
                {
                    return BadRequest(responseDTO);
                }
            }

            return Ok(responseDTO);
        }

        [HttpPost("user_service_type")]
        public async Task<IActionResult> RegisterSeviceType(Guid userID, Guid serviceTypeId)
        {
            ResponseDTO responseDTO  = await _userServiceTypeService.RegisterSeviceType(userID, serviceTypeId);
            if (responseDTO.IsSuccess == false)
            {
                if (responseDTO.StatusCode == 404)
                {
                    return NotFound(responseDTO);
                }
                if (responseDTO.StatusCode == 500)
                {
                    return BadRequest(responseDTO);
                }
            }

            return Ok(responseDTO);
        }

        [HttpDelete("user_service_type")]
        public async Task<IActionResult> DeleteSeviceType(Guid userID, Guid serviceTypeId)
        {
            ResponseDTO responseDTO = await _userServiceTypeService.DeleteRegisteredSeviceType(userID, serviceTypeId);
            if (responseDTO.IsSuccess == false)
            {
                if (responseDTO.StatusCode == 404)
                {
                    return NotFound(responseDTO);
                }
                if (responseDTO.StatusCode == 500)
                {
                    return BadRequest(responseDTO);
                }
            }

            return Ok(responseDTO);
        }
    }
}
