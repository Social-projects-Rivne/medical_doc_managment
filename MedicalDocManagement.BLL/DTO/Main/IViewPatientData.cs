using System;

namespace MedicalDocManagement.BLL.DTO.Main
{
    public interface IViewPatientData
    {
        string LastName { get; set; }
        string FirstName { get; set; }
        string SecondName { get; set; }
        DateTime? Date { get; set; }
        string CardNumber { get; set; }
    }
}
