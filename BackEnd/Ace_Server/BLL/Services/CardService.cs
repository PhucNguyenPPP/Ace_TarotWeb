using AutoMapper;
using BLL.Interface;
using Common.DTO.Card;
using Common.DTO.General;
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
        private readonly IMapper _mapper;
        public CardService(IUnitOfWork unitOfWork, IImageService imageService, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
            _mapper = mapper;
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

        public async Task<ResponseDTO> GetRandomCard(int cardType)
        {
            Random random = new Random();
            List<Card> list = _unitOfWork.Card.GetAllByCondition(c => c.CardTypeId == cardType).ToList();
            if (list == null)
            {
                return new ResponseDTO("Danh sách trống", 400, false);
            }
            else
            {
                List<Card> selected = new List<Card>();
                while (selected.Count < 3)
                {
                    int index = random.Next(list.Count);
                    var card = list[index];

                    //check dup
                    if (!selected.Contains(card))
                    {
                        selected.Add(card);
                    }
                }
                var listCard = _mapper.Map<List<FreeTarotCardDTO>>(selected);
                return new ResponseDTO("Chọn bài thành công", 200, true, listCard);
            }

        }
    }
}
