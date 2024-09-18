using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Service
{
    public class ServiceDTO
    {
        public Guid ServiceId { get; set; }

        public string ServiceName { get; set; } = null!;

        public decimal Price { get; set; }

        public int Duration { get; set; }

        public bool Status { get; set; }
    }
}
