using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class Language
{
    public Guid LanguageId { get; set; }

    public string LanguageName { get; set; } = null!;

    public virtual ICollection<UserLanguage> UserLanguages { get; set; } = new List<UserLanguage>();
}
