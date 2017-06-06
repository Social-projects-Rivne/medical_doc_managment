using MedicalDocManagment.DAL.Entities.Main.NeurologistsExamination;
using MedicalDocManagment.DAL.Repository.Interfaces.ChildCard;

namespace MedicalDocManagment.DAL.Repository.Main.ChildCard
{
    public class NeurologistsExaminationsRepository : 
        GenericRepository<NeurologistsExamination>, INeurologistsExaminationsRepository
    {
        public NeurologistsExaminationsRepository(Context context) : base(context)
        {
        }
    }
}
