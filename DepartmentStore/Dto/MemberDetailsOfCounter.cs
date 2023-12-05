using DepartmentStore.Models;
using System.ComponentModel.DataAnnotations;

namespace DepartmentStore.Dto
{
    public class MemberDetailsOfCounter
    {
        [Required]
        public Guid Cid { get; set; }
        [Required]
        public string Cname { get; set; }

        // 參與此 Calendar 的成員
        public List<Member> Members { get; set; } = new List<Member>();
    }
}
