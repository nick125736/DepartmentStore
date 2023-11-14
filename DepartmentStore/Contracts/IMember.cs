using DepartmentStore.Models;

namespace DepartmentStore.Contracts
{
    public interface IMember
    {
        // 查詢所有 Member 資料的介面
        public Task<IEnumerable<Member>> GetAllMembers();
  
    }
}
