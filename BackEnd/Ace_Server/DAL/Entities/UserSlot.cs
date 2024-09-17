using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class UserSlot
{
    public Guid UserSlotId { get; set; }

    public bool Status { get; set; }

    public Guid UserId { get; set; }

    public Guid SlotId { get; set; }

    public Guid? BookingId { get; set; }

    public virtual Booking? Booking { get; set; }

    public virtual Slot Slot { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
