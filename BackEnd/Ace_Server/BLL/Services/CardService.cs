using BLL.Interface;
using Common.DTO.Card;
using DAL.Entities;
using DAL.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class CardService : ICardService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IImageService _imageService;
        public CardService(IUnitOfWork unitOfWork, IImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
        }

        public async Task<bool> AddCard(CardRequestDTO model)
        {
            var imageLink = await _imageService.StoreImageAndGetLink(model.CardImage, "cards_img");
            Card card = new Card
            {
                CardId = model.CardId,
                CardName = model.CardName,
                CardTypeId = model.CardTypeId,
                ImageLink = imageLink,
            };

            await _unitOfWork.Card.AddAsync(card);
            return await _unitOfWork.SaveChangeAsync();
        }

        private int GenerateCardId()
        {
            var cardList = _unitOfWork.Card.GetAll();
            if(cardList.Count() == 0)
            {
                return 1;
            }
            var maxId = cardList.Max(c => c.CardId);
            return ++maxId;
        }
    }
}
