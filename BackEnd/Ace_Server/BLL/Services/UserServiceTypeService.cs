using AutoMapper;
using BLL.Interface;
using Common.DTO.General;
using Common.DTO.ServiceType;
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
                var serviceType = _unitOfWork.UserServiceType
                .GetAllByCondition(x => x.UserId == userId && x.Status == true)
                .Include(c=> c.ServiceType).ToList();
            if (serviceType.IsNullOrEmpty() || serviceType.Count() == 0)
            {
                return new ResponseDTO("Chưa đăng ký loại dịch vụ!", 400, false);
            }
            var list2 = _mapper.Map<List<ServiceTypeOfUserDTO>>(serviceType);
            return new ResponseDTO("Hiển thị loại dịch vụ thành công!", 200, true, list2);
        }
    }
}
