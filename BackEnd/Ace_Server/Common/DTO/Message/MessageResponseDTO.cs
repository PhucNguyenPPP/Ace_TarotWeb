using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Message
{
    public class MessageResponseDTO
    {
        public Guid MessageId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid SendUserId { get; set; }

        public Guid ReceiveUserId { get; set; }
    }
}
