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
        public PaymentService(IUnitOfWork unitOfWork, IVnPayService vnPayService)
        {
            _unitOfWork = unitOfWork;
            _vnPayService = vnPayService;
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
                TransactionInfo = PaymentConstant.UnSet,
                TransactionNumber = PaymentConstant.UnSet,
                CreatedDate = DateTime.Now,
                Status = PaymentConstant.PendingStatus,
                BookingId = bookingId
            });

            await _unitOfWork.SaveChangeAsync();
            return await _vnPayService.CreatePaymentUrl(bookingId, context);
        }

        public async Task<bool> HandlePaymentResponse(VnPayResponseDTO responseDTO)
        {
            var booking = await _unitOfWork.Booking.GetByCondition(c => c.BookingNumber == responseDTO.BookingNumber);
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
                if (responseDTO.IsSuccess)
                {
                    // update trans
                    unpaidTrans.Status = PaymentConstant.PaidStatus;
                    unpaidTrans.TransactionInfo = responseDTO.TransactionInfo;
                    unpaidTrans.TransactionNumber = responseDTO.TransactionNumber;
                }
                else
                {
                    // update trans
                    unpaidTrans.TransactionInfo = responseDTO.TransactionInfo;
                    unpaidTrans.TransactionNumber = responseDTO.TransactionNumber;
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
    }
}
