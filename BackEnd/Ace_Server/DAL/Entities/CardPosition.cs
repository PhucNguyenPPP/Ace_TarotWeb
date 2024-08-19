using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class CardPosition
{
    public int CardPositionId { get; set; }

    public string Meaning { get; set; } = null!;

    public int TopicId { get; set; }

    public int PositionId { get; set; }

    public int CardId { get; set; }

    public virtual Card Card { get; set; } = null!;

    public virtual Position Position { get; set; } = null!;

    public virtual Topic Topic { get; set; } = null!;
}
