using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Entities;
using DAL.Repositories.Interface;

namespace DAL.Repositories
{
	public class UserServiceTypeRepository : GenericRepository<UserServiceType>, IUserServiceTypeRepository
	{
		public UserServiceTypeRepository(AceContext context) : base(context)
		{
		}
	}
}
