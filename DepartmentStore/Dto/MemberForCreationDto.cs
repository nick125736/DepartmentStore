using System.ComponentModel.DataAnnotations;
namespace DepartmentStore.Dto
{
    public class MemberForCreationDto
    {
        [Required]
        [StringLength(20, ErrorMessage = "Maximum 20 characters")]
        public string Mname { get; set; }
        [Required]
        public string Msex { get; set; }

    }
}
