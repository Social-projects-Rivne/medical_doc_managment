using System;
using System.Collections.Generic;
using MedicalDocManagement.BLL.DTO.Main;

namespace MedicalDocManagement.BLL.Services.Abstract
{
    public interface IVisitsService : IDisposable
    {
        List<VisitDTO> GetVisitsByPatientId(int patientId);

        VisitDTO CreateVisit(VisitDTO visitDTO);
    }
}
