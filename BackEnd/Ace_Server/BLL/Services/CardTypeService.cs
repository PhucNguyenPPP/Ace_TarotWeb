using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Interface;
using Common.DTO.CardType;
using Common.DTO.General;
using DAL.UnitOfWork;

namespace BLL.Services
{
	public class CardTypeService : ICardTypeService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
		public CardTypeService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}
		public async Task<ResponseDTO> ViewCardTypeList()
		{
			var list = _unitOfWork.CardType.GetAll();
			if (list == null || list.Count() == 0)
			{
				return new ResponseDTO("Không có CardType để hiển thị", 400, false);
			}
			else
			{
				var cardTypeList = _mapper.Map<List<CardTypeDTO>>(list);
				return new ResponseDTO("Hiện thông tin CardType thành công", 200, true,cardTypeList);
			}
		}
	}
}
