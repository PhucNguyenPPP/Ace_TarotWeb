using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.User;
using DAL.Entities;

namespace DAL.Repositories.Interface
{
	public interface ITarotReaderRespository : IGenericRepository<User>
	{
		Task<List<User>> GetAllTarotReader(Expression<Func<User, bool>> expression, int pageNumber, int rowsPerpage);
	}
}
