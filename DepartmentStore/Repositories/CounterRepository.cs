using Dapper;
using DepartmentStore.Contracts;
using DepartmentStore.Models;
using DepartmentStore.Utilities;

namespace DepartmentStore.Repositories
{
    public class CounterRepository : ICounter
    {
        private readonly DbContext _dbContext;
        public CounterRepository(DbContext dbContext)
        {
            // 注入 DbContext 服務
            _dbContext = dbContext;
        }
        // 查詢所有 Member 資料的實作
        public async Task<IEnumerable<Counter>> GetAllCounters()
        {
            string sqlQuery = "SELECT * FROM Counter";
            // 建立資料庫連線
            using (var connection = _dbContext.CreateConnection())
            {
                // 執行查詢
                var counters = await connection.QueryAsync<Counter>(sqlQuery);
                return counters.ToList();
            }
        }
    }
}
