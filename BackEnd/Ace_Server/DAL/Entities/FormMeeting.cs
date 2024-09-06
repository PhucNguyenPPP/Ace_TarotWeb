using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class FormMeeting
{
    public Guid FormMeetingId { get; set; }

    public string FormMeetingName { get; set; } = null!;

    public virtual ICollection<UserFormMeeting> UserFormMeetings { get; set; } = new List<UserFormMeeting>();
}
