using System;
using System.ComponentModel.DataAnnotations;

namespace MedicalDocManagement.CUL.Entities.SpeechTherapist
{
    public class SpeechTherapistsExamination
    {
        [Key]
        public int Id { get; set; }

        public ChildsEarlySpeechDevelopment ChildsEarlySpeechDevelopment { get; set; }
        public StateOfTheLexicalPartOfSpeech StateOfTheLexicalPartOfSpeech { get; set; }
        public GrammaticalStructureOfSpeech GrammaticalStructureOfSpeech { get; set; }
        public FeaturesOfPhoneticAndPhonematicSpeech FeaturesOfPhoneticAndPhonematicSpeechComponents { get; set; }

        [StringLength(78)]
        public string ManifestationsOfStuttering { get; set; }

        [StringLength(466)]
        public string Conclusion { get; set; }

        [StringLength(902)]
        public string LongtermIndividualPlanOfRemedialWork { get; set; }

        [StringLength(347)]
        public string EfficiencyOfSpeechTherapyEffect { get; set; }

        public DateTime? Date { get; set; }

        [Required]
        public string DoctorsId { get; set; }
    }
}
