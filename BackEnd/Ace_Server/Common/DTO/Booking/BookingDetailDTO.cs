using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Booking
{
    public class BookingDetailDTO
    {
        public string? TarotReaderId{ get; set; }
        public string? TarotReaderName { get; set; }
        public string? CustomerId { get; set; }
        public string? CustomerName { get; set; }

        public string Status { get; set; } = null!;

        public Guid BookingId { get; set; }

        public string BookingNumber { get; set; } = null!;

        public int BookingCodePayOs { get; set; }

        public string? PayOsUrlPayment {  get; set; }

        public DateTime CreatedDate { get; set; }

        public DateOnly BookingDate { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string ServiceTypeName { get; set; }

        public string ServiceName { get; set; }

        public int? QuestionAmount { get; set; }

        public int? BehaviorRating { get; set; }

        public string? BehaviorFeedback { get; set; }

        public string FormMeetingName { get; set; }

        public string MeetLink { get; set; }
    }
}
