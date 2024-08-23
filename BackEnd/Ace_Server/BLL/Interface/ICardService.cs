﻿using Common.DTO.Card;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interface
{
    public interface ICardService
    {
        public Task<bool> AddCard(CardRequestDTO model);
		public Task<Card?> FindCardById(int cardId);
	}
}
