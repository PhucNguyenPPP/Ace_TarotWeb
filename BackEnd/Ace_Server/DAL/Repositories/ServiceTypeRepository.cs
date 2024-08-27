using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Entities;
using DAL.Repositories.Interface;

namespace DAL.Repositories
{
	public class ServiceTypeRepository : GenericRepository<ServiceType>, IServiceTypeRepository
	{
		public ServiceTypeRepository(AceContext context) : base(context)
		{
		}
	}
}
