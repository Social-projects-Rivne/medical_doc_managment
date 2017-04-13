using MedicalDocManagment.DAL.Enities;
using MedicalDocManagment.DAL.Repository.Interfaces;

namespace MedicalDocManagment.DAL.Repository
{
    public class BlockMkhRepository : GenericRepository<BlockMkh>, IBlockMkhRepository
    {
        public BlockMkhRepository(Context context) : base(context)
        {
        }
    }
}
