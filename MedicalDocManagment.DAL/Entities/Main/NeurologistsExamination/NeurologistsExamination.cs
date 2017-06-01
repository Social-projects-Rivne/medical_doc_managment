using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities.Main.NeurologistsExamination
{
    public class NeurologistsExamination
    {
        [Key]
        public int Id { get; set; }

        [StringLength(290)]
        public string Complaints { get; set; }

        [StringLength(573)]
        public string Anamnesis { get; set; }

        [StringLength(273)]
        public string StatokineticDevelopment { get; set; }

        [StringLength(272)]
        public string PsychospeechDevelopment { get; set; }

        public NeurologicalState NeurologicalState { get; set; }

        public string DiagnosisId { get; set; }

        [ForeignKey("DiagnosisId")]
        public virtual DiagnosisMkh Diagnosis { get; set; }
    }
}
