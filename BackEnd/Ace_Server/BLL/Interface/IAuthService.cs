using Common.DTO.Auth;
using Common.DTO.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interface
{
    public interface IAuthService
    {
        Task<LoginResponseDTO?> CheckLogin(LoginRequestDTO loginRequestDTO);
        Task<TokenDTO> RefreshAccessToken(RequestTokenDTO model);
        Task<ResponseDTO> GetUserByAccessToken(string token);
        Task<bool> LogOut(string refreshToken);
    }
}
