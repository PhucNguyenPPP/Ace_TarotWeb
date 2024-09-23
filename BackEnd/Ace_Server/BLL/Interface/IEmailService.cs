using Common.DTO.Email;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interface
{
    public interface IEmailService
    {
        OtpCodeDTO GenerateOTP();
        Task SendOTPEmail(string userEmail, string userName, OtpCodeDTO otpCode, string subject);
    }
}
