using Dapper;
using DepartmentStore.Contracts;
using DepartmentStore.Dto;
using DepartmentStore.Models;
using DepartmentStore.Utilities;
using System.Data;

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
        public async Task<Counter> GetCounterById(Guid id)
        {
            string sqlQuery = "SELECT * FROM Counter WHERE Cid = @Id";
            // 建立資料庫連線
            using (var connection = _dbContext.CreateConnection())
            {
                // 執行查詢
                var Counter = await
                connection.QueryFirstOrDefaultAsync<Counter>(sqlQuery, new { Id = id });
                return Counter;
            }
        }
        public async Task<CounterForCreationDto> CreateCounter(CounterForCreationDto counter)
        {
            string sqlQuery = "INSERT INTO Counter (Cname, Cphone) VALUES (@Cname, @Cphone)";
            // 建立資料庫連線
            using (var connection = _dbContext.CreateConnection())
            {
                // 執行新增
                await connection.ExecuteAsync(sqlQuery, counter);
                return counter;
            }
        }
        public async Task UpdateCounter(Guid id, CounterForUpdateDto counter)
        {
            string sqlQuery = "UPDATE Counter SET Cname = @Cname, Cphone = @Cphone, Cmail = @Cmail, Cfl = @Cfl,Ctype = @Ctype WHERE Cid = @CId";
            // 建立參數物件
            var parameters = new DynamicParameters();
            // 加入參數
            parameters.Add("Cid", id, DbType.Guid);
            parameters.Add("Cname", counter.Cname, DbType.String);
            parameters.Add("Cphone", counter.Cphone, DbType.String);
            parameters.Add("Cmail", counter.Cmail, DbType.String);
            parameters.Add("Cfl", counter.Cfl, DbType.String);
            parameters.Add("Ctype", counter.Ctype, DbType.String);
            // 建立資料庫連線
            using (var connection = _dbContext.CreateConnection())
            {
                // 執行更新
                await connection.ExecuteAsync(sqlQuery, parameters);
            }
        }
        public async Task DeleteCounter(Guid id)
        {
            string sqlQuery = "DELETE FROM Counter WHERE Cid = @Id";
            // 建立參數物件
            var parameters = new DynamicParameters();
            // 加入參數
            parameters.Add("Id", id, DbType.Guid);
            // 建立資料庫連線
            using (var connection = _dbContext.CreateConnection())
            {
                // 執行刪除
                await connection.ExecuteAsync(sqlQuery, parameters);
            }
        }
    }
}
