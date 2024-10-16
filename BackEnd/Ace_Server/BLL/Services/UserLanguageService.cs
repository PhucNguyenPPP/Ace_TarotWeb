using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.DTO.General;
using Common.DTO.UserLanguage;
using DAL.Entities;
using DAL.UnitOfWork;

namespace BLL.Services
{
    public class UserLanguageService : IUserLanguageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public UserLanguageService(IUnitOfWork unitOfWork,  IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ResponseDTO> RegisterUserLanguage(RegisterUserLanguageDTO registerUserLanguageDTO)
        {
            var userLanguage = await _unitOfWork.UserLanguage.GetByCondition(ul => ul.UserId.Equals(registerUserLanguageDTO.UserId) && ul.LanguageId.Equals(registerUserLanguageDTO.LanguageId));
            var user = await _unitOfWork.User.GetByCondition(u => u.UserId == registerUserLanguageDTO.UserId);
            var language = await _unitOfWork.Language.GetByCondition(l => l.LanguageId == registerUserLanguageDTO.LanguageId);
            if (user == null) {
                return new ResponseDTO("User không tồn tại", 400, false);
            }
            if (language == null)
            {
                return new ResponseDTO("Ngôn ngữ không tồn tại", 400, false);
            }
            if (userLanguage != null)
            {
                if (userLanguage.Status)
                {
                    return new ResponseDTO("Ngôn ngữ đã được đăng ký trước đó", 400, false);
                }
                userLanguage.Status = true;
                _unitOfWork.UserLanguage.Update(userLanguage);
            } else
            {
                UserLanguage newUserLanguage = _mapper.Map<UserLanguage>(registerUserLanguageDTO); 
                newUserLanguage.Status = true;
                newUserLanguage.UserLanguageId = Guid.NewGuid();
                newUserLanguage.User = user;
                 newUserLanguage.Language = language;
                if (newUserLanguage != null)
                {
                    await _unitOfWork.UserLanguage.AddAsync(newUserLanguage);
                }
                else {
                    return new ResponseDTO("Đăng ký ngôn ngữ thất bại", 500, false);
                }
            }
            var saveChanges = await _unitOfWork.SaveChangeAsync();
            if(saveChanges)
            {
                return new ResponseDTO("Đăng ký ngôn ngữ thành công", 200, true);
            }
            return new ResponseDTO("Đăng ký ngôn ngữ thất bại", 500, false);
        }


        public async Task<ResponseDTO> RemoveUserLanguage(RegisterUserLanguageDTO registerUserLanguageDTO)
        {
            var userLanguage = await _unitOfWork.UserLanguage.GetByCondition(ul => ul.LanguageId.Equals(registerUserLanguageDTO.LanguageId)&& ul.UserId.Equals(registerUserLanguageDTO.UserId) && ul.Status);
            if (userLanguage == null)
            {
                return new ResponseDTO("Không tồn tại UserLanguage", 400, false);
            }
            userLanguage.Status = false;
            _unitOfWork.UserLanguage.Update(userLanguage);
            var saveChanges = await _unitOfWork.SaveChangeAsync();
            if (saveChanges)
            {
                return new ResponseDTO("Xoá ngôn ngữ của Tarot Reader thành công", 200, true);
            }
            return new ResponseDTO("Xoá ngôn ngữ của Tarot Reader thành công", 200, true);
        }
    }
}
