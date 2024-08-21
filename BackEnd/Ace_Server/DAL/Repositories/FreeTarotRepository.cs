using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.Card;
using DAL.Entities;
using DAL.Repositories.Interface;

namespace DAL.Repositories
{
    public class FreeTarotRepository : GenericRepository<Card>, IFreeTarotRepository
    {
        public FreeTarotRepository(AceContext context) : base(context)
        {
        }
        public async Task<List<Card>> GetAllCard(int cardType)
        {
            List<Card> list = GetAllByCondition(c => c.CardTypeId == cardType).ToList();
            return list;
        }
    }
}
