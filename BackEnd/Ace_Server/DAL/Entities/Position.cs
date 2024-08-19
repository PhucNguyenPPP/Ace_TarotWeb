using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class Position
{
    public int PositionId { get; set; }

    public int Position1 { get; set; }

    public virtual ICollection<CardPosition> CardPositions { get; set; } = new List<CardPosition>();
}
