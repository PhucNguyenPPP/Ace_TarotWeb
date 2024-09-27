using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Message
{
    public class UserChatDTO
    {
        public Guid UserId { get; set; }
        public string FullName { get; set; }
        public string? NickName { get; set; }
        public string AvatarLink { get; set; }
        public string Content { get; set; }
    }
}
