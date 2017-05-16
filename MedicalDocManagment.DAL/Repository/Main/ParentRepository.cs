using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository.Interfaces;

namespace MedicalDocManagment.DAL.Repository.Main
{
    public class ParentRepository : GenericRepository<Parent>, IParentRepository
    {
        public ParentRepository(Context context) : base(context)
        {
        }
    }
}
