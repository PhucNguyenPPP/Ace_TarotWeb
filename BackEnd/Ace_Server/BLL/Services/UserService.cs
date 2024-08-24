﻿using AutoMapper;
using BLL.Interface;
using Common.Constant;
using Common.DTO.FormMeeting;
using Common.DTO.General;
using Common.DTO.Language;
using Common.DTO.ServiceType;
using Common.DTO.Slot;
using Common.DTO.User;
using DAL.Entities;
using DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.OpenApi.Any;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

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
		public async Task<ResponseDTO> GetTarotReader(string? readerName, int pageNumber, int rowsPerpage)
		{

			try
			{
				var role = await GetReaderRole();
				List<User> list;
				if (readerName != null)
				{
					list = await _unitOfWork.User.GetAllTarotReader(c => c.NickName.Contains(readerName) && c.RoleId.Equals(role.RoleId), pageNumber, rowsPerpage);
				}
				else
				{
					list = await _unitOfWork.User.GetAllTarotReader(c => c.RoleId.Equals(role.RoleId), pageNumber, rowsPerpage);
				}

				if (list == null || list.Count == 0)
				{
					return new ResponseDTO("Không tìm được Tarot Reader trùng khớp thông tin", 400, false);
				}
				var listDTO = _mapper.Map<List<TarotReaderDTO>>(list);
				return new ResponseDTO("Tìm kiếm thành công", 200, true, listDTO);
			}
			catch (Exception ex)
			{
				return new ResponseDTO("Tìm kiếm Tarot Reader thất bại", 500, false);
			}

		}
		public async Task<Role?> GetReaderRole()
		{
			var result = await _unitOfWork.Role.GetByCondition(c => c.RoleName == RoleConstant.TarotReader);
			return result;
		}

		public async Task<ResponseDTO> GetTarotReaderDetailById(Guid userId)
		{
			var role = await GetReaderRole();
			var tarotReader = await _unitOfWork.User.GetByCondition(c => c.UserId == userId && c.RoleId.Equals(role.RoleId));
			if (tarotReader == null)
			{
				return new ResponseDTO("Không tìm thấy Tarot Reader", 404, false);
			}
			TarotReaderDetailDTO tarotReaderDetailDTO = new TarotReaderDetailDTO();
			tarotReaderDetailDTO = _mapper.Map<TarotReaderDetailDTO>(tarotReader);
			//language
			var userLanguages = _unitOfWork.UserLanguage.GetAllByCondition(c => c.UserId == userId);
			if (userLanguages != null && userLanguages.Count() > 0)
			{
				var languages = _unitOfWork.Language.GetAllByCondition(language => userLanguages.Any(ul => ul.LanguageId.Equals(language.LanguageId)));
				tarotReaderDetailDTO.LanguageOfReader = _mapper.Map<List<LanguageOfReaderDTO>>(languages);
			}

			//serviceType
			var userServiceTypes = _unitOfWork.UserServiceType.GetAllByCondition(c => c.UserId == userId);
			if (userServiceTypes != null && userServiceTypes.Any())
			{
				var serviceTypes = _unitOfWork.ServiceType.GetAllByCondition(serviceType => userServiceTypes.Any(st => st.ServiceTypeId.Equals(serviceType.ServiceTypeId)));
				tarotReaderDetailDTO.serviceTypeDTOs = _mapper.Map<List<ServiceTypeDTO>>(serviceTypes);
			}

			//FormMeeting
			var userFormMeetings = _unitOfWork.UserFormMeeting.GetAllByCondition(c => c.UserId == userId);
			if (userFormMeetings != null && userFormMeetings.Any())
			{
				var formMeetings = _unitOfWork.FormMeeting.GetAllByCondition(formMeeting => userFormMeetings.Any(fm => fm.FormMeetingId.Equals(formMeeting.FormMeetingId)));
				tarotReaderDetailDTO.FormMeetingOfReaderDTOs = _mapper.Map<List<FormMeetingOfReaderDTO>>(formMeetings);
			}

			//Slot
			var userSlots = _unitOfWork.UserSlot.GetAllByCondition(c => c.UserId == userId);
			if (userSlots != null && userSlots.Any())
			{
				var slots = _unitOfWork.Slot.GetAllByCondition(slot => userSlots.Any(s => s.SlotId.Equals(slot.SlotId)));
				tarotReaderDetailDTO.slotDTOs = _mapper.Map<List<SlotDTO>>(slots);
			}

			return new ResponseDTO("Lấy thông tin chi tiết của Tarot Reader thành công", 200, true, tarotReaderDetailDTO);
		}
	}
}
