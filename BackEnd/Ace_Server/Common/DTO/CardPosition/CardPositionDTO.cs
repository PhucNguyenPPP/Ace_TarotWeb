using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.CardPosition
{
	public class CardPositionDTO
	{
		public int CardPositionId { get; set; }

		public string Meaning { get; set; } = null!;

		public int TopicId { get; set; }

		public int PositionId { get; set; }

		public int CardId { get; set; }
	}
}
