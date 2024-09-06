using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.CardPosition;
using Common.DTO.General;

namespace BLL.Interface
{
    public interface ICardPositionService
	{
		Task<ResponseDTO> ViewMeaningOfCards(List<CardAfterPickDTO> model, int topicId);
	}
}
