using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagement.CUL.Entities.SpeechTherapist
{
    [ComplexType]
    public class FeaturesOfPhoneticAndPhonematicSpeech
    {
        [StringLength(328)]
        public string Text { get; set; }

        public LevelOfFormation LevelOfFormation { get; set; }

        [StringLength(125)]
        public string LevelOfFormationText { get; set; }
    }
}
