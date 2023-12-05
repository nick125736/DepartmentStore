using DepartmentStore.Models;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace DepartmentStore.Dto
{
    public class CounterDetailsOfMember
    {
        [Required]
        public int Mid { get; set; }
        [Required]
        public string Mname { get; set; }
        // 此 Member 所參與的 Calendars
        public List<Counter> Counters { get; set; } = new List<Counter>();
    }
}
