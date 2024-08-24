using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.ServiceType
{
	public class ServiceTypeDTO
	{
		public Guid UserServiceTypeId { get; set; }

		public bool Status { get; set; }

		public Guid UserId { get; set; }

		public Guid ServiceTypeId { get; set; }
	}
}
