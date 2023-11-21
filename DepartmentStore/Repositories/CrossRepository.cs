using Dapper;
using DepartmentStore.Contracts;
using DepartmentStore.Utilities;
using DepartmentStore.Dto;
namespace DepartmentStore.Repositories
{
    public class CrossRepository : ICross
    {
        private readonly DbContext _dbContext;
        public CrossRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        // 查詢 Member 和他/她參與的所有 Calendars 資料（依指定 id）
        public async Task<CounterOfMember> GetCounterByMemberId(int id)
        {
            string sqlQuery = "SELECT Mid, Mname,FROM Member WHERE Mid = @Id;" +
            "SELECT C.Cname FROM Counter C, Business B " +
           "WHERE B.Mid = @Id AND C.Cid = B.Cid;";
            using (var connection = _dbContext.CreateConnection())
            {
                var multi = await connection.QueryMultipleAsync(sqlQuery, new { Id = id });
                var member = await multi.ReadSingleOrDefaultAsync<CounterOfMember>();
                if (member != null)
                    member.Counter = (await multi.ReadAsync<String>()).ToList();
                return member;
            }
        }
        // 查詢 Calendar 和參與的所有 Member 資料（依指定 id）
        public async Task<MemberOfCounter> GetMemberByCounterId(Guid id)
        {
            string sqlQuery = "SELECT Cid, Cname FROM Counter WHERE Cid = @Id;" +
            "SELECT M.Mname FROM Member M, Business B " +
           "WHERE B.Cid = @Id AND M.Mid = B.Mid;";
            using (var connection = _dbContext.CreateConnection())
            {
                var multi = await connection.QueryMultipleAsync(sqlQuery, new { Id = id });
                var counter = await multi.ReadSingleOrDefaultAsync<MemberOfCounter>();
                if (counter != null)
                    counter.Member = (await multi.ReadAsync<String>()).ToList();
                return counter;
            }
        }

    }
}
