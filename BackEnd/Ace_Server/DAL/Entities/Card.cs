using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class Card
{
    public int CardId { get; set; }

    public string ImageLink { get; set; } = null!;

    public string CardName { get; set; } = null!;

    public int CardTypeId { get; set; }

    public virtual ICollection<CardPosition> CardPositions { get; set; } = new List<CardPosition>();

    public virtual CardType CardType { get; set; } = null!;
}
