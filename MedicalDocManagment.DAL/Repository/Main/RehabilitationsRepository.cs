using System.Data.Entity;
using MedicalDocManagment.DAL.Entities.Main;
using MedicalDocManagment.DAL.Repository.Interfaces;

namespace MedicalDocManagment.DAL.Repository.Main
{
    class RehabilitationsRepository : GenericRepository<Rehabilitation>, IRehabilitationsRepository
    {
        public RehabilitationsRepository(DbContext context) : base(context)
        {
        }
    }
}
