using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.DTO.General;
using Common.DTO.Service;
using DAL.UnitOfWork;
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
    }
}
