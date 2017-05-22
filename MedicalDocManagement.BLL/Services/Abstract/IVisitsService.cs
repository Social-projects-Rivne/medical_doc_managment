using System;
using System.Collections.Generic;
using MedicalDocManagement.BLL.DTO.Main;

namespace MedicalDocManagement.BLL.Services.Abstract
{
    public interface IVisitsService : IDisposable
    {
        List<VisitDTO> GetVisits();

        List<VisitDTO> GetVisitsByDoctorId(int doctorId);

        List<VisitDTO> GetVisitsByPatientId(int patientId);

        VisitDTO GetVisitById(int id);

        VisitDTO CreateVisit(VisitDTO visitDTO);
    }
}
