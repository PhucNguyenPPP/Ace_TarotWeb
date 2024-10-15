using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.FormMeeting;
using Common.DTO.General;
using Common.DTO.Language;

namespace BLL.Interface
{
    public interface ILanguageService
    {
        Task<ResponseDTO> GetAllLanguage();
        List<LanguageOfReaderDTO> GetAllLanguageOfTarotReader(Guid userId);
    }
}
