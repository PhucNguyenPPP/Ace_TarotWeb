using AutoMapper;
using Common.DTO.Auth;
using Common.DTO.Card;
using Common.DTO.CardPosition;
using Common.DTO.CardType;
using Common.DTO.FormMeeting;
using Common.DTO.Language;
using Common.DTO.ServiceType;
using Common.DTO.Slot;
using Common.DTO.Topic;
using Common.DTO.User;
using Common.DTO.UserSlot;
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
            CreateMap<User, LocalUserDTO>()
            .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.RoleName))
            .ReverseMap();
            CreateMap<CardPosition, CardPositionDTO>().ReverseMap();
			CreateMap<Card, CardAfterMeaningDTO>().ReverseMap();
			CreateMap<User, UserDetailDTO>().ReverseMap();
			CreateMap <Language, LanguageOfReaderDTO>().ReverseMap();
			CreateMap<ServiceType, ServiceTypeDTO>().ReverseMap();
			CreateMap<FormMeeting, FormMeetingOfReaderDTO>().ReverseMap();
			CreateMap<Slot, SlotDTO>().ReverseMap();
            CreateMap<Topic, TopicDTO>().ReverseMap();
            CreateMap<SignUpReaderRequestDTO, User>().ReverseMap();
			CreateMap<UserSlotOfDateDTO, UserSlot>().ReverseMap();
			#endregion
		}
	}
}
