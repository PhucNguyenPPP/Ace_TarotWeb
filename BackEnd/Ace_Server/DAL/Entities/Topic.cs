using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class Topic
{
    public int TopicId { get; set; }

    public string TopicName { get; set; } = null!;

    public virtual ICollection<CardPosition> CardPositions { get; set; } = new List<CardPosition>();
}
