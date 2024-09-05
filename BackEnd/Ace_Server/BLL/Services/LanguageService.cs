using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.DTO.General;
using Common.DTO.Language;
using Common.DTO.Topic;
using DAL.UnitOfWork;
using Microsoft.IdentityModel.Tokens;

namespace BLL.Services
{
    public class LanguageService : ILanguageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public LanguageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ResponseDTO> GetAllLanguage()
        {
            var languages = _unitOfWork.Language.GetAll();
            if (languages.IsNullOrEmpty() || languages.Count() == 0)
            {
                return new ResponseDTO("Không có ngôn ngữ để hiển thị", 400, false);
            }
            var list = _mapper.Map<List<LanguageOfReaderDTO>>(languages);
            return new ResponseDTO("Hiện ngôn ngữ thành công", 200, true, list);
        }
    }
}
