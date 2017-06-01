using System.ComponentModel.DataAnnotations;

namespace MedicalDocManagment.WebUI.Models.Main.NeurologistsExamination
{
    public class NeurologistsExaminationVM
    {
        public int Id { get; set; }

        [StringLength(290)]
        public string Complaints { get; set; }

        [StringLength(573)]
        public string Anamnesis { get; set; }

        [StringLength(273)]
        public string StatokineticDevelopment { get; set; }

        [StringLength(272)]
        public string PsychospeechDevelopment { get; set; }

        public NeurologicalStateVM NeurologicalState { get; set; }

        public string DiagnosisId { get; set; }

        public DiagnosisMkhVM Diagnosis { get; set; }
    }
}
