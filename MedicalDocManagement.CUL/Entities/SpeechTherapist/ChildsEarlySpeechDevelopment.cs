using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagement.CUL.Entities.SpeechTherapist
{
    [ComplexType]
    public class ChildsEarlySpeechDevelopment
    {
        [StringLength(58)]
        public string Cooing { get; set; }

        [StringLength(58)]
        public string Babble { get; set; }

        [StringLength(49)]
        public string FirstWords { get; set; }

        [StringLength(61)]
        public string PhraseSpeech { get; set; }

        [StringLength(145)]
        public string BreaksInDevelopment { get; set; }

        [StringLength(122)]
        public string WorkWithTeacherAndSpeechTherapist { get; set; }
    }
}
