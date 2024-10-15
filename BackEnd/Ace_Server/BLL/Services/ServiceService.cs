using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.Constant;
using Common.DTO.General;
using Common.DTO.Service;
using Common.DTO.ServiceType;
using DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BLL.Services
{
    public class ServiceService : IServiceService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ServiceService(IMapper mapper, IUnitOfWork unitOfWork) 
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ResponseDTO> GetAllService(Guid serviceTypeId)
        {
            var service = _unitOfWork.Service.GetAllByCondition(c => c.ServiceTypeId == serviceTypeId);
            if (service.IsNullOrEmpty() || service.Count() == 0)
            {
                return new ResponseDTO("Không có dịch vụ!", 400, false);
            }
            var list = _mapper.Map<List<ServiceDTO>>(service);
            return new ResponseDTO("Hiển thị dịch vụ thành công!", 200, true, list);
        }
        public ResponseDTO GetAllServiceTypeSystem()
        {
            var serviceTypeList = _unitOfWork.ServiceType
            .GetAllByCondition(x => x.Status == true)
            .Include(c => c.Services)
            .ToList();

            var list2 = _mapper.Map<List<ServiceTypeDTO>>(serviceTypeList);
            return new ResponseDTO("Hiển thị loại dịch vụ thành công!", 200, true, list2);
        }

    }
}
