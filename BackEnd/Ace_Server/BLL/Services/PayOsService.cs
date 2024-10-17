using BLL.Interface;
using DAL.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Net.payOS;
using Net.payOS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class PayOsService : IPayOsService
    {
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;

        public PayOsService(IConfiguration configuration, IUnitOfWork unitOfWork)
        {
            _configuration = configuration;
            _unitOfWork = unitOfWork;
        }

        public async Task<string> CreatePayOsPaymentUrl(int bookingCodePayOs)
        {
            var booking = await _unitOfWork.Booking.GetByCondition(c => c.BookingCodePayOs == bookingCodePayOs);
            if (booking == null)
            {
                return string.Empty;
            }

            var clientId = _configuration["PayOS:ClientId"];
            var apiKey = _configuration["PayOS:ApiKey"];
            var checksumKey = _configuration["PayOS:ChecksumKey"];
            var returnUrl = _configuration["ReturnUrlPayOS:ReturnUrl"];

            PayOS payOs = new PayOS(clientId, apiKey, checksumKey);

            ItemData item = new ItemData("AceTarot", (int)booking.Price, Int32.Parse(booking.Price.ToString()));
            List<ItemData> items = new List<ItemData>();
            items.Add(item);

            PaymentData paymentData = new PaymentData(bookingCodePayOs, 
                Int32.Parse(booking.Price.ToString()), 
                "Thanh toán lịch hẹn " + booking.BookingNumber, 
                items, returnUrl, returnUrl);

            CreatePaymentResult createPayment = await payOs.createPaymentLink(paymentData);

            var linkCheckOut = createPayment.checkoutUrl;

            return linkCheckOut;
        }
    }
}
