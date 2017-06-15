using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities.Main
{
    [Table("Rehabilitations")]
    public class Rehabilitation
    {
        [Key]
        public int Id { get; set; }
        public DateTime BeginDate { get; set; }
        public int Count { get; set; }
        public string Commentary { get; set; }
        public int TherapeuticProcedureId { get; set; }
        [ForeignKey("TherapeuticProcedureId")]
        public virtual TherapeuticProcedure TherapeuticProcedure { get; set; }
        public virtual ICollection<ChildCard> ChildCards { get; set; }

    }
}
