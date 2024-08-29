using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.User
{
	public class ListTarotReaderDTO
	{
		public int? CurrentPage { get; set; }
		public int? RowsPerPages { get; set; }
		public int? TotalCount { get; set; }
		public int? TotalPages { get; set; }
		public List<TarotReaderDetailDTO>? TarotReaderDetailDTO { get; set; }	
	}
}
