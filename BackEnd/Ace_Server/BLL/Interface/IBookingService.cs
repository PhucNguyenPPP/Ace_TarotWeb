using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.Booking;
using Common.DTO.General;
using Common.DTO.User;

namespace BLL.Interface
{
    public interface IBookingService
    {
        Task<bool> CreateBooking(BookingDTO bookingDTO);
        Task<ResponseDTO> CheckValidationCreateBooking(BookingDTO bookingDTO);
    }
}
