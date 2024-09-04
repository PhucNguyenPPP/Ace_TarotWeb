using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Language
{
    public class LanguageOfReaderDTO
    {
        public Guid LanguageId { get; set; }

        public string LanguageName { get; set; } = null!;
    }
}
