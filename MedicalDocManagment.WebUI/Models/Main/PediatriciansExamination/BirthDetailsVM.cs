using System.ComponentModel.DataAnnotations;

namespace MedicalDocManagment.WebUI.Models.Main.PediatriciansExamination
{
    public struct BirthDetailsVM
    {
        [StringLength(15)]
        public string Weight { get; set; }

        [StringLength(16)]
        public string BodyLength { get; set; }

        [StringLength(18)]
        public string HeadCircumference { get; set; }

        [StringLength(24)]
        public string ChestCircumference { get; set; }

        [StringLength(29)]
        public string ScoreByApgar { get; set; }
    }
}