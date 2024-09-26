using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Booking
{
	public class BookingOfCustomerDTO
	{
		public Guid BookingId { get; set; }

		public string BookingNumber { get; set; } = null!;
		public Guid TarotReaderId { get; set; } //tarot reader

		public string? Nickname { get; set; } = null!;
		public decimal Price { get; set; }

		public string Status { get; set; } = null!;
		public DateTime CreatedDate { get; set; }
		public DateTime? BookingDate { get; set; }

		public DateTime StartTime { get; set; }

		public DateTime EndTime { get; set; }
	}
}
