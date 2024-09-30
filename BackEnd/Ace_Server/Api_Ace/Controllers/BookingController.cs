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
		[HttpGet("bookings-of-customer")]
		public async Task<IActionResult> ViewBookingOfCustomer([FromQuery]Guid cusID, [FromQuery] bool bookingDate, [FromQuery] bool asc, [FromQuery] String? search,
																[FromQuery] int pageNumber, [FromQuery] int rowsPerpage) //true là asc, false là des
		{
			ResponseDTO responseDTO = await _bookingService.ViewBookingOfCustomer(cusID,bookingDate,asc,search,pageNumber,rowsPerpage);
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

	

        [HttpGet("booking-detail")]
        public async Task<IActionResult> GetBookingDetail( Guid bookingId)
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

        [HttpPut("complete-booking-tarot-reader")]
        public async Task<IActionResult> CompleteBookingByTarotReader(Guid bookingId)
        {
            var check = await _bookingService.CheckValidationUpdateWaitingForConfirmCompleted(bookingId);
            if (!check.IsSuccess && check.StatusCode == 404)
            {
                return NotFound(check);
            }

            if (!check.IsSuccess && check.StatusCode == 400)
            {
                return BadRequest(check);
            }

            var result = await _bookingService.UpdateWaitingForConfirmCompleted(bookingId);
            if (result)
            {
                return Ok(new ResponseDTO("Cập nhật trạng thái lịch hẹn thành công", 200, true));
            }
            else
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

        [HttpPost("create-complaint")]
        public async Task<IActionResult> CreateComplaint([FromForm]BookingComplaintDTO bookingComplaintDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponseDTO(ModelState.ToString() ?? "Unknow error", 400, false, null));
            }

            var feedbackResult = await _bookingService.CreateComplaint(bookingComplaintDTO);
            if (feedbackResult.IsSuccess)
            {
                return Ok(feedbackResult);
            }
            else
            {
                return BadRequest(feedbackResult);
            }
        }
        [HttpPut("complaint-response")]
		public async Task<IActionResult> ReponseComplaint(ComplaintResponseDTO complaintResponseDTO)
        {
			var check = await _bookingService.CheckValidationResponse(complaintResponseDTO);
			if (!check.IsSuccess && check.StatusCode == 404)
			{
				return NotFound(check);
			}

			if (!check.IsSuccess && check.StatusCode == 400)
			{
				return BadRequest(check);
			}
			var result = await _bookingService.ReponseComplaint(complaintResponseDTO);
			if (result)
			{
				return Ok(new ResponseDTO("Trả lời khiếu nại thành công", 200, true));
			}
			else
			{
				return BadRequest(new ResponseDTO("Trả lời khiếu nại thất bại", 400, false));
			}

		}


	}
}
