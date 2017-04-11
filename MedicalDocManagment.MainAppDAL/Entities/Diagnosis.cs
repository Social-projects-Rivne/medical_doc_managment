using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MedicalDocManagment.MainAppDAL.Entities
{
    [Table("Diagnoses")]
    public class Diagnosis
    {
        [Key]
        [Column("id")]
        public string Id { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; }
    }
}
