using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Card
{
    public class CardRequestDTO
    {
        public int CardId { get; set; }
        public string CardName { get; set; }
        public IFormFile CardImage { get; set; }
        public int CardTypeId { get; set; }
        
    }
}
