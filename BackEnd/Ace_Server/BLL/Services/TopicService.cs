using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.DTO.CardType;
using Common.DTO.General;
using Common.DTO.Topic;
using DAL.Entities;
using DAL.UnitOfWork;
using Microsoft.IdentityModel.Tokens;

namespace BLL.Services
{
    public class TopicService : ITopicService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public TopicService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<ResponseDTO> GetAllTopic()
        {
            var topics = _unitOfWork.Topic.GetAll();
            if(topics.IsNullOrEmpty() || topics.Count() == 0)
            {
                return new ResponseDTO("Không có chủ đề", 400, false);
            }
            var list = _mapper.Map<List<TopicDTO>>(topics);
            return new ResponseDTO("Hiện chủ đề thành công", 200, true, list);
        }
    }
}
