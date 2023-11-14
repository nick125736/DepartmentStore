using DepartmentStore.Models;

namespace DepartmentStore.Contracts
{
    public interface ICounter
    {
        public Task<IEnumerable<Counter>> GetAllCounters();


    }
}
