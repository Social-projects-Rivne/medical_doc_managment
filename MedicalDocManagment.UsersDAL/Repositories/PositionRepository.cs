using MedicalDocManagment.UsersDAL.Entities;
using MedicalDocManagment.UsersDAL.Repositories.Interfaces;

namespace MedicalDocManagment.UsersDAL.Repositories
{
    public class PositionRepository : GenericRepository<Position>, IPositionRepository
    {
        public PositionRepository(UsersContext context) : base(context)
        {
        }
    }
}
