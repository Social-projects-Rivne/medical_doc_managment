using System;
using System.Collections.Generic;
using MedicalDocManagement.BLL.DTO.Main;
using System.Threading.Tasks;

namespace MedicalDocManagement.BLL.Services.Abstract
{
    public interface IVisitsService : IDisposable
    {
        List<VisitDTO> GetVisitsByPatientId(int patientId);

        Task<VisitDTO> CreateVisit(VisitDTO visitDTO);
    }
}
