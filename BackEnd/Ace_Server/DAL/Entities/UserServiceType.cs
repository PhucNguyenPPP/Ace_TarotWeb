using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class UserServiceType
{
    public Guid UserServiceTypeId { get; set; }

    public bool Status { get; set; }

    public Guid UserId { get; set; }

    public Guid ServiceTypeId { get; set; }

    public virtual ServiceType ServiceType { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
