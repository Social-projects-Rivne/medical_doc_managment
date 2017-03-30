using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Linq.Expressions;
using MedicalDocManagment.UsersDAL.Repositories.Interfaces;

namespace MedicalDocManagment.UsersDAL.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected DbContext context;
        protected readonly IDbSet<T> dbset;

        public GenericRepository(DbContext context)
        {
            this.context = context;
            dbset = context.Set<T>();
        }

        public IQueryable<T> Get()
        {
            return dbset;
        }

        public IQueryable<T> Get(Expression<Func<T, bool>> predicate)
        {
            return dbset.Where(predicate);
        }

        public IList<T> GetAll(Expression<Func<T, bool>> predicate)
        {
            return dbset.Where(predicate).ToList();
        }

        public void Add(T entity)
        {
            dbset.Add(entity);
        }

        public void AddOrUpdate(T entity)
        {
            dbset.AddOrUpdate(entity);
        }

        public void Remove(T entity)
        {
            dbset.Remove(entity);
        }
    }
}
