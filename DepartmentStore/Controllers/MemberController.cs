using DepartmentStore.Contracts;
using DepartmentStore.Dto;
using DepartmentStore.Models;
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
        [HttpGet]
        [Route("{mid}")]
        public async Task<IActionResult> GetMemberById(int mid)
        {
            try
            {
                var member = await _member.GetMemberById(mid);
                return Ok(new
                {
                    Success = true,
                    Message = "Member Returned.",
                    member
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateMember(MemberForCreationDto member)
        {
            try
            {
                var newMember = await _member.CreateMember(member);
                return Ok(new
                {
                    Success = true,
                    Message = "Member Created.",
                    newMember
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut]
        [Route("{mid}")]
        public async Task<IActionResult> UpdateMember(int mid, MemberForUpdateDto member)
        {
            try
            {
                await _member.UpdateMember(mid, member);
                return Ok(new
                {
                    Success = true,
                    Message = "Member Updated."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete]
        [Route("{mid}")]
        public async Task<IActionResult> DeleteMember(int mid)
        {
            try
            {
                await _member.DeleteMember(mid);
                return Ok(new
                {
                    Success = true,
                    Message = "Member Deleted."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
