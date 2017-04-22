using System.ComponentModel.DataAnnotations;

namespace MedicalDocManagment.WebUI.Models.Main
{
    public class AddParentChildCardVM
    {
        public int Id { get; set; }

        [Required]
        public int ParentId { get; set; }

        [Required]
        public int ChildId { get; set; }
    }
}