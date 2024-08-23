using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Common.DTO.User
{
	public class TarotReaderDetailDTO
	{
		public Guid UserId { get; set; }

		public string UserName { get; set; } = null!;

		public byte[] Salt { get; set; } = null!;

		public byte[] PasswordHash { get; set; } = null!;

		public string FullName { get; set; } = null!;

		public string AvatarLink { get; set; } = null!;

		public string Phone { get; set; } = null!;

		public string Address { get; set; } = null!;

		public string Email { get; set; } = null!;

		public DateTime DateOfBirth { get; set; }

		public string Gender { get; set; } = null!;

		public int? Experience { get; set; }

		public string? Description { get; set; }

		public string? NickName { get; set; }

		public string? Quote { get; set; }

		public bool Status { get; set; }

		public Guid RoleId { get; set; }

		public List<LanguageOfReaderDTO>? LanguageOfReader { get; set; }	
		public List<FormMeetingOfReaderDTO>? FormMeetingOfReaderDTOs { get; set; }


	}
}
