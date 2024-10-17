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
		Task<ResponseDTO> ViewBookingOfCustomer(Guid cusID, bool bookingDate, bool asc, string? search, int pageNumber, int rowsPerpage);
        ResponseDTO GetBookingDetail(Guid bookingId);
        Task<ResponseDTO> CreateFeedback(Guid bookingId, int behaviorRating, string behaviorFeedback);
        Task<ResponseDTO> CheckValidationCreateFeedback(Guid bookingId, int behaviorRating, string behaviorFeedback);
        Task<ResponseDTO> CheckValidationUpdateWaitingForConfirmCompleted(Guid bookingId);
        Task<bool> UpdateWaitingForConfirmCompleted(Guid bookingId);
        Task<ResponseDTO> CheckValidationUpdateCompleted(Guid bookingId);
        Task<bool> UpdateCompleted(Guid bookingId);

        Task<ResponseDTO> CreateComplaint (BookingComplaintDTO complaintDTO);
		Task<ResponseDTO> CheckValidationResponse(ComplaintResponseDTO complaintResponseDTO);
		Task<bool> ReponseComplaint(ComplaintResponseDTO complaintResponseDTO);
        Task<bool> CheckBookingNumberPayOsExist(int bookingNumberPayOs);
    }
}
