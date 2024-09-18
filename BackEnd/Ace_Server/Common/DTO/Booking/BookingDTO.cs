using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Booking
{
    public class BookingDTO
    {
        [Required(ErrorMessage = "Vui lòng nhập ID khách hàng")]
        public Guid CustomerId { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập ID Tarot Reader")]
        public Guid TarotReaderId { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập ID dịch vụ")]
        public Guid ServiceId { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập ID phương thức xem")]
        public Guid FormMeetingId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Số lượng câu hỏi phải lớn hơn 0")]
        public int? QuestionAmount { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập slot xem")]
        public List<Guid> userSlotId { get; set; }

    }
}
