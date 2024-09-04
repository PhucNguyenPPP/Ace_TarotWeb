using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.CardPosition;
using DAL.Entities;
using DAL.Repositories.Interface;

namespace DAL.Repositories
{
	public class CardPositionRepository : GenericRepository<CardPosition>, ICardPositionRepository
	{
		public CardPositionRepository(AceContext context) : base(context)
		{

		}

		public async Task<List<CardPosition>> GetMeanings(List<CardAfterPickDTO> model, int topicId)
		{
			var list = new List<CardPosition>();
			foreach (var modelItem in model) {
				var cardPosition = await GetByCondition(c => c.TopicId == topicId && c.CardId == modelItem.CardId && c.PositionId == modelItem.PositionId);
				if (cardPosition != null)
				{
					list.Add(cardPosition);
				}
			}
			return list;

		}
	}
	
	
}
