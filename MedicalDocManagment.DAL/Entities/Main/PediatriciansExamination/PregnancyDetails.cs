using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities.Main.PediatriciansExamination
{
    [ComplexType]
    public class PregnancyDetails
    {
        [StringLength(54)]
        public string SomeDetails { get; set; }

        public bool? PassedNormally { get; set; }
        public bool? PassedWithToxemia { get; set; }

        [StringLength(22)]
        public string ToxemiaDetails { get; set; }

        public bool? PassedWithAnemia { get; set; }
        public bool? WithThreatInInterruption { get; set; }

        [StringLength(29)]
        public string DateOfInterruption { get; set; }

        [StringLength(60)]
        public string FromDetails { get; set; }

        public int ChildBirth { get; set; }
    }
}