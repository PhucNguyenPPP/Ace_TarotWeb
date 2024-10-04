using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DAL.Entities;

public partial class AceContext : DbContext
{
    public AceContext()
    {
    }

    public AceContext(DbContextOptions<AceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<Card> Cards { get; set; }

    public virtual DbSet<CardPosition> CardPositions { get; set; }

    public virtual DbSet<CardType> CardTypes { get; set; }

    public virtual DbSet<ComplaintImage> ComplaintImages { get; set; }

    public virtual DbSet<FormMeeting> FormMeetings { get; set; }

    public virtual DbSet<Language> Languages { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Position> Positions { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<ServiceType> ServiceTypes { get; set; }

    public virtual DbSet<Slot> Slots { get; set; }

    public virtual DbSet<Topic> Topics { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserFormMeeting> UserFormMeetings { get; set; }

    public virtual DbSet<UserLanguage> UserLanguages { get; set; }

    public virtual DbSet<UserServiceType> UserServiceTypes { get; set; }

    public virtual DbSet<UserSlot> UserSlots { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;uid=SA;pwd=12345;database=Ace;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BookingId).HasName("PK__Booking__73951AEDDAA45ECC");

            entity.ToTable("Booking");

            entity.HasIndex(e => e.BookingNumber, "UQ__Booking__AAC320BF14060C47").IsUnique();

            entity.Property(e => e.BookingId).ValueGeneratedNever();
            entity.Property(e => e.BookingNumber).HasMaxLength(100);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.EndTime).HasColumnType("datetime");
            entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.StartTime).HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(50);

            entity.HasOne(d => d.Customer).WithMany(p => p.BookingCustomers)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Booking__Custome__440B1D61");

            entity.HasOne(d => d.FormMeeting).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.FormMeetingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Booking__FormMee__4316F928");

            entity.HasOne(d => d.Service).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Booking__Service__45F365D3");

            entity.HasOne(d => d.TarotReader).WithMany(p => p.BookingTarotReaders)
                .HasForeignKey(d => d.TarotReaderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Booking__TarotRe__44FF419A");
        });

        modelBuilder.Entity<Card>(entity =>
        {
            entity.HasKey(e => e.CardId).HasName("PK__Card__55FECDAE59CC85CB");

            entity.ToTable("Card");

            entity.Property(e => e.CardId).ValueGeneratedNever();
            entity.Property(e => e.CardName).HasMaxLength(100);

            entity.HasOne(d => d.CardType).WithMany(p => p.Cards)
                .HasForeignKey(d => d.CardTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Card__CardTypeId__5535A963");
        });

        modelBuilder.Entity<CardPosition>(entity =>
        {
            entity.HasKey(e => e.CardPositionId).HasName("PK__CardPosi__7F3321612D97E05D");

            entity.ToTable("CardPosition");

            entity.Property(e => e.CardPositionId).ValueGeneratedNever();

            entity.HasOne(d => d.Card).WithMany(p => p.CardPositions)
                .HasForeignKey(d => d.CardId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CardPosit__CardI__5DCAEF64");

            entity.HasOne(d => d.Position).WithMany(p => p.CardPositions)
                .HasForeignKey(d => d.PositionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CardPosit__Posit__5CD6CB2B");

            entity.HasOne(d => d.Topic).WithMany(p => p.CardPositions)
                .HasForeignKey(d => d.TopicId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CardPosit__Topic__5BE2A6F2");
        });

        modelBuilder.Entity<CardType>(entity =>
        {
            entity.HasKey(e => e.CardTypeId).HasName("PK__CardType__AB0A3D11E35EC9B4");

            entity.ToTable("CardType");

            entity.Property(e => e.CardTypeId).ValueGeneratedNever();
            entity.Property(e => e.CardTypeName).HasMaxLength(100);
        });

        modelBuilder.Entity<ComplaintImage>(entity =>
        {
            entity.HasKey(e => e.ComplaintImageId).HasName("PK__Complain__F5DE709DAACE30CF");

            entity.ToTable("ComplaintImage");

            entity.Property(e => e.ComplaintImageId).ValueGeneratedNever();

            entity.HasOne(d => d.Booking).WithMany(p => p.ComplaintImages)
                .HasForeignKey(d => d.BookingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Complaint__Booki__48CFD27E");
        });

        modelBuilder.Entity<FormMeeting>(entity =>
        {
            entity.HasKey(e => e.FormMeetingId).HasName("PK__FormMeet__CFA8C8B01A7969EB");

            entity.ToTable("FormMeeting");

            entity.Property(e => e.FormMeetingId).ValueGeneratedNever();
            entity.Property(e => e.FormMeetingName).HasMaxLength(100);
        });

        modelBuilder.Entity<Language>(entity =>
        {
            entity.HasKey(e => e.LanguageId).HasName("PK__Language__B93855AB972BDBF5");

            entity.ToTable("Language");

            entity.Property(e => e.LanguageId).ValueGeneratedNever();
            entity.Property(e => e.LanguageName).HasMaxLength(100);
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.MessageId).HasName("PK__Message__C87C0C9C11C7637D");

            entity.ToTable("Message");

            entity.Property(e => e.MessageId).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.ReceiveUser).WithMany(p => p.MessageReceiveUsers)
                .HasForeignKey(d => d.ReceiveUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Message__Receive__619B8048");

            entity.HasOne(d => d.SendUser).WithMany(p => p.MessageSendUsers)
                .HasForeignKey(d => d.SendUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Message__SendUse__60A75C0F");
        });

        modelBuilder.Entity<Position>(entity =>
        {
            entity.HasKey(e => e.PositionId).HasName("PK__Position__60BB9A798C82BFEC");

            entity.ToTable("Position");

            entity.Property(e => e.PositionId).ValueGeneratedNever();
            entity.Property(e => e.Position1).HasColumnName("Position");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.RefreshTokenId).HasName("PK__RefreshT__F5845E3918027D34");

            entity.ToTable("RefreshToken");

            entity.Property(e => e.RefreshTokenId).ValueGeneratedNever();
            entity.Property(e => e.ExpiredAt).HasColumnType("datetime");
            entity.Property(e => e.RefreshToken1).HasColumnName("RefreshToken");

            entity.HasOne(d => d.User).WithMany(p => p.RefreshTokens)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__RefreshTo__UserI__29572725");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__8AFACE1A2B4A710E");

            entity.ToTable("Role");

            entity.Property(e => e.RoleId).ValueGeneratedNever();
            entity.Property(e => e.RoleName).HasMaxLength(100);
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PK__Service__C51BB00A21CEB138");

            entity.ToTable("Service");

            entity.Property(e => e.ServiceId).ValueGeneratedNever();
            entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.ServiceName).HasMaxLength(100);

            entity.HasOne(d => d.ServiceType).WithMany(p => p.Services)
                .HasForeignKey(d => d.ServiceTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Service__Service__398D8EEE");
        });

        modelBuilder.Entity<ServiceType>(entity =>
        {
            entity.HasKey(e => e.ServiceTypeId).HasName("PK__ServiceT__8ADFAA6C2521AA1B");

            entity.ToTable("ServiceType");

            entity.Property(e => e.ServiceTypeId).ValueGeneratedNever();
            entity.Property(e => e.ServiceTypeName).HasMaxLength(100);
        });

        modelBuilder.Entity<Slot>(entity =>
        {
            entity.HasKey(e => e.SlotId).HasName("PK__Slot__0A124AAF84571E64");

            entity.ToTable("Slot");

            entity.Property(e => e.SlotId).ValueGeneratedNever();
            entity.Property(e => e.EndTime).HasColumnType("datetime");
            entity.Property(e => e.StartTime).HasColumnType("datetime");
        });

        modelBuilder.Entity<Topic>(entity =>
        {
            entity.HasKey(e => e.TopicId).HasName("PK__Topic__022E0F5DA3480E4C");

            entity.ToTable("Topic");

            entity.Property(e => e.TopicId).ValueGeneratedNever();
            entity.Property(e => e.TopicName).HasMaxLength(100);
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__Transact__55433A6B40024205");

            entity.ToTable("Transaction");

            entity.Property(e => e.TransactionId).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.PaymentMethod).HasMaxLength(100);
            entity.Property(e => e.Status).HasMaxLength(50);

            entity.HasOne(d => d.Booking).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.BookingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Transacti__Booki__5070F446");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__1788CC4C6E89ACA7");

            entity.ToTable("User");

            entity.Property(e => e.UserId).ValueGeneratedNever();
            entity.Property(e => e.Address).HasMaxLength(200);
            entity.Property(e => e.DateOfBirth).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.Gender).HasMaxLength(20);
            entity.Property(e => e.NickName).HasMaxLength(50);
            entity.Property(e => e.OtpExpiredTime).HasColumnType("datetime");
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.Quote).HasMaxLength(200);
            entity.Property(e => e.UserName).HasMaxLength(100);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__User__RoleId__267ABA7A");
        });

