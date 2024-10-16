using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.General;
using Common.DTO.UserLanguage;

namespace BLL.Interface
{
    public interface IUserLanguageService
    {
        Task<ResponseDTO> RegisterUserLanguage(RegisterUserLanguageDTO registerUserLanguageDTO);
        Task<ResponseDTO> RemoveUserLanguage(Guid userLanguageId);
    }
}
