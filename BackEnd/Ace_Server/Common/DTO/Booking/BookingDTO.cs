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

        [Required(ErrorMessage = "Vui lòng nhập giá dịch vụ")]
        [Range(1,int.MaxValue,ErrorMessage ="Giá dịch vụ phải lớn hơn 1")]
        public decimal Price { get; set; }

        public int? BehaviorRating { get; set; }

        public string? BehaviorFeedback { get; set; }

        public int? QualityRating { get; set; }

        public string? QualityFeedback { get; set; }

    }
}
