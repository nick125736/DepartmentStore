using DepartmentStore.Dto;
using DepartmentStore.Models;

namespace DepartmentStore.Contracts
{
    public interface IMember
    {
        // 查詢所有 Member 資料的介面
        public Task<IEnumerable<Member>> GetAllMembers();
        // 查詢單一 Member 資料（依指定 id）
        public Task<Member> GetMemberById(int id);
        // 新增 Member 資料
        public Task<MemberForCreationDto> CreateMember(MemberForCreationDto member);
        //// 更新 Member 資料（依指定 id）
        public Task UpdateMember(int id, MemberForUpdateDto member);
        //// 刪除 Member 資料（依指定 id）
        public Task DeleteMember(int id);

    }
}
