using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class Booking
{
    public Guid BookingId { get; set; }

    public string BookingNumber { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public decimal Price { get; set; }

    public int? BehaviorRating { get; set; }

    public string? BehaviorFeedback { get; set; }

    public int? QualityRating { get; set; }

    public string? QualityFeedback { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public int? QuestionAmount { get; set; }

    public string Status { get; set; } = null!;

    public Guid FormMeetingId { get; set; }

    public Guid CustomerId { get; set; }

    public Guid TarotReaderId { get; set; }

    public Guid ServiceId { get; set; }

    public virtual User Customer { get; set; } = null!;

    public virtual FormMeeting FormMeeting { get; set; } = null!;

    public virtual Service Service { get; set; } = null!;

    public virtual User TarotReader { get; set; } = null!;

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();

    public virtual ICollection<UserSlot> UserSlots { get; set; } = new List<UserSlot>();
}
