using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.UserLanguage
{
    public class RegisterUserLanguageDTO
    {
        public required Guid UserId { get; set; }

        public required Guid LanguageId { get; set; }
    }
}
