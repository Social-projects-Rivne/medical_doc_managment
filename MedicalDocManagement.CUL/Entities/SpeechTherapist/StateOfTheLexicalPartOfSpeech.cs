using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagement.CUL.Entities.SpeechTherapist
{
    [ComplexType]
    public class StateOfTheLexicalPartOfSpeech
    {
        [StringLength(173)]
        public string ImpressiveSpeech { get; set; }

        [StringLength(172)]
        public string ExspressiveSpeech { get; set; }

        public LevelOfFormation LevelOfFormation { get; set; }

        [StringLength(116)]
        public string LevelOfFormationText { get; set; }
    }
}
