using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class CardType
{
    public int CardTypeId { get; set; }

    public string CardTypeName { get; set; } = null!;

    public virtual ICollection<Card> Cards { get; set; } = new List<Card>();
}
