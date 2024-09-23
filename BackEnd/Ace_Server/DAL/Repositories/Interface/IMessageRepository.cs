using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.Message;
using DAL.Entities;
using FirebaseAdmin.Messaging;

namespace DAL.Repositories.Interface
{
	public interface IMessageRepository : IGenericRepository<DAL.Entities.Message>
	{
	}
}
