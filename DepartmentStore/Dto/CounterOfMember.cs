using System.ComponentModel.DataAnnotations;
namespace DepartmentStore.Dto
{
    public class CounterOfMember
    {
        [Required]
        public int Mid { get; set; }
        [Required]
        public string Mname { get; set; }

        public List<String> Counter { get; set; } = new List<String>();
    }
}
