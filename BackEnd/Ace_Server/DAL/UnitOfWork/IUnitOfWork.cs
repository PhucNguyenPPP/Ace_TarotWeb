using DAL.Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        public void Dispose();
        public Task<bool> SaveChangeAsync();
        IUserRepository User { get; }
        IBookingRepository Booking { get; }
        IRoleRepository Role { get; }
        ICardRepository Card { get; }
        ICardTypeRepository CardType { get; }
        IRefreshTokenRepository RefreshToken { get; }
        ICardPositionRepository CardPosition { get; }  
        IUserLanguageRepository UserLanguage { get; }
		IUserServiceTypeRepository UserServiceType { get; }
        IUserFormMeetingRepository UserFormMeeting { get; }
        IUserSlotRepository UserSlot { get; }
		ILanguageRepository Language { get; }
        IServiceTypeRepository ServiceType { get; }
        IFormMeetingRepository FormMeeting { get; }
        ISlotRepository Slot { get; }
        ITopicRepository Topic { get; }
        IServiceRepository Service { get; }
        ITransactionRepository Transaction { get; }
        IMessageRepository Message { get; }
        IComplaintImageRepository ComplaintImage { get; }

    }
}
