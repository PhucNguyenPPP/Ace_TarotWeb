using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class UserLanguage
{
    public Guid UserLanguageId { get; set; }

    public Guid UserId { get; set; }

    public Guid LanguageId { get; set; }

    public virtual Language Language { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
