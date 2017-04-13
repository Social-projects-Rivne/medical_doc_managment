using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.MainAppDAL.Entities
{
    [Table("ChildrenCards")]
    public class ChildCard
    {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string FirstName { get; set; }

        [StringLength(100)]
        public string SecondName { get; set; }

        [StringLength(100)]
        public string LastName { get; set; }

        public DateTime Date { get; set; }

        public string Address { get; set; }

        public DateTime CheckIn { get; set; }

        public DateTime? CheckOut { get; set; }

        public string DiagnosisId { get; set; }

        [ForeignKey("DiagnosisId")]
        public virtual Diagnosis Diagnosis { get; set; }

        public string Prescription { get; set; }

        public string DirectedBy { get; set; }

        public virtual ICollection<ParentChildCard> ParentsChildren { get; set; }
    }
}
