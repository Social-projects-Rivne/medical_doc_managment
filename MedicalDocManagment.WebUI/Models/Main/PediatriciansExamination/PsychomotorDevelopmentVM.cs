using System.ComponentModel.DataAnnotations;

namespace MedicalDocManagment.WebUI.Models.Main.PediatriciansExamination
{
    public struct PsychomotorDevelopmentVM
    {
        public bool? WasAccordingToAgeLimit { get; set; }
        public bool? WasNotNormal { get; set; }

        [StringLength(125)]
        public string Details { get; set; }
    }
}