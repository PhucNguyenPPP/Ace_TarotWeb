using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.User
{
	public class ServiceOfReaderDTO
	{
		public Guid UserServiceId { get; set; }

		public bool Status { get; set; }

		public Guid UserId { get; set; }

		public Guid ServiceId { get; set; }
	}
}
