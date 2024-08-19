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
        }

        public IUserRepository User { get; private set; }
        public IBookingRepository Booking { get; private set; }
        public IRoleRepository Role { get; private set; }

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<bool> SaveChangeAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
