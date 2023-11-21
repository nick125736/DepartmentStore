using System.ComponentModel.DataAnnotations;
namespace DepartmentStore.Dto
{
    public class MemberOfCounter
    {
        [Required]
        public Guid Cid { get; set; }
        [Required]
        public string Cname { get; set; }
        public List<String> Member { get; set; } = new List<String>();
    }
}
