using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.User
{
    public class UpdateTarotReaderDTO
    {
        public required Guid UserId { get; set; }
        public int? Experience { get; set; }

        public string? Description { get; set; }

        public string? NickName { get; set; }

        public string? Quote { get; set; }

        public string? MeetLink { get; set; }

    }
}
