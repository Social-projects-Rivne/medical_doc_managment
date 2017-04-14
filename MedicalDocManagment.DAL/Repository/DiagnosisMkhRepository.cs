using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository.Interfaces;

namespace MedicalDocManagment.DAL.Repository
{
    public class DiagnosisMkhRepository : GenericRepository<DiagnosisMkh>, IDiagnosisMkhRepository
    {
        public DiagnosisMkhRepository(Context context) : base(context)
        {
        }
    }
}
