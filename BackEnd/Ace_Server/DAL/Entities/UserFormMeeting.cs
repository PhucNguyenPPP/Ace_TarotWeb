using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class UserFormMeeting
{
    public Guid UserFormMeetingId { get; set; }

    public Guid UserId { get; set; }

    public Guid FormMeetingId { get; set; }

    public virtual FormMeeting FormMeeting { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
