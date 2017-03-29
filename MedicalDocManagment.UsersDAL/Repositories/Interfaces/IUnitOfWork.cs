using System;

namespace MedicalDocManagment.UsersDAL.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IPositionRepository PositionRepository { get; }

        UsersManager UsersManager { get; }

        bool Save();
    }
}
