using MedicalDocManagment.UsersDAL.Entities;
using MedicalDocManagment.UsersDAL.Repositories.Abstract;

namespace MedicalDocManagment.UsersDAL.Repositories
{
    public class PositionRepository : GenericRepository<Position>, IPositionRepository
    {
        public PositionRepository(UsersContext context) : base(context)
        {
        }
    }
}
