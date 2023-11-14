using System.ComponentModel.DataAnnotations;

namespace DepartmentStore.Dto
{
    public class CounterForUpdateDto
    {
        [Required]
        [StringLength(20, ErrorMessage = "Maximum 20 characters")]
        public string Cname { get; set; }
        [Required]
        public string Cphone { get; set; }
        [StringLength(100, ErrorMessage = "Maximum 100 characters")]
        public string? Cmail { get; set; }
        public string? Cfl { get; set; }
        public string? Ctype { get; set; }
    }
}
