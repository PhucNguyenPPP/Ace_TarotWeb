using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.Constant;
using Common.DTO.General;
using Common.DTO.User;
using DAL.Entities;
using DAL.UnitOfWork;

namespace BLL.Services
{
	public class TarotReaderService :	ITarotReaderService																										
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
		public TarotReaderService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;	
			_mapper = mapper;
		}
		public async Task<ResponseDTO> GetTarotReader(string? readerName, int pageNumber, int rowsPerpage)
		{

			try
			{
				var role = await GetReaderRole();
				List<User> list;
				if (readerName != null)
				{
					list = await _unitOfWork.TarotReader.GetAllTarotReader(c => c.NickName.Contains(readerName) && c.RoleId.Equals(role.RoleId), pageNumber, rowsPerpage);
				}
				else
				{
					list = await _unitOfWork.TarotReader.GetAllTarotReader(c => c.RoleId.Equals(role.RoleId), pageNumber, rowsPerpage);
				}
			
				if (list == null || list.Count == 0)
				{
					return new ResponseDTO("Không tìm được Tarot Reader trùng khớp thông tin", 500, false);
				}
				var listDTO = _mapper.Map<List<TarotReaderDTO>>(list);
				return new ResponseDTO("Tìm kiếm thành công", 200, true, listDTO);
			}
			catch (Exception ex)
			{
				return new ResponseDTO("Tìm kiếm Tarot Reader thất bại", 400, false);
			}

		}
		public async Task<Role?> GetReaderRole()
		{
			var result = await _unitOfWork.Role.GetByCondition(c => c.RoleName == RoleConstant.TarotReader);
			return result;
		}
	}
}
