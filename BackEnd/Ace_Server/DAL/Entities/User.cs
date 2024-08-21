using System;
using System.Collections.Generic;

namespace DAL.Entities;

public partial class User
{
    public Guid UserId { get; set; }

    public string UserName { get; set; } = null!;

    public byte[] Salt { get; set; } = null!;

    public byte[] PasswordHash { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string AvatarLink { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime DateOfBirth { get; set; }

    public string Gender { get; set; } = null!;

    public int? Experience { get; set; }

    public string? Description { get; set; }

    public string? NickName { get; set; }

    public string? Quote { get; set; }

    public bool Status { get; set; }

    public Guid RoleId { get; set; }

    public virtual ICollection<Booking> BookingCustomers { get; set; } = new List<Booking>();

    public virtual ICollection<Booking> BookingTarotReaders { get; set; } = new List<Booking>();

    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<UserFormMeeting> UserFormMeetings { get; set; } = new List<UserFormMeeting>();

    public virtual ICollection<UserLanguage> UserLanguages { get; set; } = new List<UserLanguage>();

    public virtual ICollection<UserService> UserServices { get; set; } = new List<UserService>();

    public virtual ICollection<UserSlot> UserSlots { get; set; } = new List<UserSlot>();
}
