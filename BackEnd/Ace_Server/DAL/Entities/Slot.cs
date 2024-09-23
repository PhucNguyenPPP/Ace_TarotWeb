using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class Slot
{
    public Guid SlotId { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public bool Status { get; set; }

    public virtual ICollection<UserSlot> UserSlots { get; set; } = new List<UserSlot>();
}
