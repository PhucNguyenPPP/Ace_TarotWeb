using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interface
{
    public interface IUserRepository : IGenericRepository<User>
    {
		Task<List<User>> GetAllTarotReader(IQueryable<User> users , int pageNumber, int rowsPerpage);
	}
}
