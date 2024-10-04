using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class ComplaintImage
{
    public Guid ComplaintImageId { get; set; }

    public string ImageLink { get; set; } = null!;

    public Guid BookingId { get; set; }

    public virtual Booking Booking { get; set; } = null!;
}
