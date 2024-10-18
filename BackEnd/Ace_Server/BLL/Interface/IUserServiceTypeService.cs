using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.General;

namespace BLL.Interface
{
    public interface IUserServiceTypeService
    {
        ResponseDTO GetAllServiceType(Guid userId);
        Task<ResponseDTO> RegisterSeviceType(Guid userId, Guid serviceTypeId);
        Task<ResponseDTO> DeleteRegisteredSeviceType(Guid userId, Guid serviceTypeId);
    }
}
