using MedicalDocManagement.CUL.Entities.SpeechTherapist;
using MedicalDocManagment.DAL.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagement.DAL.Entities.Main
{
    public class SpeechTherapistsExaminationEntity: SpeechTherapistsExamination
    {
        [ForeignKey("DoctorsId")]
        public virtual User Doctor { get; set; } 
    }
}
