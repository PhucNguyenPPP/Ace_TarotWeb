using BLL.Interface;
using BLL.Services;
using Common.DTO.Booking;
using Common.DTO.General;
using Common.DTO.User;
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
        public async Task<IActionResult> CreateBooking([FromForm] BookingDTO model)
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
            if (bookingResult)
            {
                return Ok(new ResponseDTO("Tạo lịch thành công", 200, true, null));
            }
            else
            {
                return BadRequest(new ResponseDTO("Tạo lịch không thành công", 400, true, null));
            }
        }
    }
}
