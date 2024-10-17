using BLL.Interface;
using Common.DTO.General;
using Common.DTO.Payment;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IPaymentService _paymentService;

        public PaymentController(IBookingService bookingService, 
            IPaymentService paymentService)
        {
            _bookingService = bookingService;
            _paymentService = paymentService;
        }
        [HttpPost("vnpay-payment")]
        public async Task<IActionResult> CreatePaymentUrl(Guid bookingId)
        {
            var checkExist = await _bookingService.CheckBookingExist(bookingId);
            if (!checkExist)
            {
                return BadRequest(new ResponseDTO("Lịch hẹn không tồn tại", 400, false));
            }

            var result = await _paymentService.CreatePaymentVNPayRequest(bookingId, HttpContext);
            if (result.IsNullOrEmpty())
            {
                return BadRequest(new ResponseDTO("Tạo link thanh toán thất bại", 400, false));
            }

            return Ok(new ResponseDTO("Tạo link thanh toán thành công", 201, true, result));
        }

        [HttpPost("payos-payment")]
        public async Task<IActionResult> CreatePayOsPaymentUrl(int bookingNumberPayOs)
        {
            var checkExist = await _bookingService.CheckBookingNumberPayOsExist(bookingNumberPayOs);
            if (!checkExist)
            {
                return BadRequest(new ResponseDTO("Lịch hẹn không tồn tại", 400, false));
            }

            var result = await _paymentService.CreatePaymentPayOsRequest(bookingNumberPayOs);
            if (result.IsNullOrEmpty())
            {
                return BadRequest(new ResponseDTO("Tạo link thanh toán thất bại", 400, false));
            }

            return Ok(new ResponseDTO("Tạo link thanh toán thành công", 201, true, result));
        }

        [HttpPut("response-payment")]
        public async Task<IActionResult> HandleResponseVnPay([FromBody] PayOsPaymentResponseDTO model)
        {
            if (!ModelState.IsValid)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ResponseDTO(ModelState.ToString()!, 400, false, null));
                }
            }

            var response = await _paymentService.HandlePaymentResponse(model);

            if (response)
            {
                return Ok(new ResponseDTO("Xử lý thành công", 201, true, response));
            }

            return StatusCode(500, new ResponseDTO("Xử lý thất bại", 500, false, null));
        }
    }
}
