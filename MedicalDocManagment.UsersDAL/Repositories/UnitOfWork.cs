using System;
using System.Web;
using Microsoft.AspNet.Identity.Owin;

using MedicalDocManagment.UsersDAL.Repositories.Interfaces;

namespace MedicalDocManagment.UsersDAL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private bool _disposed;

        private readonly UsersContext _usersContext;

        private readonly Lazy<IPositionRepository> _positionRepository;
        private readonly Lazy<UsersManager> _usersManager;

        public UnitOfWork()
        {
            //TODO DI
            _usersContext = new UsersContext();
            _positionRepository = new Lazy<IPositionRepository>(() => new PositionRepository(_usersContext));
            _usersManager = new Lazy<UsersManager>(() => HttpContext.Current
                                                                    .GetOwinContext()
                                                                    .GetUserManager<UsersManager>());
        }

        public IPositionRepository PositionRepository => _positionRepository.Value;
        public UsersManager UsersManager => _usersManager.Value;


        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public bool Save()
        {
            try
            {
                _usersContext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _usersContext.Dispose();
                }
            }
            _disposed = true;
        }
    }
}
