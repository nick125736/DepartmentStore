using DepartmentStore.Contracts;
using DepartmentStore.Models;
using DepartmentStore.Utilities;
using Dapper;

namespace DepartmentStore.Repositories
{
    public class MemberRepository : IMember
    {
        private readonly DbContext _dbContext;
        public MemberRepository(DbContext dbContext)
        {
            // 注入 DbContext 服務
            _dbContext = dbContext;
        }
        // 查詢所有 Member 資料的實作
        public async Task<IEnumerable<Member>> GetAllMembers()
        {
            string sqlQuery = "SELECT * FROM Member";
            // 建立資料庫連線
            using (var connection = _dbContext.CreateConnection())
            {
                // 執行查詢
                var members = await connection.QueryAsync<Member>(sqlQuery);
                return members.ToList();
            }
        }
    }
}
