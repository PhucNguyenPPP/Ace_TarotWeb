using Common.DTO.Payment;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interface
{
    public interface IPaymentService
    {
        Task<string> CreatePaymentVNPayRequest(Guid bookingId, HttpContext context);
        Task<bool> HandlePaymentResponse(PayOsPaymentResponseDTO payOsPaymentResponseDTO);
        Task<string> CreatePaymentPayOsRequest(int bookingCodePayOs);
    }
}
