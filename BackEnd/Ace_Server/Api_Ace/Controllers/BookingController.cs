using BLL.Interface;
using BLL.Services;
using Common.DTO.Booking;
using Common.DTO.General;
using Common.DTO.User;
using DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost("new-booking")]
        public async Task<IActionResult> CreateBooking([FromBody] BookingDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO(ModelState.ToString() ?? "Unknow error", 400, false, null));
            }

            var checkValid = await _bookingService.CheckValidationCreateBooking(model);
            if (!checkValid.IsSuccess)
            {
                return BadRequest(checkValid);
            }

            var bookingResult = await _bookingService.CreateBooking(model);
            if (bookingResult.IsSuccess)
            {
                return Ok(bookingResult);
            }
            else
            {
                return BadRequest(bookingResult);
            }
        }

        [HttpGet("booking-detail")]
        public async Task<IActionResult> GetBookingDetail([FromBody] Guid bookingId)
        {
            ResponseDTO responseDTO = _bookingService.GetBookingDetail(bookingId);
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

        [HttpPost("create-feedback")]
        public async Task<IActionResult> CreateFeedback(Guid bookingId, int behaviorRating, string behaviorFeedback)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO(ModelState.ToString() ?? "Unknow error", 400, false, null));
            }

            var checkValid = await _bookingService.CheckValidationCreateFeedback(bookingId, behaviorRating, behaviorFeedback);
            if (!checkValid.IsSuccess)
            {
                return BadRequest(checkValid);
            }

            var feedbackResult = await _bookingService.CreateFeedback(bookingId, behaviorRating, behaviorFeedback);
            if (feedbackResult.IsSuccess)
            {
                return Ok(feedbackResult);
            }
            else
            {
                return BadRequest(feedbackResult);
            }
        }

    }
}
