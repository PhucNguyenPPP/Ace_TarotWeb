using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.Booking;
using Common.DTO.General;
using Common.DTO.User;
using Microsoft.AspNetCore.Http;

namespace BLL.Interface
{
    public interface IBookingService
    {
        Task<ResponseDTO> CreateBooking(BookingDTO bookingDTO);
        Task<ResponseDTO> CheckValidationCreateBooking(BookingDTO bookingDTO);
        Task<bool> CheckBookingExist(Guid bookingId);
        ResponseDTO GetBookingDetail(Guid bookingId);
        Task<ResponseDTO> CreateFeedback(Guid bookingId, int behaviorRating, string behaviorFeedback);
        Task<ResponseDTO> CheckValidationCreateFeedback(Guid bookingId, int behaviorRating, string behaviorFeedback);
    }
}
