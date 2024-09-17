using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.Constant;
using Common.DTO.Booking;
using Common.DTO.General;
using Common.DTO.User;
using DAL.Entities;
using DAL.UnitOfWork;

namespace BLL.Services
{
    public class BookingService : IBookingService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public BookingService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> CreateBooking(BookingDTO bookingDTO)
        {
            Random rand = new Random();
            var booking = _mapper.Map<Booking>(bookingDTO);
            booking.BookingId = Guid.NewGuid();
            booking.BookingNumber = "B" + rand.Next();
            var price = _unitOfWork.Service.GetAllByCondition(c => c.ServiceId == bookingDTO.ServiceId).Select(c => c.Price).FirstOrDefault();
            booking.Price = price;
            booking.Status = true.ToString();

            


            await _unitOfWork.Booking.AddAsync(booking);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<ResponseDTO> CheckValidationCreateBooking(BookingDTO bookingDTO)
        {
            var tarotReader = _unitOfWork.User.GetAllByCondition(c => c.Role.RoleName == RoleConstant.TarotReader);
            if(!tarotReader.Any(c=> c.UserId == bookingDTO.TarotReaderId))
            {
                return new ResponseDTO("Không tìm thấy Tarot Reader", 400, false);
            }

            var customer = _unitOfWork.User.GetAllByCondition(c => c.Role.RoleName == RoleConstant.Customer);
            if(!customer.Any(c=> c.UserId == bookingDTO.CustomerId))
            {
                return new ResponseDTO("Không tìm thấy khách hàng", 400, false);
            }

            var service = _unitOfWork.Service.GetAll();
            if(!service.Any(c => c.ServiceId == bookingDTO.ServiceId))
            {
                return new ResponseDTO("Không tìm thấy dịch vụ", 400, false);
            }
            
            var serviceDuration = _unitOfWork.Service.GetAllByCondition(c => c.ServiceId == bookingDTO.ServiceId).Select(c=> c.Duration);
            return new ResponseDTO("Check thành công", 200, true);
        }
    }
}
