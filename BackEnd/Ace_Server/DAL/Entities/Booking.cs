using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class Booking
{
    public Guid BookingId { get; set; }

    public decimal Price { get; set; }

    public int? BehaviorRating { get; set; }

    public string? BehaviorFeedback { get; set; }

    public int? QualityRating { get; set; }

    public string? QualityFeedback { get; set; }

    public string Status { get; set; } = null!;

    public Guid CustomerId { get; set; }

    public Guid TarotReaderId { get; set; }

    public Guid ServiceId { get; set; }

    public virtual ICollection<BookingSlot> BookingSlots { get; set; } = new List<BookingSlot>();

    public virtual User Customer { get; set; } = null!;

    public virtual Service Service { get; set; } = null!;

    public virtual User TarotReader { get; set; } = null!;

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
