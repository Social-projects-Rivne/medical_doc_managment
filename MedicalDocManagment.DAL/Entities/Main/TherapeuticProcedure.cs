using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities.Main
{
    [Table("TherapeuticProcedure")]
    public class TherapeuticProcedure
    {
        [Key]
        public int Id { get; set; }
        public string ProcedureCaption { get; set; }
        public virtual ICollection<Rehabilitation> Rehabilitations { get; set; }
    }
}
