using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class Transaction
{
    public Guid TransactionId { get; set; }

    public string? TransactionInfo { get; set; }

    public decimal? TransactionNumber { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string Status { get; set; } = null!;

    public Guid BookingId { get; set; }

    public virtual Booking Booking { get; set; } = null!;
}
