using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.Message;
using DAL.Entities;
using DAL.Repositories.Interface;
using FirebaseAdmin.Messaging;

namespace DAL.Repositories
{
	public class MessageRepository : GenericRepository<Entities.Message>, IMessageRepository
	{
		public MessageRepository(AceContext context) : base(context)
		{
		}


	}
}
