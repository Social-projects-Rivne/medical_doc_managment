using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository.Interfaces;

namespace MedicalDocManagment.DAL.Repository
{
    public class ChildrenCardsRepository : GenericRepository<ChildCard>, IChildrenCardsRepository
    {
        public ChildrenCardsRepository(Context context) : base(context)
        {
        }
    }
}
