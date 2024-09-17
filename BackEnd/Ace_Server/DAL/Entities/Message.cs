using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class Message
{
    public Guid MessageId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public Guid SendUserId { get; set; }

    public Guid ReceiveUserId { get; set; }

    public bool Status { get; set; }

    public virtual User ReceiveUser { get; set; } = null!;

    public virtual User SendUser { get; set; } = null!;
}
