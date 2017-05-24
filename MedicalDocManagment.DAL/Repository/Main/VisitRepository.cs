using MedicalDocManagment.DAL.Entities.Main;
using MedicalDocManagment.DAL.Repository.Interfaces;

namespace MedicalDocManagment.DAL.Repository.Main
{
    public class VisitsRepository : GenericRepository<Visit>, IVisitsRepository
    {
        public VisitsRepository(Context context) : base(context)
        {
        }
    }
}
