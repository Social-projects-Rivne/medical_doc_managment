using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace MedicalDocManagment.DAL.Repository.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> Get();
        IQueryable<T> Get(Expression<Func<T, bool>> predicate);
        IList<T> GetAll(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void AddOrUpdate(T entity);
        void Remove(T entity);
        void Update(T entity);
    }
}
