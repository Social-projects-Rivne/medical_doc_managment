using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagement.CUL.Entities.SpeechTherapist
{
    [ComplexType]
    public class GrammaticalStructureOfSpeech
    {
        [StringLength(161)]
        public string Text { get; set; }

        public LevelOfFormation LevelOfFormation { get; set; }

        [StringLength(135)]
        public string LevelOfFormationText { get; set; }
    }
}
