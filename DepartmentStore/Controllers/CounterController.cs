﻿using DepartmentStore.Contracts;
using DepartmentStore.Dto;
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
        [HttpGet]
        [Route("{cid}")]
        public async Task<IActionResult> GetCounterById(Guid cid)
        {
            try
            {
                var counters = await _counter.GetCounterById(cid);
                return Ok(new
                {
                    Success = true,
                    Message = "Counters Returned.",
                    counters
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateMember(CounterForCreationDto counter)
        {
            try
            {
                var newCounter = await _counter.CreateCounter(counter);
                return Ok(new
                {
                    Success = true,
                    Message = "Counter Created.",
                    newCounter
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut]
        [Route("{cid}")]
        public async Task<IActionResult> UpdateCounter(Guid cid, CounterForUpdateDto counter)
        {
            try
            {
                await _counter.UpdateCounter(cid, counter);
                return Ok(new
                {
                    Success = true,
                    Message = "Counter Updated."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete]
        [Route("{cid}")]
        public async Task<IActionResult> DeleteMember(Guid cid)
        {
            try
            {
                await _counter.DeleteCounter(cid);
                return Ok(new
                {
                    Success = true,
                    Message = "Counter Deleted."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



    }
}
