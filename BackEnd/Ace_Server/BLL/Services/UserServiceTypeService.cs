using AutoMapper;
using BLL.Interface;
using Common.Constant;
using Common.DTO.General;
using Common.DTO.ServiceType;
using DAL.Entities;
using DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BLL.Services
{
    public class UserServiceTypeService : IUserServiceTypeService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public UserServiceTypeService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public ResponseDTO GetAllServiceType(Guid userId)
        {
            var tarotReader = _unitOfWork.User.GetAllByCondition(c => c.Role.RoleName == RoleConstant.TarotReader);
            if (!tarotReader.Any(c => c.UserId == userId))
            {
                return new ResponseDTO("User Id không hợp lệ", 400, false);
            }
            var serviceType = _unitOfWork.UserServiceType
            .GetAllByCondition(x => x.UserId == userId && x.Status == true /*&&x.User.Role.RoleName == RoleConstant.TarotReader*/)
            .Include(c => c.ServiceType)
            .ThenInclude(c => c.Services)
            .ToList();
            if (serviceType.IsNullOrEmpty() || serviceType.Count() == 0)
            {
                return new ResponseDTO("Chưa đăng ký loại dịch vụ!", 400, false);
            }
            var list2 = _mapper.Map<List<ServiceTypeOfUserDTO>>(serviceType);
            return new ResponseDTO("Hiển thị loại dịch vụ thành công!", 200, true, list2);
        }

        public async Task<ResponseDTO> RegisteredSeviceType(Guid userId, Guid serviceTypeId)
        {
            //check valid and is tarot reader or not
            var tarotReader = _unitOfWork.User
                .GetAllByCondition(c => c.UserId == userId
                && c.Status == true
                && c.Role.RoleName == RoleConstant.TarotReader);
            if (tarotReader.IsNullOrEmpty())
            {
                return new ResponseDTO("User ID không hợp lệ!", 400, false);
            }

            //check service type is valid or not
            var serviceType = _unitOfWork.ServiceType
                .GetAllByCondition(
                c => c.ServiceTypeId == serviceTypeId && 
                c.Status == true);

            if (serviceType.IsNullOrEmpty())
            {
                return new ResponseDTO("Service Type ID không hợp lệ", 400, false);
            }

            //check if service type registerd by tarot reader
            var userServiceTypes = _unitOfWork.UserServiceType
                .GetAllByCondition(
                c => c.UserId == userId && 
                c.ServiceTypeId == serviceTypeId && 
                c.Status == true);

            if (!userServiceTypes.IsNullOrEmpty())
            {
                return new ResponseDTO("Loại dịch vụ này đã được đăng ký!", 400, false);
            }


            var list = _unitOfWork.UserServiceType
                .GetAllByCondition(
                c => c.UserId == userId && 
                c.ServiceTypeId == serviceTypeId && 
                c.Status == false)
                .FirstOrDefault();

            //if user not registered before create new userServiceType
            if (list == null)
            {
                UserServiceType userServiceType = new UserServiceType();
                userServiceType.UserServiceTypeId = Guid.NewGuid();
                userServiceType.UserId = userId;
                userServiceType.ServiceTypeId = serviceTypeId;
                userServiceType.Status = true;
                await _unitOfWork.UserServiceType.AddAsync(userServiceType);
            }
            //update status if user registed before 
            else
            {
                list.Status = true;
                _unitOfWork.UserServiceType.Update(list);
            }

            var result = await _unitOfWork.SaveChangeAsync();
            if (result)
            {
                return new ResponseDTO("Đăng ký loại dịch vụ thành công", 200, true);
            }
            else
            {
                return new ResponseDTO("Đăng ký loại dịch vụ không thành công", 400, false);
            }

        }

        public async Task<ResponseDTO> DeleteSeviceType(Guid userId, Guid serviceTypeId)
        {
            //check user valid and is tarot reader or not
            var tarotReader = _unitOfWork.User
                .GetAllByCondition(c => c.UserId == userId
                && c.Status == true
                && c.Role.RoleName == RoleConstant.TarotReader);
            if (tarotReader.IsNullOrEmpty())
            {
                return new ResponseDTO("User ID không hợp lệ!", 400, false);
            }

            //check service type valid or not
            var serviceType = _unitOfWork.ServiceType.GetAllByCondition(c => c.ServiceTypeId == serviceTypeId && c.Status == true);
            if (serviceType.IsNullOrEmpty())
            {
                return new ResponseDTO("Service Type ID không hợp lệ", 400, false);
            }

            //check if service type registered or not
            var userServiceType = _unitOfWork.UserServiceType.
                GetAllByCondition(c => c.ServiceTypeId == serviceTypeId && 
                c.UserId == userId);
            if (userServiceType.IsNullOrEmpty())
            {
                return new ResponseDTO("Chưa đăng ký loại dịch vụ này!", 400, false);
            }

            //check if service type deleted or not
            var userServiceType2 = _unitOfWork.UserServiceType.
                GetAllByCondition(c => c.ServiceTypeId == serviceTypeId &&
                c.UserId == userId &&
                c.Status == true)
                .FirstOrDefault();
            if (userServiceType2 == null)
            {
                return new ResponseDTO("Loại dịch vụ này đã được xóa!", 400, false);
            }

            
            userServiceType2.Status = false;

            _unitOfWork.UserServiceType.Update(userServiceType2);

            var result = await _unitOfWork.SaveChangeAsync();
            if (result)
            {
                return new ResponseDTO("Xóa loại dịch vụ thành công", 200, true);
            }
            else
            {
                return new ResponseDTO("Xóa loại dịch vụ không thành công", 400, false);
            }
        }
    }
}
