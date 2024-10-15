using Common.DTO.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.ServiceType
{
	public class ServiceTypeDTO
	{
		public Guid ServiceTypeId { get; set; }

		public string ServiceTypeName { get; set; } = null!;

		public bool? Status { get; set; }
		public List<ServiceDTO> Services { get; set; }
	}
}
