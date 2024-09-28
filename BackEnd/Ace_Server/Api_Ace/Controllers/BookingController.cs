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
        public async Task<IActionResult> CreateBooking([FromBody]BookingDTO model)
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
		[HttpGet("bookings-of-customer")]
		public async Task<IActionResult> ViewBookingOfCustomer([FromQuery]Guid cusID, [FromQuery] bool bookingDate, [FromQuery] bool asc,
																[FromQuery] int pageNumber, [FromQuery] int rowsPerpage) //true là asc, false là des
		{
			ResponseDTO responseDTO = await _bookingService.ViewBookingOfCustomer(cusID,bookingDate,asc,pageNumber,rowsPerpage);
			if (responseDTO.IsSuccess == false)
			{
				if (responseDTO.StatusCode == 404)
				{
					return NotFound(responseDTO);
				}
				return BadRequest(responseDTO);
				
			}
			return Ok(responseDTO);
		}

        [HttpPut("complete-booking-tarot-reader")]
        public async Task<IActionResult> CompleteBookingByTarotReader(Guid bookingId)
        {
            var check = await _bookingService.CheckValidationUpdateWaitingForConfirmCompleted(bookingId);
            if (!check.IsSuccess && check.StatusCode == 404)
            {
                return NotFound(check);
            }

            if(!check.IsSuccess && check.StatusCode == 400)
            {
                return BadRequest(check);
            }

            var result = await _bookingService.UpdateWaitingForConfirmCompleted(bookingId);
            if (result)
            {
                return Ok(new ResponseDTO("Cập nhật trạng thái lịch hẹn thành công", 200, true));
            } else
            {
                return BadRequest(new ResponseDTO("Cập nhật trạng thái lịch hẹn thất bại", 400, false));
            }
        }

        [HttpPut("complete-booking-customer")]
        public async Task<IActionResult> CompleteBookingByCustomer(Guid bookingId)
        {
            var check = await _bookingService.CheckValidationUpdateCompleted(bookingId);
            if (!check.IsSuccess && check.StatusCode == 404)
            {
                return NotFound(check);
            }

            if (!check.IsSuccess && check.StatusCode == 400)
            {
                return BadRequest(check);
            }

            var result = await _bookingService.UpdateCompleted(bookingId);
            if (result)
            {
                return Ok(new ResponseDTO("Cập nhật trạng thái lịch hẹn thành công", 200, true));
            }
            else
            {
                return BadRequest(new ResponseDTO("Cập nhật trạng thái lịch hẹn thất bại", 400, false));
            }
        }

    }
}
