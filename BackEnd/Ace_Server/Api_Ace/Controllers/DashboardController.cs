using BLL.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ICardTypeService _cardTypeService;
        public DashboardController(ICardTypeService cardTypeService)
        {
            _cardTypeService = cardTypeService;
        }
    }
}
