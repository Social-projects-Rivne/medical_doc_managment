using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Enities
{
    public class BlockMkh
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }
        [StringLength(200)]
        public string Name { get; set; }
        public string ClassId { get; set; }
        [ForeignKey("ClassId")]
        public virtual ClassMkh ClassMkh { get; set; }
    }
}
