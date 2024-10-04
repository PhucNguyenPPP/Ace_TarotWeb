using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Message
{
	public class MessageDTO
	{

		public string Content { get; set; } = null!;

		public Guid SendUserId { get; set; }

		public Guid ReceiveUserId { get; set; }
	}
}
