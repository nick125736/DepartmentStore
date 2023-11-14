using System.ComponentModel.DataAnnotations;
namespace DepartmentStore.Dto
{
    public class CounterForCreationDto
    {
        [Required]
        [StringLength(20, ErrorMessage = "Maximum 20 characters")]
        public string Cname { get; set; }
        [Required]
        public string Cphone { get; set; }
    }
}
