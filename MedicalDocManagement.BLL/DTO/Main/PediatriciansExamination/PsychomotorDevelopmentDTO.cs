namespace MedicalDocManagement.BLL.DTO.Main.PediatriciansExamination
{
    public struct PsychomotorDevelopmentDTO
    {
        public bool? WasAccordingToAgeLimit { get; set; }
        public bool? WasNotNormal { get; set; }
        public string Details { get; set; }
    }
}