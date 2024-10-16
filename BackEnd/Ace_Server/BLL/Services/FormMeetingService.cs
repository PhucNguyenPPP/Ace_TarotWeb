using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.Constant;
using Common.DTO.FormMeeting;
using Common.DTO.General;
using Common.DTO.Topic;
using DAL.Entities;
using DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BLL.Services
{
    public class FormMeetingService : IFormMeetingService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public FormMeetingService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ResponseDTO> GetAllFormMeeting()
        {
            var formMeetings = _unitOfWork.FormMeeting.GetAll();
            if (formMeetings.IsNullOrEmpty() || formMeetings.Count() == 0)
            {
                return new ResponseDTO("Không có hình thức xem để hiển thị", 400, false);
            }
            var list = _mapper.Map<List<FormMeetingOfReaderDTO>>(formMeetings);
            return new ResponseDTO("Hiện hình thức xem thành công", 200, true, list);
        }

        public List<FormMeetingOfReaderDTO> GetAllFormMeetingOfTarotReader(Guid userId)
        {
            var formMeetingTarotReader = _unitOfWork.UserFormMeeting
                .GetAllByCondition(c => c.UserId == userId && c.Status == true)
                .Include(c => c.FormMeeting)
                .ToList();

            return _mapper.Map<List<FormMeetingOfReaderDTO>>(formMeetingTarotReader);
        }

        public async Task<ResponseDTO> RegisteredFormMeeting(Guid userId, Guid formMeetingId)
        {
            //check valid and is tarot reader or not
            var tarotReader = _unitOfWork.User
                .GetAllByCondition(c => c.UserId == userId
                && c.Status == true
                && c.Role.RoleName == RoleConstant.TarotReader);
            if (tarotReader.IsNullOrEmpty())
            {
                return new ResponseDTO("Người dùng không hợp lệ!", 400, false);
            }

            //check Form Meeting is valid or not
            var formMeeting = _unitOfWork.FormMeeting
                .GetAllByCondition(
                c => c.FormMeetingId == formMeetingId );

            if (formMeeting.IsNullOrEmpty())
            {
                return new ResponseDTO("Hình thức xem không hợp lệ", 400, false);
            }

            //check if Form Meeting registerd by tarot reader
            var userFormMeetings = _unitOfWork.UserFormMeeting
                .GetAllByCondition(
                c => c.UserId == userId &&
                c.FormMeetingId == formMeetingId &&
                c.Status == true);

            if (!userFormMeetings.IsNullOrEmpty())
            {
                return new ResponseDTO("Hình thức xem này đã được đăng ký!", 400, false);
            }


            var list = _unitOfWork.UserFormMeeting
                .GetAllByCondition(
                c => c.UserId == userId &&
                c.FormMeetingId == formMeetingId &&
                c.Status == false)
                .FirstOrDefault();

            //if user not registered before create new userFormMeeting
            if (list == null)
            {
                UserFormMeeting userFormMeeting = new UserFormMeeting();
                userFormMeeting.UserFormMeetingId = Guid.NewGuid();
                userFormMeeting.UserId = userId;
                userFormMeeting.FormMeetingId = formMeetingId;
                userFormMeeting.Status = true;
                await _unitOfWork.UserFormMeeting.AddAsync(userFormMeeting);
            }
            //update status if user registed before 
            else
            {
                list.Status = true;
                _unitOfWork.UserFormMeeting.Update(list);
            }

            var result = await _unitOfWork.SaveChangeAsync();
            if (result)
            {
                return new ResponseDTO("Đăng ký hình thức xem thành công", 200, true);
            }
            else
            {
                return new ResponseDTO("Đăng ký hình thức xem không thành công", 400, false);
            }

        }

        public async Task<ResponseDTO> DeleteRegisterFormMeeting(Guid userId, Guid formMeetingId)
        {
            //check user valid and is tarot reader or not
            var tarotReader = _unitOfWork.User
                .GetAllByCondition(c => c.UserId == userId
                && c.Status == true
                && c.Role.RoleName == RoleConstant.TarotReader);
            if (tarotReader.IsNullOrEmpty())
            {
                return new ResponseDTO("Người dùng không hợp lệ!", 400, false);
            }

            //check service type valid or not
            var formMeeting = _unitOfWork.FormMeeting
                .GetAllByCondition(c => c.FormMeetingId == formMeetingId);
            if (formMeeting.IsNullOrEmpty())
            {
                return new ResponseDTO("Hình thức xem không hợp lệ", 400, false);
            }

            //check if service type registered or not
            var userFormMeetings = _unitOfWork.UserFormMeeting
                .GetAllByCondition(
                c => c.FormMeetingId == formMeetingId &&
                c.UserId == userId);
            if (userFormMeetings.IsNullOrEmpty())
            {
                return new ResponseDTO("Chưa đăng ký Hình thức xem này!", 400, false);
            }

            //check if service type deleted or not
            var userFormMeeting = _unitOfWork.UserFormMeeting.
                GetAllByCondition(c => c.FormMeetingId == formMeetingId &&
                c.UserId == userId &&
                c.Status == true)
                .FirstOrDefault();
            if (userFormMeeting == null)
            {
                return new ResponseDTO("Loại hình thức xem này đã được xóa!", 400, false);
            }


            userFormMeeting.Status = false;

            _unitOfWork.UserFormMeeting.Update(userFormMeeting);

            var result = await _unitOfWork.SaveChangeAsync();
            if (result)
            {
                return new ResponseDTO("Xóa hình thức xem thành công", 200, true);
            }
            else
            {
                return new ResponseDTO("Xóa hình thức xem không thành công", 400, false);
            }
        }
    }
}
