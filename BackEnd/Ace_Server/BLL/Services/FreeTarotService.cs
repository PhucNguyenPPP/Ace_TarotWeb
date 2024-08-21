using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.DTO.Card;
using Common.DTO.General;
using Common.DTO.User;
using DAL.Entities;
using DAL.UnitOfWork;
using Microsoft.Net.Http.Headers;

namespace BLL.Services
{
    public class FreeTarotService : IFreeTarotService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public FreeTarotService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<ResponseDTO> GetRandomCard( int cardType)
        {
            try
            {
                Random random = new Random();
                List<Card> list = await _unitOfWork.FreeTarot.GetAllCard(cardType);
                if(list == null)
                {
                    return new ResponseDTO("Danh sách trống", 500, false);
                }
                else
                {
                    List<Card> selected = new List<Card>();
                    while(selected.Count < 3)
                    {
                        int index = random.Next(list.Count);
                        var card = list[index];

                        //check dup
                        if(!selected.Contains(card))
                        {
                            selected.Add(card);
                        }
                    }
                    var listCard = _mapper.Map<List<FreeTarotCardDTO>>(selected);
                    return new ResponseDTO("Chọn bài thành công", 200, true, listCard);
                }
            }
            catch (Exception ex)
            {
                return new ResponseDTO("Chọn bài thất bại", 400, false);
            }
        }
    }
}
