using BLL.Interface;
using Common.Constant;
using Common.DTO.Payment;
using DAL.Entities;
using DAL.UnitOfWork;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVnPayService _vnPayService;
        private readonly IPayOsService _payosService;
        public PaymentService(IUnitOfWork unitOfWork, IVnPayService vnPayService, IPayOsService payosService)
        {
            _unitOfWork = unitOfWork;
            _vnPayService = vnPayService;
            _payosService = payosService;
        }
        public async Task<string> CreatePaymentVNPayRequest(Guid bookingId, HttpContext context)
        {
            var booking = await _unitOfWork.Booking.GetByCondition(c => c.BookingId == bookingId);
            if (booking == null)
            {
                return string.Empty;
            }

            var unpaidTransList = _unitOfWork.Transaction
                .GetAllByCondition(c => c.BookingId == bookingId
                && c.Status == PaymentConstant.PendingStatus);

            var unpaidTrans = (unpaidTransList != null && unpaidTransList.Any()) ? unpaidTransList.First() : null;

            if (unpaidTrans != null)
            {
                unpaidTrans.Status = PaymentConstant.CancelStatus;
                _unitOfWork.Transaction.Update(unpaidTrans);
            }

            await _unitOfWork.Transaction.AddAsync(new Transaction()
            {
                TransactionId = Guid.NewGuid(),
                PaymentMethod = PaymentConstant.VnPay,
                CreatedDate = DateTime.Now,
                Status = PaymentConstant.PendingStatus,
                BookingId = bookingId
            });

            await _unitOfWork.SaveChangeAsync();
            return await _vnPayService.CreatePaymentUrl(bookingId, context);
        }

        public async Task<bool> HandlePaymentResponse(PayOsPaymentResponseDTO model)
        {
            var booking = await _unitOfWork.Booking.GetByCondition(c => c.BookingCodePayOs == model.BookingNumPayOs);
            if (booking == null)
            {
                return false;
            }

            var unpaidTransList = _unitOfWork.Transaction
                .GetAllByCondition(c => c.BookingId == booking.BookingId
                && c.Status == PaymentConstant.PendingStatus);

            var unpaidTrans = (unpaidTransList != null && unpaidTransList.Any()) ? unpaidTransList.First() : null;

            if (unpaidTrans != null && unpaidTrans.Status == PaymentConstant.PendingStatus)
            {
                if (model.IsSuccess)
                {
                    // update trans
                    unpaidTrans.Status = PaymentConstant.PaidStatus;
                }
                else
                {
                    // update trans
                    unpaidTrans.Status = PaymentConstant.CancelStatus;
                }

                _unitOfWork.Transaction.Update(unpaidTrans);

                booking.Status = BookingStatus.Paid;
                _unitOfWork.Booking.Update(booking);
                await _unitOfWork.SaveChangeAsync();
                return true;
            }

            return false;
        }

        public async Task<string> CreatePaymentPayOsRequest(int bookingCodePayOs)
        {
            var booking = await _unitOfWork.Booking.GetByCondition(c => c.BookingCodePayOs == bookingCodePayOs);
            if (booking == null)
            {
                return string.Empty;
            }

            var unpaidTransList = _unitOfWork.Transaction
                .GetAllByCondition(c => c.BookingId == booking.BookingId
                && c.Status == PaymentConstant.PendingStatus);

            var unpaidTrans = (unpaidTransList != null && unpaidTransList.Any()) ? unpaidTransList.First() : null;

            if (unpaidTrans != null)
            {
                unpaidTrans.Status = PaymentConstant.CancelStatus;
                _unitOfWork.Transaction.Update(unpaidTrans);
            }

            await _unitOfWork.Transaction.AddAsync(new Transaction()
            {
                TransactionId = Guid.NewGuid(),
                PaymentMethod = PaymentConstant.PayOs,
                CreatedDate = DateTime.Now,
                Status = PaymentConstant.PendingStatus,
                BookingId = booking.BookingId
            });

            var url = await _payosService.CreatePayOsPaymentUrl(bookingCodePayOs);
            booking.PayOsUrlPayment = url;

            _unitOfWork.Booking.Update(booking);

            await _unitOfWork.SaveChangeAsync();
            return url;

        }
    }
}
