using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Booking
{
    public class BookingDetailDTO
    {
        public string? TarotReaderName { get; set; }

        public string Status { get; set; } = null!;

        public Guid BookingId { get; set; }

        public string BookingNumber { get; set; } = null!;

        public DateTime CreatedDate { get; set; }

        public DateOnly BookingDate { get; set; }

        public TimeOnly StartTime { get; set; }

        public TimeOnly EndTime { get; set; }

        public string ServiceTypeName { get; set; }

        public string ServiceName { get; set; }

        public int? QuestionAmount { get; set; }

        public int? BehaviorRating { get; set; }

        public string? BehaviorFeedback { get; set; }

        public string FormMeetingName { get; set; }
    }
}
