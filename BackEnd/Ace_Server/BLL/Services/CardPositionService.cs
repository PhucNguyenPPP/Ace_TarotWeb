using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using AutoMapper;
using BLL.Interface;
using Common.DTO.Card;
using Common.DTO.CardPosition;
using Common.DTO.General;
using DAL.Entities;
using DAL.UnitOfWork;

namespace BLL.Services
{
    public class CardPositionService : ICardPositionService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
		private readonly ICardService _cardService;
		public CardPositionService(IUnitOfWork unitOfWork, IMapper mapper, ICardService cardService)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
			_cardService = cardService;
		}
		public async Task<ResponseDTO> ViewMeaningOfCards(List<CardAfterPickDTO> model, int topicId)
		{
			if (model == null)
			{
				return new ResponseDTO("Không có thẻ bài nào", 404, false);
			}
			if (model.Count != 3)
			{
				return new ResponseDTO("Số lượng thẻ bài không hợp lệ", 400, false);
			}
			List<CardPosition> cardPositions = await _unitOfWork.CardPosition.GetMeanings(model, topicId);
			List<CardPositionDTO> cardPositionDTOs = _mapper.Map<List<CardPositionDTO>>(cardPositions);
			foreach (var cardPositionDTO in cardPositionDTOs) {
				Card? card = await _cardService.FindCardById(cardPositionDTO.CardId);
				if (card != null) {
					cardPositionDTO.CardAfterMeaning = _mapper.Map<CardAfterMeaningDTO>(card);
				}
			} 
			return new ResponseDTO("Lấy thông tin ý nghĩa thành công",200,true,cardPositionDTOs);
		}
	}
}
