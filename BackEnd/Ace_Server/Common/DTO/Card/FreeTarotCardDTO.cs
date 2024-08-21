using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Card
{
    public class FreeTarotCardDTO
    {
        public int CardId { get; set; }

        public string ImageLink { get; set; } = null!;

        public string CardName { get; set; } = null!;

        public int CardTypeId { get; set; }
    }
}
