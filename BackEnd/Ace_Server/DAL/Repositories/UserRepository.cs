using DAL.Entities;
using DAL.Repositories.Interface;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(AceContext context) : base(context)
        {
        }

		public async Task<List<User>> GetAllTarotReader(IQueryable<User> users, int pageNumber, int rowsPerpage)
		{
			List<User> list = await Paging(users, pageNumber, rowsPerpage);
			return list;
		}
	}
}
