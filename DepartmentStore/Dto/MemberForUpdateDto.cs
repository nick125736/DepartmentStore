using System.ComponentModel.DataAnnotations;
namespace DepartmentStore.Dto
{
    public class MemberForUpdateDto
    {
        [Required]
        [StringLength(20, ErrorMessage = "Maximum 20 characters")]
        public string Mname { get; set; }
        [Required]
        public string Msex { get; set; }
        [StringLength(100, ErrorMessage = "Maximum 100 characters")]
        public string? Mstate { get; set; }
        public string? Mphone { get; set; }
    }
}
