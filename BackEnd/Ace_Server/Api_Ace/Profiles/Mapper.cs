using AutoMapper;
using Common.DTO.Auth;
using Common.DTO.Booking;
using Common.DTO.Card;
using Common.DTO.CardPosition;
using Common.DTO.CardType;
using Common.DTO.FormMeeting;
using Common.DTO.Language;
using Common.DTO.Message;
using Common.DTO.Service;
using Common.DTO.ServiceType;
using Common.DTO.Slot;
using Common.DTO.Topic;
using Common.DTO.User;
using Common.DTO.UserLanguage;
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
            .ForMember(dest => dest.RoleId, opt => opt.MapFrom(src => src.Role.RoleId))
            .ReverseMap();
            CreateMap<CardPosition, CardPositionDTO>().ReverseMap();
            CreateMap<Card, CardAfterMeaningDTO>().ReverseMap();
            CreateMap<User, UserDetailDTO>().ReverseMap();
            CreateMap<Language, LanguageOfReaderDTO>().ReverseMap();
            CreateMap<ServiceType, ServiceTypeDTO>()
                .ForMember(dest => dest.Services, opt => opt.MapFrom(src => src.Services))
                .ReverseMap();
            CreateMap<FormMeeting, FormMeetingOfReaderDTO>().ReverseMap();
            CreateMap<Slot, SlotDTO>().ReverseMap();
            CreateMap<Topic, TopicDTO>().ReverseMap();
            CreateMap<SignUpReaderRequestDTO, User>().ReverseMap();
            CreateMap<UserSlot, UserSlotOfDateDTO>()
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.Slot.StartTime))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.Slot.EndTime))
                .ReverseMap();


            CreateMap<Service, ServiceDTO>().ReverseMap();
            CreateMap<UserServiceType, ServiceTypeOfUserDTO>()
            .ForMember(dest => dest.ServiceTypeName, opt => opt.MapFrom(src => src.ServiceType != null ? src.ServiceType.ServiceTypeName : "Unknown"))
            .ForMember(dest => dest.Services, opt => opt.MapFrom(src => src.ServiceType.Services.ToList()))
            .ReverseMap();
            CreateMap<Booking, BookingDTO>().ReverseMap();
            CreateMap<UserFormMeeting, FormMeetingOfReaderDTO>()
                .ForMember(dest => dest.FormMeetingName, opt => opt.MapFrom(src => src.FormMeeting.FormMeetingName))
                .ReverseMap();
            CreateMap<DAL.Entities.Message, MessageDTO>().ReverseMap();
            CreateMap<Booking, BookingOfCustomerDTO>()
                 .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Customer.FullName))
                .ReverseMap();
            CreateMap<DAL.Entities.Message, MessageResponseDTO>().ReverseMap();
            CreateMap<Slot, SlotResponseSystemDTO>()
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartTime))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndTime))
                .ReverseMap();
            CreateMap<UserLanguage, LanguageOfReaderDTO>()
                .ForMember(dest => dest.LanguageName, opt => opt.MapFrom(src => src.Language.LanguageName))
                .ReverseMap();
            CreateMap<RegisterUserLanguageDTO, UserLanguage>().ReverseMap();
            #endregion
        }
    }
}
