using DepartmentStore.Contracts;
using DepartmentStore.Models;
using DepartmentStore.Utilities;
using Dapper;
using DepartmentStore.Dto;
using System.Data;
using System.Net;

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
        public async Task<Member> GetMemberById(int id)
        {
            string sqlQuery = "SELECT * FROM Member WHERE Mid = @Id";
            // 建立資料庫連線
            using (var connection = _dbContext.CreateConnection())
            {
                // 執行查詢
                var member = await
                connection.QueryFirstOrDefaultAsync<Member>(sqlQuery, new { Id = id });
                return member;
            }
        }
        public async Task<MemberForCreationDto> CreateMember(MemberForCreationDto member)
        {
            string sqlQuery = "INSERT INTO Member (Mname, Msex) VALUES (@Mname, @Msex)";
            // 建立資料庫連線
            using (var connection = _dbContext.CreateConnection())
            {
                // 執行新增
                await connection.ExecuteAsync(sqlQuery, member);
                return member;
            }
        }
        // 更新 Member 資料（依指定 id）
        public async Task UpdateMember(int id, MemberForUpdateDto member)
        {
            string sqlQuery = "UPDATE Member SET Mname = @Mname, Msex = @Msex, Mstate = @Mstate, Mphone = @Mphone WHERE Mid = @Id";
            // 建立參數物件
            var parameters = new DynamicParameters();
            // 加入參數
            parameters.Add("Id", id, DbType.Int16);
            parameters.Add("Mname", member.Mname, DbType.String);
            parameters.Add("Msex", member.Msex, DbType.String);
            parameters.Add("Mstate", member.Mstate, DbType.String);
            parameters.Add("Mphone", member.Mphone, DbType.String);
            // 建立資料庫連線
            using (var connection = _dbContext.CreateConnection())
            {
                // 執行更新
                await connection.ExecuteAsync(sqlQuery, parameters);
            }
        }
        // 刪除 Member 資料（依指定 id）
        public async Task DeleteMember(int id)
        {
            string sqlQuery = "DELETE FROM Member WHERE Mid = @Id";
            // 建立參數物件
            var parameters = new DynamicParameters();
            // 加入參數
            parameters.Add("Id", id, DbType.Int16);
            // 建立資料庫連線
            using (var connection = _dbContext.CreateConnection())
            {
                // 執行刪除
                await connection.ExecuteAsync(sqlQuery, parameters);
            }
        }



    }
}
