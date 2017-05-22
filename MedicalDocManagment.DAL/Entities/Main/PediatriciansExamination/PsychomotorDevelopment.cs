using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities.Main.PediatriciansExamination
{
    [ComplexType]
    public class PsychomotorDevelopment
    {
        public bool? WasAccordingToAgeLimit { get; set; }
        public bool? WasNotNormal { get; set; }

        [StringLength(125)]
        public string Details { get; set; }
    }
}