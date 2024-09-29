using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Common.DTO.Booking
{
    public class BookingComplaintDTO
    {
        [Required(ErrorMessage = "Vui lòng nhập ID Booking")]
        public Guid BookingId { get; set; }


        [Required(ErrorMessage = "Vui lòng nhập miêu tả")]
        public string? ComplaintDescription { get; set; }

        [Required(ErrorMessage = "Vui lòng chọn ảnh")]
        public List<IFormFile> ImageLink { get; set; } = null!;

    }
}
