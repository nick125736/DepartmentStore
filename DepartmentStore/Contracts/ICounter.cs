using DepartmentStore.Dto;
using DepartmentStore.Models;

namespace DepartmentStore.Contracts
{
    public interface ICounter
    {
        // 查詢所有 Counter 資料的介面
        public Task<IEnumerable<Counter>> GetAllCounters();
        // 查詢單一 Counter 資料（依指定 id）
        public Task<Counter> GetCounterById(Guid id);
        // 新增 Counter 資料
        public Task<CounterForCreationDto> CreateCounter(CounterForCreationDto counter);
        //// 更新 Counter 資料（依指定 id）
        public Task UpdateCounter(Guid id, CounterForUpdateDto counter);
        //// 刪除 Counter 資料（依指定 id）
        public Task DeleteCounter(Guid id);

    }
}
