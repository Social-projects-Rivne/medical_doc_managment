using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository.Interfaces;


namespace MedicalDocManagment.DAL.Repository.Main
{
    public class ParentChildCardRepository : GenericRepository<ParentChildCard>, IParentChildCardRepository
    {
        public ParentChildCardRepository(Context context) : base(context)
        {
        }
    }
}
