using DAL.Entities;
using DAL.Repositories;
using DAL.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AceContext _context;
        public UnitOfWork()
        {
            _context = new AceContext();
            User = new UserRepository(_context);
            Booking = new BookingRepository(_context);
            Role = new RoleRepository(_context);
            Card = new CardRepository(_context);
            CardType = new CardTypeRepository(_context);
            RefreshToken = new RefreshTokenRepository(_context);
            CardPosition = new CardPositionRepository(_context);
            UserLanguage = new UserLanguageRepository(_context);
			UserServiceType = new UserServiceTypeRepository(_context);
            UserFormMeeting = new UserFormMeetingRepository(_context);
            UserSlot = new UserSlotRepository(_context);
            Language = new LanguageRepository(_context);
			ServiceType = new ServiceTypeRepository(_context);
            FormMeeting = new FormMeetingRepository(_context);
            Slot = new SlotRepository(_context);
		    Topic = new TopicRepository(_context);
            Service = new ServiceRepository(_context);
        }

       
        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<bool> SaveChangeAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public IUserRepository User { get; private set; }

        public IBookingRepository Booking { get; private set; }

        public IRoleRepository Role { get; private set; }

        public ICardRepository Card { get; private set; } 
        public ICardTypeRepository CardType { get; private set; }
        public IRefreshTokenRepository RefreshToken { get; private set; }

		public ICardPositionRepository CardPosition { get; private set; }
		public IUserLanguageRepository UserLanguage { get; private set; }

		public IUserServiceTypeRepository UserServiceType { get; private set; }
		public IUserFormMeetingRepository UserFormMeeting { get; private set; }
		public IUserSlotRepository UserSlot { get; private set; }
		public ILanguageRepository Language { get; private set; }
        public IServiceTypeRepository ServiceType { get; private set; }

		public IFormMeetingRepository FormMeeting { get; private set; }

		public ISlotRepository Slot { get; private set; }

        public ITopicRepository Topic { get; private set; }

        public IServiceRepository Service { get; private set; }
    }
}
