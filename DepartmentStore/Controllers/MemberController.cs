using DepartmentStore.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace DepartmentStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController:ControllerBase
    {
        private readonly ILogger<MemberController> _logger;
        private readonly IMember _member;
        public MemberController(ILogger<MemberController> logger, IMember member)
        {
            _logger = logger;
            _member = member;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllMembers()
        {
            try
            {
                var members = await _member.GetAllMembers();
                return Ok(new
                {
                    Success = true,
                    Message = "All Members Returned.",
                    members
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
