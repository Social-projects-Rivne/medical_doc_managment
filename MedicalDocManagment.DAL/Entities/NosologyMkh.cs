using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities
{
    [Table("NosologiesMkh")]
    public class NosologyMkh
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }
        [StringLength(200)]
        public string Name { get; set; }
        public string BlockId { get; set; }
        [ForeignKey("BlockId")]
        public virtual BlockMkh BlockMkh { get; set; }
        public virtual ICollection<DiagnosisMkh> DiagnosesMkh { get; set; }
    }
}
