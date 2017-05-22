using MedicalDocManagment.DAL.Manager;
using MedicalDocManagment.DAL.Repository.Interfaces;
using MedicalDocManagment.DAL.Repository.Main;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Web;

namespace MedicalDocManagment.DAL.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private bool _disposed;

        private readonly Context _context;

        private readonly Lazy<IPositionRepository> _positionRepository;
        private readonly Lazy<IClassMkhRepository> _classMkhRepository;
        private readonly Lazy<IBlockMkhRepository> _blockMkhRepository;
        private readonly Lazy<INosologyMkhRepository> _nosologyRepository;
        private readonly Lazy<IDiagnosisMkhRepository> _diagnosisMkhRepository;
        private readonly Lazy<IChildrenCardsRepository> _childrenCardsRepository;
        private readonly Lazy<IParentRepository> _parentRepository;
        private readonly Lazy<IParentChildCardRepository> _parentChildCardRepository;
        private readonly Lazy<IImageRepository> _imageRepository;
        private readonly Lazy<UsersManager> _usersManager;
        private readonly Lazy<IPediatriciansExaminationsRepository> _pediatriciansExaminationsRepository;
        private readonly Lazy<RolesManager> _rolesManager;

        public UnitOfWork()
        {
            //TODO DI
            _context = new Context();
            _positionRepository = new Lazy<IPositionRepository>(() => new PositionRepository(_context));
            _classMkhRepository = new Lazy<IClassMkhRepository>(() => new ClassMkhRepository(_context));
            _blockMkhRepository = new Lazy<IBlockMkhRepository>(() => new BlockMkhRepository(_context));
            _nosologyRepository = new Lazy<INosologyMkhRepository>(() => new NosologyMkhRepository(_context));
            _diagnosisMkhRepository = new Lazy<IDiagnosisMkhRepository>(() => new DiagnosisMkhRepository(_context));
            _childrenCardsRepository = new Lazy<IChildrenCardsRepository>(() => new ChildrenCardsRepository(_context));
            _parentRepository = new Lazy<IParentRepository>(() => new ParentRepository(_context));
            _parentChildCardRepository = new Lazy<IParentChildCardRepository>(() => new ParentChildCardRepository(_context));
            _imageRepository = new Lazy<IImageRepository>(() => new ImageRepository(_context));
            _usersManager = new Lazy<UsersManager>(() => HttpContext.Current
                                                                    .GetOwinContext()
                                                                    .GetUserManager<UsersManager>());
            _pediatriciansExaminationsRepository = new Lazy<IPediatriciansExaminationsRepository>
                (() => new PediatriciansExaminationsRepository(_context));
            _rolesManager = new Lazy<RolesManager>(() => HttpContext.Current
                                                                    .GetOwinContext()
                                                                    .GetUserManager<RolesManager>());
        }

        public IPositionRepository PositionRepository => _positionRepository.Value;
        public IClassMkhRepository ClassMkhRepository => _classMkhRepository.Value;
        public IBlockMkhRepository BlockMkhRepository => _blockMkhRepository.Value;
        public INosologyMkhRepository NosologyMkhRepository => _nosologyRepository.Value;
        public IDiagnosisMkhRepository DiagnosisMkhRepository => _diagnosisMkhRepository.Value;
        public IChildrenCardsRepository ChildrenCardsRepository => _childrenCardsRepository.Value;
        public IParentRepository ParentRepository => _parentRepository.Value;
        public IParentChildCardRepository ParentChildCardRepository => _parentChildCardRepository.Value;
        public IPediatriciansExaminationsRepository PediatriciansExaminationsRepository => _pediatriciansExaminationsRepository.Value;
        public UsersManager UsersManager => HttpContext.Current.GetOwinContext().GetUserManager<UsersManager>();
        public IImageRepository ImageRepository => _imageRepository.Value;
        public RolesManager RolesManager => _rolesManager.Value;

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public bool Save()
        {
            try
            {
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }
    }
}
