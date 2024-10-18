using AutoMapper;
using BLL.Interface;
using Common.Constant;
using Common.DTO.FormMeeting;
using Common.DTO.General;
using Common.DTO.Language;
using Common.DTO.Paging;
using Common.DTO.ServiceType;
using Common.DTO.Slot;
using Common.DTO.User;
using Common.DTO.Paging;
using DAL.Entities;
using DAL.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.OpenApi.Any;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Common.DTO.Email;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using System.Text.RegularExpressions;

namespace BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;

        public UserService(IUnitOfWork unitOfWork, IMapper mapper,
            IImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _imageService = imageService;
        }

        public async Task<ResponseDTO> CheckValidationSignUpCustomer(SignUpCustomerRequestDTO model)
        {
            if (model.DateOfBirth >= DateTime.Now)
            {
                return new ResponseDTO("Ngày sinh không hợp lệ", 400, false);
            }

            if (model.Gender != GenderConstant.Male && model.Gender != GenderConstant.Female
                && model.Gender != GenderConstant.Other)
            {
                return new ResponseDTO("Giới tính không hợp lệ", 400, false);
            }

            var checkUserNameExist = CheckUserNameExist(model.UserName);
            if (checkUserNameExist)
            {
                return new ResponseDTO("Tên đăng nhập đã tồn tại", 400, false);
            }

            var checkEmailExist = CheckEmailExist(model.Email);
            if (checkEmailExist)
            {
                return new ResponseDTO("Email đã tồn tại", 400, false);
            }

            var checkPhoneExist = CheckPhoneExist(model.Phone);
            if (checkPhoneExist)
            {
                return new ResponseDTO("Số điện thoại đã tồn tại", 400, false);
            }

            return new ResponseDTO("Check thành công", 200, true);
        }

        public async Task<bool> SignUpCustomer(SignUpCustomerRequestDTO model)
        {
            var customer = _mapper.Map<User>(model);
            var role = await GetCustomerRole();
            if (role == null)
            {
                return false;
            }
            var salt = GenerateSalt();
            var passwordHash = GenerateHashedPassword(model.Password, salt);
            var avatarLink = await _imageService.StoreImageAndGetLink(model.AvatarLink, "users_img");

            customer.UserId = Guid.NewGuid();
            customer.RoleId = role.RoleId;
            customer.Salt = salt;
            customer.PasswordHash = passwordHash;
            customer.AvatarLink = avatarLink;
            customer.IsVerified = false;
            customer.Status = true;

            await _unitOfWork.User.AddAsync(customer);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<Role?> GetCustomerRole()
        {
            var result = await _unitOfWork.Role.GetByCondition(c => c.RoleName == RoleConstant.Customer);
            return result;
        }

        public byte[] GenerateSalt()
        {
            byte[] saltBytes = new byte[32];
            var rng = RandomNumberGenerator.Create();
            rng.GetNonZeroBytes(saltBytes);
            return saltBytes;
        }

        public byte[] GenerateHashedPassword(string password, byte[] saltBytes)
        {
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] passwordWithSaltBytes = new byte[passwordBytes.Length + saltBytes.Length];

            for (int i = 0; i < passwordBytes.Length; i++)
            {
                passwordWithSaltBytes[i] = passwordBytes[i];
            }

            for (int i = 0; i < saltBytes.Length; i++)
            {
                passwordWithSaltBytes[passwordBytes.Length + i] = saltBytes[i];
            }

            var cryptoProvider = SHA512.Create();
            byte[] hashedBytes = cryptoProvider.ComputeHash(passwordWithSaltBytes);

            return hashedBytes;
        }

        public bool CheckUserNameExist(string userName)
        {
            var userList = _unitOfWork.User.GetAll();
            if (userList.Any(c => c.UserName == userName))
            {
                return true;
            }
            return false;
        }

        public bool CheckEmailExist(string email)
        {
            var userList = _unitOfWork.User.GetAll();
            if (userList.Any(c => c.Email == email))
            {
                return true;
            }
            return false;
        }

        public bool CheckPhoneExist(string phone)
        {
            var userList = _unitOfWork.User.GetAll();
            if (userList.Any(c => c.Phone == phone))
            {
                return true;
            }
            return false;
        }
        public async Task<ResponseDTO> GetTarotReader(string? readerName, int pageNumber, int rowsPerpage, List<Guid>? filterLanguages, string? gender, List<Guid>? filterForming)
        {

            try
            {
                var role = await GetReaderRole();
                var list = _unitOfWork.User.GetAllByCondition(c => c.RoleId.Equals(role.RoleId));

                if (readerName != null)
                {
                    list = list.Where(c => c.NickName.Contains(readerName));
                }
                if (filterLanguages.Count>0)
                {
                    var languages = _unitOfWork.Language.GetAllByCondition(c => filterLanguages.Contains(c.LanguageId));
                    if (languages.Any())
                    {
                        List<Guid> guids = _unitOfWork.UserLanguage.GetAllByCondition(k => filterLanguages.Contains(k.LanguageId) && k.Status == true).Select(u => u.UserId).ToList();
                        list = list.Where(c => guids.Contains(c.UserId));
                    }

                }
                if (filterForming.Count > 0)
                {
                    var forms = _unitOfWork.FormMeeting.GetAllByCondition(c => filterForming.Contains(c.FormMeetingId));
                    if (forms.Any())
                    {
                        List<Guid> guids = _unitOfWork.UserFormMeeting.GetAllByCondition(k => filterForming.Contains(k.FormMeetingId) && k.Status == true).Select(u => u.UserId).ToList();
                        list = list.Where(c => guids.Contains(c.UserId));
                    }
                }
                if (gender != null)
                {
                    if (gender.Equals("Nam") || gender.Equals("Nữ") || gender.Equals("Khác"))
                    {
                        list = list.Where(c => c.Gender.Equals(gender));
                    }
                }
                if (list == null || list.Count() == 0)
                {
                    return new ResponseDTO("Không tìm được Tarot Reader trùng khớp thông tin", 400, false);
                }
                var listDTO = _mapper.Map<List<UserDetailDTO>>(list);
                foreach (var item in listDTO)
                {
                    //language
                    var userLanguages = _unitOfWork.UserLanguage.GetAllByCondition(c => c.UserId == item.UserId && c.Status == true);
                    if (userLanguages != null && userLanguages.Any())
                    {
                        var languages = _unitOfWork.Language.GetAllByCondition(language => userLanguages.Any(ul => ul.LanguageId.Equals(language.LanguageId)));
                        item.LanguageOfReader = _mapper.Map<List<LanguageOfReaderDTO>>(languages);
                    }
                    else 
                    {
                        listDTO.Remove(item);
                    }

                    //FormMeeting
                    var userFormMeetings = _unitOfWork.UserFormMeeting.GetAllByCondition(c => c.UserId == item.UserId && c.Status == true);
                    if (userFormMeetings != null && userFormMeetings.Any())
                    {
                        var formMeetings = _unitOfWork.FormMeeting.GetAllByCondition(formMeeting => userFormMeetings.Any(fm => fm.FormMeetingId.Equals(formMeeting.FormMeetingId)));
                        item.FormMeetingOfReaderDTOs = _mapper.Map<List<FormMeetingOfReaderDTO>>(formMeetings);
                    }
                    else
                    {
                        listDTO.Remove(item);
                    }
                    //serviceType
                    var userServiceType = _unitOfWork.UserServiceType.GetAllByCondition(c => c.UserId == item.UserId && c.Status == true);
                    if (userServiceType == null || !userServiceType.Any())
                    {
                        listDTO.Remove(item);
                    }

                }
                var finalList = PagedList<UserDetailDTO>.ToPagedList(listDTO.AsQueryable(), pageNumber, rowsPerpage);
                ListTarotReaderDTO listTarotReaderDTO = new ListTarotReaderDTO();
                listTarotReaderDTO.TarotReaderDetailDTOs = finalList;
                listTarotReaderDTO.CurrentPage = pageNumber;
                listTarotReaderDTO.RowsPerPages = rowsPerpage;
                listTarotReaderDTO.TotalCount = listDTO.Count;
                listTarotReaderDTO.TotalPages = (int)Math.Ceiling(listDTO.Count / (double)rowsPerpage);
                return new ResponseDTO("Tìm kiếm thành công", 200, true, listTarotReaderDTO);
            }
            catch (Exception ex)
            {
                return new ResponseDTO("Tìm kiếm Tarot Reader thất bại", 500, false);
            }

        }
        public async Task<Role> GetReaderRole()
        {
            var result = await _unitOfWork.Role.GetByCondition(c => c.RoleName == RoleConstant.TarotReader);
            return result;
        }

        public async Task<ResponseDTO> GetUserDetailById(Guid userId)
        {
            var role = await GetReaderRole();
            var user = await _unitOfWork.User.GetByCondition(c => c.UserId == userId);
            if (user == null)
            {
                return new ResponseDTO("Không tìm thấy người dùng", 400, false);
            }
            UserDetailDTO userDetailDTO = new UserDetailDTO();
            userDetailDTO = _mapper.Map<UserDetailDTO>(user);
            //language
            if (userDetailDTO.RoleId == role.RoleId)
            {
                var userLanguages = _unitOfWork.UserLanguage.GetAllByCondition(c => c.UserId == userId && c.Status == true);
                if (userLanguages != null && userLanguages.Count() > 0)
                {
                    var languages = _unitOfWork.Language.GetAllByCondition(language => userLanguages.Any(ul => ul.LanguageId.Equals(language.LanguageId)));
                    userDetailDTO.LanguageOfReader = _mapper.Map<List<LanguageOfReaderDTO>>(languages);
                }

                //serviceType
                var userServiceTypes = _unitOfWork.UserServiceType.GetAllByCondition(c => c.UserId == userId && c.Status == true);
                if (userServiceTypes != null && userServiceTypes.Any())
                {
                    var serviceTypes = _unitOfWork.ServiceType.GetAllByCondition(serviceType => userServiceTypes.Any(st => st.ServiceTypeId.Equals(serviceType.ServiceTypeId)));
                    userDetailDTO.serviceTypeDTOs = _mapper.Map<List<ServiceTypeDTO>>(serviceTypes);
                }

                //FormMeeting
                var userFormMeetings = _unitOfWork.UserFormMeeting.GetAllByCondition(c => c.UserId == userId && c.Status == true);
                if (userFormMeetings != null && userFormMeetings.Any())
                {
                    var formMeetings = _unitOfWork.FormMeeting.GetAllByCondition(formMeeting => userFormMeetings.Any(fm => fm.FormMeetingId.Equals(formMeeting.FormMeetingId)));
                    userDetailDTO.FormMeetingOfReaderDTOs = _mapper.Map<List<FormMeetingOfReaderDTO>>(formMeetings);
                }

                //Slot
                var userSlots = _unitOfWork.UserSlot.GetAllByCondition(c => c.UserId == userId);
                if (userSlots != null && userSlots.Any())
                {
                    var slots = _unitOfWork.Slot.GetAllByCondition(slot => userSlots.Any(s => s.SlotId.Equals(slot.SlotId)));
                    userDetailDTO.slotDTOs = _mapper.Map<List<SlotDTO>>(slots);
                }

                //rating and feedback
                var completedBooking = _unitOfWork.Booking.GetAllByCondition(c => c.TarotReaderId == userId
                && c.Status == BookingStatus.Completed
                && c.BehaviorRating != null && c.BehaviorFeedback != null)
                    .ToList();

                if (completedBooking.Count > 0)
                {
                    double totalRating = 0;
                    foreach (var i in completedBooking)
                    {
                        totalRating += (double)i.BehaviorRating;
                    }

                    double averageRating = (double)totalRating / completedBooking.Count;
                    userDetailDTO.AverageRating = Math.Round(averageRating, 1);
                    userDetailDTO.TotalAmountCompletedBooking = completedBooking.Count;
                } else
                {
                    userDetailDTO.AverageRating = 0;
                    userDetailDTO.TotalAmountCompletedBooking = 0;
                }
            }
            return new ResponseDTO("Lấy thông tin chi tiết của Tarot Reader thành công", 200, true, userDetailDTO);
        }

        public async Task<bool> SignUpReader(SignUpReaderRequestDTO signUpReaderRequestDTO)
        {
            var reader = _mapper.Map<User>(signUpReaderRequestDTO);
            var role = await GetReaderRole();
            if (role == null)
            {
                return false;
            }
            var salt = GenerateSalt();
            var passwordHash = GenerateHashedPassword(signUpReaderRequestDTO.Password, salt);
            var avatarLink = await _imageService.StoreImageAndGetLink(signUpReaderRequestDTO.AvatarLink, "users_img");

            reader.UserId = Guid.NewGuid();
            reader.RoleId = role.RoleId;
            reader.Salt = salt;
            reader.PasswordHash = passwordHash;
            reader.IsVerified = true;
            reader.AvatarLink = avatarLink;

            reader.Status = true;

            await _unitOfWork.User.AddAsync(reader);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<ResponseDTO> CheckValidationSignUpReader(SignUpReaderRequestDTO model)
        {
            if (model.DateOfBirth >= DateTime.Now)
            {
                return new ResponseDTO("Ngày sinh không hợp lệ", 400, false);
            }

            if (model.Gender != GenderConstant.Male && model.Gender != GenderConstant.Female
                && model.Gender != GenderConstant.Other)
            {
                return new ResponseDTO("Giới tính không hợp lệ", 400, false);
            }

            var checkUserNameExist = CheckUserNameExist(model.UserName);
            if (checkUserNameExist)
            {
                return new ResponseDTO("Tên đăng nhập đã tồn tại", 400, false);
            }

            var checkEmailExist = CheckEmailExist(model.Email);
            if (checkEmailExist)
            {
                return new ResponseDTO("Email đã tồn tại", 400, false);
            }

            var checkPhoneExist = CheckPhoneExist(model.Phone);
            if (checkPhoneExist)
            {
                return new ResponseDTO("Số điện thoại đã tồn tại", 400, false);
            }

            return new ResponseDTO("Check thành công", 200, true);
        }

        public Task<User?> GetUserByEmail(string email)
        {
            return _unitOfWork.User.GetByCondition(c => c.Email == email);
        }

        public async Task<bool> SetOtp(string email, OtpCodeDTO model)
        {
            var user = await GetUserByEmail(email);
            if (user != null)
            {
                user.OtpCode = Int32.Parse(model.OTPCode);
                user.OtpExpiredTime = model.ExpiredTime;
                return await _unitOfWork.SaveChangeAsync();
            }
            return false;
        }

        public async Task<bool> VerifyingOtp(string email, string otp)
        {
            var user = await GetUserByEmail(email);
            if (user != null)
            {
                if (user.OtpCode == Int32.Parse(otp) && user.OtpExpiredTime > DateTime.Now)
                {
                    return true;
                }
            }
            return false;
        }

        public async Task<bool> ChangePassword(ForgotPasswordDTO model)
        {
            var user = await GetUserByEmail(model.Email);
            if (user == null)
            {
                return false;
            }

            var salt = GenerateSalt();
            var passwordHash = GenerateHashedPassword(model.Password, salt);
            user.Salt = salt;
            user.PasswordHash = passwordHash;
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<bool> CheckUserExistById(Guid userId)
        {
            var user = await _unitOfWork.User.GetByCondition(c => c.UserId == userId);
            if (user == null)
            {
                return false;
            }
            return true;
        }

        public async Task<ResponseDTO> UpdateUser(UpdateUserDTO updateUserDTO)
        {
            var user = await _unitOfWork.User.GetByCondition(c => c.UserId == updateUserDTO.UserId);
            if (user == null)
            {
                return new ResponseDTO("Không tìm thấy tài khoản", 400, false);
            }
            if (updateUserDTO.DateOfBirth >= DateTime.Now)
            {
                return new ResponseDTO("Ngày sinh không hợp lệ", 400, false);
            }
            if (updateUserDTO.Gender != GenderConstant.Male && updateUserDTO.Gender != GenderConstant.Female
                && updateUserDTO.Gender != GenderConstant.Other)
            {
                return new ResponseDTO("Giới tính không hợp lệ", 400, false);
            }
            if (!updateUserDTO.Email.Equals(user.Email))
            {

                var checkEmailExist = CheckEmailExist(updateUserDTO.Email);
                if (checkEmailExist)
                {
                    return new ResponseDTO("Email đã tồn tại", 400, false);
                }
            }
            if (!updateUserDTO.Phone.Equals(user.Phone))
            {
                var checkPhoneExist = CheckPhoneExist(updateUserDTO.Phone);
                if (checkPhoneExist)
                {
                    return new ResponseDTO("Số điện thoại đã tồn tại", 400, false);
                }
            }
            user.FullName = updateUserDTO.FullName;
            user.Email = updateUserDTO.Email;
            user.DateOfBirth = updateUserDTO.DateOfBirth;
            user.Gender = updateUserDTO.Gender;
            user.Phone = updateUserDTO.Phone;
            user.Address = updateUserDTO.Address;
            _unitOfWork.User.Update(user);
            bool updated = await _unitOfWork.SaveChangeAsync();
            if (updated)
            {
                return new ResponseDTO("Chỉnh sửa thông tin thành công", 200, true);
            }
            return new ResponseDTO("Chỉnh sửa thông tin thất bài", 500, true);
        }

        public async Task<Role> GetAdminRole()
        {
            var result = await _unitOfWork.Role.GetByCondition(c => c.RoleName == RoleConstant.Admin);
            return result;
        }

        public async Task<bool> VerifyEmail(string email)
        {
            var user = await GetUserByEmail(email);
            if (user == null)
            {
                return false;
            }
            
            user.IsVerified = true;
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<ResponseDTO> UpdateTarotReader(UpdateTarotReaderDTO updateTarotReaderDTO)
        {
            var user = await _unitOfWork.User.GetByCondition(u => u.UserId.Equals(updateTarotReaderDTO.UserId));
            if (user == null)
            {
                return new ResponseDTO("Không tồn tại Tarot Reader",400,false);
            }
            if (updateTarotReaderDTO.Experience < 0)
            {
                return new ResponseDTO("Số năm kinh nghiệm cần là một số dương", 400, false);
            }
            user.Experience = updateTarotReaderDTO.Experience;
            user.Description = updateTarotReaderDTO.Description;
            user.NickName = updateTarotReaderDTO.NickName;
            user.Quote = updateTarotReaderDTO.Quote;
            user.MeetLink = updateTarotReaderDTO.MeetLink;
            _unitOfWork.User.Update(user);
            var updated = await _unitOfWork.SaveChangeAsync();
            if (updated)
            {
                return new ResponseDTO("Cập nhật thông tin Tarot Reader thành công", 200, true);
            }
            return new ResponseDTO("Cập nhật thông tin Tarot Reader thất bại", 500, true);
        }
    }
}
