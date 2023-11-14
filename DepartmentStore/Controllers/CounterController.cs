using DepartmentStore.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace DepartmentStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CounterController: ControllerBase
    {
        private readonly ILogger<CounterController> _logger;
        private readonly ICounter _counter;
        public CounterController(ILogger<CounterController> logger, ICounter counter)
        {
            _logger = logger;
            _counter = counter;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCounters()
        {
            try
            {
                var counters = await _counter.GetAllCounters();
                return Ok(new
                {
                    Success = true,
                    Message = "All counters Returned.",
                    counters
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
