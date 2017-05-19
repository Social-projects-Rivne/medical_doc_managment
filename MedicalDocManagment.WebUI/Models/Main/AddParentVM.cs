using System.ComponentModel.DataAnnotations;

namespace MedicalDocManagment.WebUI.Models.Main
{
    public class AddParentVM
    {
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string SecondName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [StringLength(100)]
        public string Work { get; set; }

        [Required]
        [StringLength(20)]
        public string Phone { get; set; }
    }
}
