using AutoMapper;
using Common.DTO.Card;
using Common.DTO.CardType;
using Common.DTO.User;
using DAL.Entities;

namespace Api_Ace.Profiles
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            #region
            CreateMap<SignUpCustomerRequestDTO, User>().ReverseMap();
			#endregion
			#region
			CreateMap<TarotReaderDTO, User>().ReverseMap();
            #endregion
            #region
            CreateMap<FreeTarotCardDTO, Card>().ReverseMap();
			#endregion
			#region
			CreateMap<CardTypeDTO, CardType>().ReverseMap();
			#endregion
		}
	}
}
