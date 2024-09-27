using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.User
{
	public class UpdateUserDTO
	{
		public Guid UserId { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập họ và tên")]
		[MinLength(8, ErrorMessage = "Họ và tên phải có ít nhất 8 ký tự")]
		[RegularExpression("^[\\p{L}]+([\\s\\p{L}]+)*$",
			ErrorMessage = "Họ và tên không hợp lệ")]
		public string FullName { get; set; } = null!;
		[Required(ErrorMessage = "Vui lòng nhập email")]
		[EmailAddress]
		public string Email { get; set; } = null!;
		[Required(ErrorMessage = "Vui lòng nhập ngày sinh")]
		public DateTime DateOfBirth { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
		[RegularExpression("^0\\d{9}$",
			ErrorMessage = "Số điện thoại không hợp lệ")]
		public string Phone { get; set; } = null!;
		[Required(ErrorMessage = "Vui lòng nhập địa chỉ")]

		public string Address { get; set; } = null!;
		[Required(ErrorMessage = "Vui lòng chọn giới tính")]
		public string Gender { get; set; } = null!;

	}
}
