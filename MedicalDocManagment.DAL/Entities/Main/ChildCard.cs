using MedicalDocManagment.DAL.Entities.Main.NeurologistsExamination;
using MedicalDocManagment.DAL.Entities.Main.PediatriciansExamination;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities
{
    [Table("ChildrenCards")]
    public class ChildCard
    {
        [Key]
        public int Id { get; set; }

        [StringLength(10)]
        public string CardNumber { get; set; }

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
        public virtual DiagnosisMkh Diagnosis { get; set; }

        public string Prescription { get; set; }

        public string DirectedBy { get; set; }

        public virtual ICollection<ParentChildCard> ParentsChildren { get; set; }

        // 2260 is the calculated number of characters that can fit into paper form
        [StringLength(2260)]
        public string PsychiatristsConclusion { get; set; }

        public int? PediatriciansExaminationId { get; set; }

        [ForeignKey("PediatriciansExaminationId")]
        public virtual PediatriciansExamination PediatriciansExamination { get; set; }

        public int? NeurologistsExaminationId { get; set; }

        [ForeignKey("NeurologistsExaminationId")]
        public virtual NeurologistsExamination NeurologistsExamination { get; set; }
    }
}
