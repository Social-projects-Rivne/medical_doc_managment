﻿using MedicalDocManagment.DAL.Manager;
using MedicalDocManagment.DAL.Repository.Interfaces;
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
        private readonly Lazy<UsersManager> _usersManager;

        public UnitOfWork()
        {
            //TODO DI
            _context = new Context();
            _positionRepository = new Lazy<IPositionRepository>(() => new PositionRepository(_context));
            _classMkhRepository = new Lazy<IClassMkhRepository>(() => new ClassMkhRepository(_context));
            _blockMkhRepository = new Lazy<IBlockMkhRepository>(() => new BlockMkhRepository(_context));
            _usersManager = new Lazy<UsersManager>(() => HttpContext.Current
                                                                    .GetOwinContext()
                                                                    .GetUserManager<UsersManager>());
        }

        public IPositionRepository PositionRepository => _positionRepository.Value;
        public IClassMkhRepository ClassMkhRepository => _classMkhRepository.Value;
        public IBlockMkhRepository BlockMkhRepository => _blockMkhRepository.Value;
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
