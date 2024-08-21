using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.Card;
using DAL.Entities;

namespace DAL.Repositories.Interface
{
    public interface IFreeTarotRepository : IGenericRepository<Card>
    {
        Task<List<Card>> GetAllCard(int cardType);
    }
}
