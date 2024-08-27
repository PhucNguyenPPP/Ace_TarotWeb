﻿using BLL.Interface;
using Common.DTO.General;
using Common.DTO.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IUserService _userService;
		public UserController(IUserService userService)
		{
			_userService = userService;
		}
		[HttpGet("readers")]
		public async Task<IActionResult> ViewTarotReader([FromQuery] String? readerName, int pageNumber, int rowsPerpage)
		{
			ResponseDTO responseDTO = await _userService.GetTarotReader(readerName, pageNumber, rowsPerpage);
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
		[HttpGet("reader-detail")]
		public async Task<IActionResult> ViewTarotReaderDetail([FromQuery] Guid userId)
		{
			ResponseDTO responseDTO = await _userService.GetTarotReaderDetailById(userId);
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
	}
}

