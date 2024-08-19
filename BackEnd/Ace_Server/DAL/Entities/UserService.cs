using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class UserService
{
    public Guid UserServiceId { get; set; }

    public bool Status { get; set; }

    public Guid UserId { get; set; }

    public Guid ServiceId { get; set; }

    public virtual Service Service { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
