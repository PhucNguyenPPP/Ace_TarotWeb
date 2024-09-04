using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.DTO.FormMeeting;
using Common.DTO.General;
using Common.DTO.Topic;
using DAL.UnitOfWork;
using Microsoft.IdentityModel.Tokens;

namespace BLL.Services
{
    public class FormMeetingService : IFormMeetingService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public FormMeetingService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ResponseDTO> GetAllFormMeeting()
        {
            var formMeetings = _unitOfWork.FormMeeting.GetAll();
            if (formMeetings.IsNullOrEmpty() || formMeetings.Count() == 0)
            {
                return new ResponseDTO("Không có hình thức xem để hiển thị", 400, false);
            }
            var list = _mapper.Map<List<FormMeetingOfReaderDTO>>(formMeetings);
            return new ResponseDTO("Hiện hình thức xem thành công", 200, true, list);
        }
    }
}
