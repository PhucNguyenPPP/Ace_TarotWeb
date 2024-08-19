using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class BookingSlot
{
    public Guid BookingSlotId { get; set; }

    public Guid BookingId { get; set; }

    public Guid SlotId { get; set; }

    public virtual Booking Booking { get; set; } = null!;

    public virtual Slot Slot { get; set; } = null!;
}
