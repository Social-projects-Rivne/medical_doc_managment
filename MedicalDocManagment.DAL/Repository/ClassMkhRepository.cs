using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository.Interfaces;

namespace MedicalDocManagment.DAL.Repository
{
    public class ClassMkhRepository : GenericRepository<ClassMkh>, IClassMkhRepository
    {
        public ClassMkhRepository(Context context) : base(context)
        {
        }
    }
}
