using DepartmentStore.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace DepartmentStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrossController : ControllerBase
    {
        // 記錄和追蹤應用程式的運行時行為及各種訊息，如警告、錯誤等
        private readonly ILogger<CrossController> _logger;
        // 宣告此控制器所要依賴的介面（Interface），而不是其實作
        private readonly ICross _cross;
        public CrossController(ILogger<CrossController> logger, ICross cross)
        {
            // 注入 Logger 服務
            _logger = logger;
            // 注入 Cross 服務
            _cross = cross;
        }
        [HttpGet("MemberForCounter/{cid}")]
        public async Task<IActionResult> GetCalendarsByMemberId(Guid cid)
        {
            try
            {
                // 取得指定 id 的會員資料
                var counter = await _cross.GetMemberByCounterId(cid);
                return Ok(new
                {
                    Success = true,
                    Message = "輸出counter的id,name且對應member",
                    counter
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("CounterForMemeber/{mid}")]
        public async Task<IActionResult> GetCounterByMemberId(int mid)
        {
            try
            {
                // 取得指定 id 的會員資料
                var member = await _cross.GetCounterByMemberId(mid);
                return Ok(new
                {
                    Success = true,
                    Message = "輸出member的id,name且對應counter",
                    member
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("CounterDetailsForMember/{mid}")]
        public async Task<IActionResult> GetCounterDetailsByMemberId(int mid)
        {
            try
            {
                // 取得指定 id 的會員資料
                var counterDetails = await _cross.GetCounterDetailsByMemberId(mid);
                return Ok(new
                {
                    Success = true,
                    Message = "取得指定 id 會員的所有店鋪詳細資料成功",
                    Data = counterDetails
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("MemberDetailsForCounter/{cid}")]
        public async Task<IActionResult> GetMemberDetailsByCounterId(Guid cid)
        {
            try
            {
                // 取得指定 id 的行事曆資料
                var memberDetails = await _cross.GetMemberDetailsByCounterId(cid);
                return Ok(new
                {
                    Success = true,
                    Message = "取得指定 id 店鋪的所有會員詳細資料成功",
                    Data = memberDetails
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
