using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.CardPosition;
using DAL.Entities;

namespace DAL.Repositories.Interface
{
	public interface ICardPositionRepository : IGenericRepository<CardPosition>
	{
		Task<List<CardPosition>> GetMeanings(List<CardAfterPickDTO> model, int topicId);
	}
}
