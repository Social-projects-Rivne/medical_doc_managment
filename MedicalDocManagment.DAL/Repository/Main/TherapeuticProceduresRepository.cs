using System.Data.Entity;
using MedicalDocManagment.DAL.Entities.Main;
using MedicalDocManagment.DAL.Repository.Interfaces;

namespace MedicalDocManagment.DAL.Repository.Main
{
    class TherapeuticProceduresRepository : GenericRepository<TherapeuticProcedure>, ITherapeuticProceduresRepository
    {
        public TherapeuticProceduresRepository(DbContext context) : base(context)
        {
        }
    }
}
