using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Booking
{
	public class ListBookingOfCustomerDTO
	{
		public List<BookingOfCustomerDTO>? List { get; set; }
		public int? CurrentPage { get; set; }
		public int? RowsPerPages { get; set; }
		public int? TotalCount { get; set; }
		public int? TotalPages { get; set; }
	}
}
