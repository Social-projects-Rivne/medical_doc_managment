using MedicalDocManagment.DAL.Enities;
using MedicalDocManagment.DAL.Repository.Interfaces;

namespace MedicalDocManagment.DAL.Repository
{
    public class PositionRepository : GenericRepository<Position>, IPositionRepository
    {
        public PositionRepository(Context context) : base(context)
        {
        }
    }
}
