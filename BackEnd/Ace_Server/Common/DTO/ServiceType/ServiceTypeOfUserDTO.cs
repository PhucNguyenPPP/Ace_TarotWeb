using Common.DTO.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.ServiceType
{
    public class ServiceTypeOfUserDTO
    {
        public Guid UserServiceTypeId { get; set; }
        public Guid ServiceTypeId { get; set; }
        public string ServiceTypeName { get; set; }
        public List<ServiceDTO> Services { get; set; }
    }
}
