using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities
{
    [Table("DiagnosesMkh")]
    public class DiagnosisMkh
    {
        [Key]
        public string Id { get; set; }

        [StringLength(300)]
        [Column("DiagnosisName")]
        public string Name { get; set; }

        public string NosologyId { get; set; }

        [ForeignKey("NosologyId")]
        public virtual NosologyMkh NosologyMkh { get; set; }
    }
}
