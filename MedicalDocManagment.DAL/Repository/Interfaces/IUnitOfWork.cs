using MedicalDocManagment.DAL.Manager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalDocManagment.DAL.Repository.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IPositionRepository PositionRepository { get; }
        IClassMkhRepository ClassMkhRepository { get; }
        IBlockMkhRepository BlockMkhRepository { get; }

        UsersManager UsersManager { get; }

        bool Save();
    }
}
