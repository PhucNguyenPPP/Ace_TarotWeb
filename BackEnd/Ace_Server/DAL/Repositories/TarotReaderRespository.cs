using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.User;
using DAL.Entities;
using DAL.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
	public class TarotReaderRespository : GenericRepository<User>, ITarotReaderRespository
	{
		public TarotReaderRespository(AceContext context) : base(context)
		{
		}

		public async Task<List<User>> GetAllTarotReader(Expression<Func<User, bool>> expression, int pageNumber, int rowsPerpage)
		{
			List<User> list = await Paging(expression,pageNumber,rowsPerpage);
			return list;
		}
	}
}
