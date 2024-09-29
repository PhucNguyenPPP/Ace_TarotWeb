using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration.Conventions;
using BLL.Interface;
using Common.Constant;
using Common.DTO.Booking;
using Common.DTO.General;
using Common.DTO.Paging;
using Common.DTO.User;
using DAL.Entities;
using DAL.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;

namespace BLL.Services
{
    public class BookingService : IBookingService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVnPayService _vnPayService;
        public BookingService(IMapper mapper, IUnitOfWork unitOfWork,
            IVnPayService vnPayService)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _vnPayService = vnPayService;
        }

        public async Task<ResponseDTO> CreateBooking(BookingDTO bookingDTO)
        {
            Random rand = new Random();
            var booking = _mapper.Map<Booking>(bookingDTO);
            booking.BookingId = Guid.NewGuid();
            booking.CreatedDate = DateTime.Now;
            string num = "";
            var bookNum = _unitOfWork.Booking.GetAll();
            do
            {
                num = "B" + rand.Next(999);
                booking.BookingNumber = num;
            } while (bookNum.Any(c => c.BookingNumber == num));
            
            booking.Status = BookingStatus.NotPaid;
            var service = _unitOfWork.Service.GetAllByCondition(c => c.ServiceId == bookingDTO.ServiceId).Select(c => c.ServiceName).FirstOrDefault();
            var price = _unitOfWork.Service.GetAllByCondition(c => c.ServiceId == bookingDTO.ServiceId).Select(c => c.Price).FirstOrDefault();
            if (service == "Theo câu hỏi lẻ")
            {
                decimal amount = (decimal)bookingDTO.QuestionAmount;
                decimal price2 = amount * price;
                booking.Price = price2;
            }
            else
            {
                booking.Price = price;
                booking.QuestionAmount = 1;
            }

            var checkSLot = _unitOfWork.UserSlot.GetAllByCondition(c => c.Status == true);
            
            if(bookingDTO.userSlotId.Count == 1)
            {
                if(checkSLot.Any(c=> c.UserSlotId == bookingDTO.userSlotId[0]))
                {
                    var slotId = _unitOfWork.UserSlot.GetAllByCondition(c => c.UserSlotId == bookingDTO.userSlotId[0]).Select(c => c.SlotId).FirstOrDefault();
                    var slot = _unitOfWork.Slot.GetAllByCondition(c => c.SlotId == slotId);
                    booking.StartTime = slot.Select(c => c.StartTime).FirstOrDefault();
                    booking.EndTime = slot.Select(c => c.EndTime).FirstOrDefault();
                    UserSlot? userSlot = _unitOfWork.UserSlot.GetAllByCondition(c => c.UserSlotId == bookingDTO.userSlotId[0]).FirstOrDefault();
                    userSlot.Status = false;
                    userSlot.BookingId = booking.BookingId;
                }
            }
            else
            {
                List<Guid> slotIds = new List<Guid>();
                for(int i = 0; i < bookingDTO.userSlotId.Count; i++)
                {
                    var slotId = _unitOfWork.UserSlot.GetAllByCondition(c => c.UserSlotId == bookingDTO.userSlotId[i]).Select(c => c.SlotId).FirstOrDefault();
                    slotIds.Add(slotId);
                    UserSlot? userSlot = _unitOfWork.UserSlot.GetAllByCondition(c => c.UserSlotId == bookingDTO.userSlotId[i]).FirstOrDefault();
                    userSlot.Status =false;
                    userSlot.BookingId= booking.BookingId;
                }
                List<DateTime> startTime = new List<DateTime>();
                List<DateTime> endTime = new List<DateTime>();
                DateTime earliest = _unitOfWork.Slot.GetAllByCondition(c => c.SlotId == slotIds[0]).Select(c=> c.StartTime).FirstOrDefault();
                DateTime lastest = _unitOfWork.Slot.GetAllByCondition(c => c.SlotId == slotIds[0]).Select(c => c.EndTime).FirstOrDefault();
                for (int i =0; i< slotIds.Count; i++)
                {
                    var slot = _unitOfWork.Slot.GetAllByCondition(c => c.SlotId == slotIds[i]);
                    if(earliest > slot.Select(c => c.StartTime).FirstOrDefault())
                    {
                        earliest = slot.Select(c => c.StartTime).FirstOrDefault();
                    }else if(lastest < slot.Select(c => c.EndTime).FirstOrDefault())
                    {
                        lastest = slot.Select(c => c.EndTime).FirstOrDefault();
                    }
                    
                }
                booking.StartTime = earliest;
                booking.EndTime = lastest;
            }
            
            await _unitOfWork.Booking.AddAsync(booking);
            var result = await _unitOfWork.SaveChangeAsync();
            if (result)
            {
                return new ResponseDTO("Tạo lịch thành công", 200, true, booking.BookingId);
            } else
            {
                return new ResponseDTO("Tạo lịch không thành công", 400, false, null);
            }
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

            int total = 30 * bookingDTO.userSlotId.Count;
            int? duration = _unitOfWork.Service.GetAllByCondition(c => c.ServiceId == bookingDTO.ServiceId).Select(c => c.Duration).FirstOrDefault();
            if (_unitOfWork.Service.GetAllByCondition(c => c.ServiceId == bookingDTO.ServiceId).Select(c => c.ServiceName).FirstOrDefault() == "Theo câu hỏi lẻ")
            {
                if (bookingDTO.QuestionAmount.ToString().IsNullOrEmpty())
                {
                    return new ResponseDTO("Vui lòng nhập số lượng câu hỏi!", 400, false);
                }
                duration *= bookingDTO.QuestionAmount;
            }

            if (duration > total)
            {
                return new ResponseDTO("Vui lòng chọn thêm slot!", 400, false);
            }

            var checkSLot = _unitOfWork.UserSlot.GetAllByCondition(c => c.Status == true);
            if (bookingDTO.userSlotId.Count == 1)
            {
                if (!checkSLot.Any(c => c.UserSlotId == bookingDTO.userSlotId[0]))
                {
                    return new ResponseDTO("Slot đã full", 400, false);
                }
            }
            else
            {
                for (int i = 0; i < bookingDTO.userSlotId.Count; i++)
                {
                    if (!checkSLot.Any(c => c.UserSlotId == bookingDTO.userSlotId[i]))
                    {
                        return new ResponseDTO("Slot đã full", 400, false);
                    }
                }
            }
                    return new ResponseDTO("Check thành công", 200, true);
        }

        public async Task<bool> CheckBookingExist(Guid bookingId)
        {
            var booking = await _unitOfWork.Booking.GetByCondition(c => c.BookingId == bookingId);
            if (booking == null)
            {
                return false;
            }
            return true;
        }

		public async Task<ResponseDTO> ViewBookingOfCustomer(Guid cusID, bool bookingDate, bool asc, string? search,
																 int pageNumber, int rowsPerpage)
		{
			var customer = await _unitOfWork.User.GetByCondition(c => c.UserId.Equals(cusID));
			if (customer == null)
			{
				return new ResponseDTO("Không tìm thấy khách hàng", 404, false);
			}
                var list = _unitOfWork.Booking.GetAllByCondition(b => b.CustomerId == cusID).ToList();
               
			if (list == null)
			{
				return new ResponseDTO("Không tìm thấy lịch hẹn của khách hàng", 404, false);
			}
            List<BookingOfCustomerDTO> listDTO = _mapper.Map<List<BookingOfCustomerDTO>>(list);
            foreach (var item in listDTO)
            {
                if (item != null) 
                {
                    var nickname = await _unitOfWork.User.GetByCondition(u => u.UserId == item.TarotReaderId);
                    if (nickname != null) {
                        item.Nickname = nickname.NickName;
                    }
                    item.BookingDate = item.StartTime.Date;
                }
            }
            if (search != null) 
            {
				var tempList = listDTO.Where(b => b.Nickname.ToLower().Contains(search.ToLower())).ToList();
				listDTO = tempList;
			}
            if (!listDTO.Any()) 
            {
				return new ResponseDTO("Không có lịch hẹn trùng thông tin", 404, false);
			} 
            if (bookingDate)
            {
                if (asc)
                {
                    listDTO = listDTO.OrderBy(b => b.StartTime).ToList();
                }
                else
                {
					listDTO = listDTO.OrderByDescending(b => b.StartTime).ToList();
				}
            }
            else
            {
				if (asc)
				{
					listDTO = listDTO.OrderBy(b => b.CreatedDate).ToList();
				}
				else
				{
					listDTO = listDTO.OrderByDescending(b => b.CreatedDate).ToList();
				}
			}
			var finalList = PagedList<BookingOfCustomerDTO>.ToPagedList(listDTO.AsQueryable(), pageNumber, rowsPerpage);
			ListBookingOfCustomerDTO listBookingOfCustomerDTO = new ListBookingOfCustomerDTO();
			listBookingOfCustomerDTO.List = finalList;
			listBookingOfCustomerDTO.CurrentPage = pageNumber;
			listBookingOfCustomerDTO.RowsPerPages = rowsPerpage;
			listBookingOfCustomerDTO.TotalCount = listDTO.Count;
			listBookingOfCustomerDTO.TotalPages = (int)Math.Ceiling(listDTO.Count / (double)rowsPerpage);
			return new ResponseDTO("Lấy các lịch hẹn của khách hàng thành công", 200, true, listBookingOfCustomerDTO);
		}
	
        public ResponseDTO GetBookingDetail(Guid bookingId)
        {
            var booking = _unitOfWork.Booking.GetAllByCondition(c => c.BookingId == bookingId).FirstOrDefault();
            if(booking == null)
            {
                return new ResponseDTO("Không tồn tại", 400, false);
            }
            var reader = _unitOfWork.User.GetAllByCondition(c=> c.UserId == booking.TarotReaderId).FirstOrDefault() ?? null;
            var service = _unitOfWork.Service.GetAllByCondition(c=> c.ServiceId == booking.ServiceId).FirstOrDefault();
            var serviceType = _unitOfWork.ServiceType.GetAllByCondition(c => c.ServiceTypeId == service.ServiceTypeId).FirstOrDefault();
            var formMeeting = _unitOfWork.FormMeeting.GetAllByCondition(c => c.FormMeetingId == booking.FormMeetingId).FirstOrDefault();
            BookingDetailDTO detailDTO = new BookingDetailDTO();
            detailDTO.TarotReaderName = reader.NickName;
            detailDTO.Status = booking.Status;
            detailDTO.BookingId = booking.BookingId;
            detailDTO.BookingNumber = booking.BookingNumber;
            detailDTO.CreatedDate = booking.CreatedDate;
            detailDTO.BookingDate = DateOnly.FromDateTime(booking.StartTime);
            detailDTO.StartTime = booking.StartTime;
            detailDTO.EndTime = booking.EndTime;
            detailDTO.ServiceTypeName = serviceType.ServiceTypeName;
            detailDTO.ServiceName = service.ServiceName;
            detailDTO.QuestionAmount = booking.QuestionAmount;
            detailDTO.BehaviorRating = booking.BehaviorRating;
            detailDTO.BehaviorFeedback = booking.BehaviorFeedback;
            detailDTO.FormMeetingName = formMeeting.FormMeetingName;
            detailDTO.MeetLink = reader.MeetLink;

            var list = _mapper.Map<BookingDetailDTO>(detailDTO);
            return new ResponseDTO("Hiển thị chi tiết đặt lịch thành công", 200, true, list);


        }

        public async Task<ResponseDTO> CreateFeedback(Guid bookingId, int behaviorRating, string behaviorFeedback)
        {
            var booking = _unitOfWork.Booking.GetAllByCondition(c=> c.BookingId == bookingId && c.Status == BookingStatus.Completed).FirstOrDefault();
            if (booking == null)
            {
                return new ResponseDTO("Không tồn tại", 400, false);
            }
            booking.BehaviorRating = behaviorRating;
            booking.BehaviorFeedback = behaviorFeedback;
            _unitOfWork.Booking.Update(booking);
            var result = await _unitOfWork.SaveChangeAsync();
            if (result)
            {
                return new ResponseDTO("Đánh giá thành công", 200, true, booking.BookingId);
            }
            else
            {
                return new ResponseDTO("Đánh giá không thành công", 400, false, null);
            }
        }

        public async Task<ResponseDTO> CheckValidationCreateFeedback(Guid bookingId, int behaviorRating, string behaviorFeedback)
        {
            if (behaviorRating > 5 || behaviorRating < 1)
            {
                return new ResponseDTO("Đánh giá không hợp lệ", 400, false);
            }
            return new ResponseDTO("Check thành công", 200, true);
        }

        public async Task<ResponseDTO> CheckValidationUpdateWaitingForConfirmCompleted(Guid bookingId)
        {
            var checkExist = await CheckBookingExist(bookingId);
            if (!checkExist)
            {
                return new ResponseDTO("Lịch hẹn không tồn tại", 404, false);
            }

            var booking = await _unitOfWork.Booking.GetByCondition(c => c.BookingId == bookingId);
            if (booking.Status != BookingStatus.Paid)
            {
                return new ResponseDTO("Trạng thái của lịch hẹn không hợp lệ", 400, false);
            }

            if (booking.EndTime > DateTime.Now)
            {
                return new ResponseDTO("Lịch hẹn chưa kết thúc", 400, false);
            }
            return new ResponseDTO("Check thành công", 200, true);
        }

        public async Task<bool> UpdateWaitingForConfirmCompleted(Guid bookingId)
        {
            var booking = await _unitOfWork.Booking.GetByCondition(c => c.BookingId == bookingId);
            if (booking == null)
            {
                return false;
            }

            booking.Status = BookingStatus.WaitForConfirmCompleted;
            booking.EndDate = DateTime.Now;

            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<ResponseDTO> CheckValidationUpdateCompleted(Guid bookingId)
        {
            var checkExist = await CheckBookingExist(bookingId);
            if (!checkExist)
            {
                return new ResponseDTO("Lịch hẹn không tồn tại", 404, false);
            }

            var booking = await _unitOfWork.Booking.GetByCondition(c => c.BookingId == bookingId);
            if (booking.Status != BookingStatus.WaitForConfirmCompleted)
            {
                return new ResponseDTO("Trạng thái của lịch hẹn không hợp lệ", 400, false);
            }

            return new ResponseDTO("Check thành công", 200, true);
        }

        public async Task<bool> UpdateCompleted(Guid bookingId)
        {
            var booking = await _unitOfWork.Booking.GetByCondition(c => c.BookingId == bookingId);
            if (booking == null)
            {
                return false;
            }

            booking.Status = BookingStatus.Completed;

            return await _unitOfWork.SaveChangeAsync();
        }
    }
}
