using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.FormMeeting;
using Common.DTO.General;
using DAL.Entities;

namespace BLL.Interface
{
    public interface IFormMeetingService
    {
        Task<ResponseDTO> GetAllFormMeeting();
        List<FormMeetingOfReaderDTO> GetAllFormMeetingOfTarotReader(Guid userId);
        Task<ResponseDTO> RegisterFormMeeting(Guid userId, Guid formMeetingId);
        Task<ResponseDTO> DeleteRegisterFormMeeting(Guid userId, Guid formMeetingId);
    }
}
