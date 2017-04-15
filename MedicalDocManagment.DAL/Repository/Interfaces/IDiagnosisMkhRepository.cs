using MedicalDocManagment.DAL.Entities;

namespace MedicalDocManagment.DAL.Repository.Interfaces
{
    public interface IDiagnosisMkhRepository : IGenericRepository<DiagnosisMkh>
    {
        DiagnosisMkh FindSingleByCode(string code);
    }
}
