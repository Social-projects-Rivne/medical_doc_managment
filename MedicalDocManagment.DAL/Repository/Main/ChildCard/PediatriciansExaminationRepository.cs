using MedicalDocManagment.DAL.Entities.Main.PediatriciansExamination;
using MedicalDocManagment.DAL.Repository.Interfaces.ChildCard;

namespace MedicalDocManagment.DAL.Repository.Main.ChildCard
{
    public class PediatriciansExaminationsRepository : 
        GenericRepository<PediatriciansExamination>, IPediatriciansExaminationsRepository
    {
        public PediatriciansExaminationsRepository(Context context) : base(context)
        {
        }
    }
}
