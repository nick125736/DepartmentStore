using DepartmentStore.Dto;

namespace DepartmentStore.Contracts
{
    public interface ICross
    {
        //P04第10頁
        public Task<CounterOfMember> GetCounterByMemberId(int id);
  
        public Task<MemberOfCounter> GetMemberByCounterId(Guid id);
    }
}
