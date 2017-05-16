using MedicalDocManagment.DAL.Entities.Main.PediatriciansExamination;
using MedicalDocManagment.DAL.Repository.Interfaces;

namespace MedicalDocManagment.DAL.Repository.Main
{
    public class PediatriciansExaminationsRepository : 
        GenericRepository<PediatriciansExamination>, IPediatriciansExaminationsRepository
    {
        public PediatriciansExaminationsRepository(Context context) : base(context)
        {
        }
    }
}
