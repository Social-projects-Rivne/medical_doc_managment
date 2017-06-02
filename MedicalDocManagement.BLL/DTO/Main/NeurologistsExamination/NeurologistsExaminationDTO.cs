using MedicalDocManagement.BLL.DTO;

namespace MedicalDocManagment.BLL.DTO.Main.NeurologistsExamination
{
    public class NeurologistsExaminationDTO
    {
        public int Id { get; set; }
        public string Complaints { get; set; }
        public string Anamnesis { get; set; }
        public string StatokineticDevelopment { get; set; }
        public string PsychospeechDevelopment { get; set; }
        public NeurologicalStateDTO NeurologicalState { get; set; }
        public string DiagnosisId { get; set; }
    }
}