        modelBuilder.Entity<UserFormMeeting>(entity =>
        {
            entity.HasKey(e => e.UserFormMeetingId).HasName("PK__UserForm__3785D33C7810ED61");

            entity.ToTable("UserFormMeeting");

            entity.Property(e => e.UserFormMeetingId).ValueGeneratedNever();

            entity.HasOne(d => d.FormMeeting).WithMany(p => p.UserFormMeetings)
                .HasForeignKey(d => d.FormMeetingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserFormM__FormM__34C8D9D1");

            entity.HasOne(d => d.User).WithMany(p => p.UserFormMeetings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserFormM__UserI__33D4B598");
        });

        modelBuilder.Entity<UserLanguage>(entity =>
        {
            entity.HasKey(e => e.UserLanguageId).HasName("PK__UserLang__8086CE39EB0DF6D5");

            entity.ToTable("UserLanguage");

            entity.Property(e => e.UserLanguageId).ValueGeneratedNever();

            entity.HasOne(d => d.Language).WithMany(p => p.UserLanguages)
                .HasForeignKey(d => d.LanguageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserLangu__Langu__2F10007B");

            entity.HasOne(d => d.User).WithMany(p => p.UserLanguages)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserLangu__UserI__2E1BDC42");
        });

        modelBuilder.Entity<UserServiceType>(entity =>
        {
            entity.HasKey(e => e.UserServiceTypeId).HasName("PK__UserServ__090AC700E9A21E6A");

            entity.ToTable("UserServiceType");

            entity.Property(e => e.UserServiceTypeId).ValueGeneratedNever();

            entity.HasOne(d => d.ServiceType).WithMany(p => p.UserServiceTypes)
                .HasForeignKey(d => d.ServiceTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserServi__Servi__3D5E1FD2");

            entity.HasOne(d => d.User).WithMany(p => p.UserServiceTypes)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserServi__UserI__3C69FB99");
        });

        modelBuilder.Entity<UserSlot>(entity =>
        {
            entity.HasKey(e => e.UserSlotId).HasName("PK__UserSlot__2DFB111E266EF8BB");

            entity.ToTable("UserSlot");

            entity.Property(e => e.UserSlotId).ValueGeneratedNever();

            entity.HasOne(d => d.Booking).WithMany(p => p.UserSlots)
                .HasForeignKey(d => d.BookingId)
                .HasConstraintName("FK__UserSlot__Bookin__4D94879B");

            entity.HasOne(d => d.Slot).WithMany(p => p.UserSlots)
                .HasForeignKey(d => d.SlotId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserSlot__SlotId__4CA06362");

            entity.HasOne(d => d.User).WithMany(p => p.UserSlots)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserSlot__UserId__4BAC3F29");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
