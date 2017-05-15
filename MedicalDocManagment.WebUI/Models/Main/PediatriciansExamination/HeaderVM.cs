using System.ComponentModel.DataAnnotations;

namespace MedicalDocManagment.WebUI.Models.Main.PediatriciansExamination
{
    public struct HeaderVM
    {
        [StringLength(33)]
        public string Age { get; set; }

        [StringLength(32)]
        public string Weight { get; set; }

        [StringLength(31)]
        public string Height { get; set; }

        [StringLength(19)]
        public string HeadCircumference { get; set; }

        [StringLength(11)]
        public string ChestCircumference { get; set; }

        [StringLength(34)]
        public string VT { get; set; }
    }
}