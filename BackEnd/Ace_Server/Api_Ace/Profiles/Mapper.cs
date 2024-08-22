using AutoMapper;
using Common.DTO.Auth;
using Common.DTO.Card;
using Common.DTO.CardPosition;
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
			CreateMap<TarotReaderDTO, User>().ReverseMap();
            CreateMap<FreeTarotCardDTO, Card>().ReverseMap();
			CreateMap<CardTypeDTO, CardType>().ReverseMap();
            CreateMap<User, LocalUserDTO>().ReverseMap();
			CreateMap<CardPosition, CardPositionDTO>().ReverseMap();
			#endregion
		}
	}
}
