using MedicalDocManagement.DAL.Entities.Main;
using MedicalDocManagment.DAL.Repository.Interfaces.ChildCard;

namespace MedicalDocManagment.DAL.Repository.Main.ChildCard
{
    public class SpeechTherapistsExaminationsRepository : 
        GenericRepository<SpeechTherapistsExaminationEntity>, ISpeechTherapistsExaminationsRepository
    {
        public SpeechTherapistsExaminationsRepository(Context context) : base(context)
        {
        }
    }
}
