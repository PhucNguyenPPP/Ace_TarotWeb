﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.DTO.General;

namespace BLL.Interface
{
	public interface ICardTypeService
	{
		Task<ResponseDTO> ViewCardTypeList();
	}
}
