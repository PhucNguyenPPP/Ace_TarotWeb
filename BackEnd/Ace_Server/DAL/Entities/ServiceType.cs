using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class ServiceType
{
    public Guid ServiceTypeId { get; set; }

    public string ServiceTypeName { get; set; } = null!;

    public bool? Status { get; set; }

    public virtual ICollection<Service> Services { get; set; } = new List<Service>();

    public virtual ICollection<UserServiceType> UserServiceTypes { get; set; } = new List<UserServiceType>();
}
