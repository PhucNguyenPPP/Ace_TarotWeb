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
        IFreeTarotRepository FreeTarot { get; }
        ICardTypeRepository CardType { get; }
    }
}
