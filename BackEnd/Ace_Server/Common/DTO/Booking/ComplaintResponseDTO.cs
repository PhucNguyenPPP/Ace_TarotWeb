using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Booking
{
	public class ComplaintResponseDTO
	{
		public Guid BookingId { get; set; }
		[Required(ErrorMessage = "Vui lòng chọn trạng thái cho khiếu nại")]
		public required string ApproveDeny { get;  set; }
		public string? ComplaintResponse { get; set; }
		public int ComplaintRefundPercentage { get; set; }

	}
}
