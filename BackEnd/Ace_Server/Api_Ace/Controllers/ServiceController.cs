using BLL.Interface;
using BLL.Services;
using Common.DTO.General;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Ace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceService _service;
        public ServiceController(IServiceService service)
        {

            _service = service;
        }
        [HttpGet("Service")]
        public async Task<IActionResult> GetAllService(Guid serviceTypeId)
        {
            ResponseDTO responseDTO = await _service.GetAllService(serviceTypeId);
            if (responseDTO.IsSuccess == false)
            {
                if (responseDTO.StatusCode == 400)
                {
                    return NotFound(responseDTO);
                }
                if (responseDTO.StatusCode == 500)
                {
                    return BadRequest(responseDTO);
                }
            }

            return Ok(responseDTO);
        }

        [HttpGet("system_service_type")]
        public IActionResult SystemServiceType()
        {
            ResponseDTO responseDTO = _service.GetAllServiceTypeSystem();
            return Ok(responseDTO);
        }
    }
}
