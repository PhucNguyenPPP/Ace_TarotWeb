using Common.DTO.Email;
using Common.DTO.General;
using Common.DTO.User;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interface
{
    public interface IUserService
    {
        Task<bool> SignUpCustomer(SignUpCustomerRequestDTO signUpCustomerRequestDTO);
        Task<ResponseDTO> CheckValidationSignUpCustomer(SignUpCustomerRequestDTO signUpCustomerRequestDTO);
        byte[] GenerateSalt();
        byte[] GenerateHashedPassword(string password, byte[] saltBytes);
        Task<Role?> GetCustomerRole();
        bool CheckUserNameExist(string userName);
        bool CheckEmailExist(string email);
        bool CheckPhoneExist(string phone);
        Task<ResponseDTO> GetUserDetailById(Guid userId);
		Task<ResponseDTO> GetTarotReader(string? readerName, int pageNumber, int rowsPerpage, List<Guid>? filterLanguages, String? gender, List<Guid>? filterForming);
        Task<bool> SignUpReader(SignUpReaderRequestDTO signUpReaderRequestDTO);
        Task<ResponseDTO> CheckValidationSignUpReader(SignUpReaderRequestDTO signUpReaderRequestDTO);
        Task<User?> GetUserByEmail (string email);
        Task<bool> SetOtp(string email, OtpCodeDTO model);
        Task<bool> VerifyingOtp(string email, string otp);
        Task<bool> ChangePassword(ForgotPasswordDTO model);
        Task<bool> CheckUserExistById(Guid userId);
    }
}
