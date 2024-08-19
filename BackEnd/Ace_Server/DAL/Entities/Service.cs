using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class Service
{
    public Guid ServiceId { get; set; }

    public string ServiceName { get; set; } = null!;

    public decimal Price { get; set; }

    public int Duration { get; set; }

    public bool Status { get; set; }

    public Guid ServiceTypeId { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual ServiceType ServiceType { get; set; } = null!;

    public virtual ICollection<UserService> UserServices { get; set; } = new List<UserService>();
}
