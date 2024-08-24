using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.FormMeeting
{
    public class FormMeetingOfReaderDTO
    {
        public Guid FormMeetingId { get; set; }

        public string FormMeetingName { get; set; } = null!;
    }
}
