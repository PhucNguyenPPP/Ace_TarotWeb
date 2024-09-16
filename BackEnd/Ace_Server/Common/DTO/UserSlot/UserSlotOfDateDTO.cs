using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.UserSlot
{
	public class UserSlotOfDateDTO
	{
		public Guid UserSlotId { get; set; }

		public bool Status { get; set; }

		public Guid UserId { get; set; }

		public Guid SlotId { get; set; }

		public string? StartTime { get; set; }

		public string? EndTime { get; set; }
	}
}
