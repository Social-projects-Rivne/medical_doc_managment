using System;

namespace MedicalDocManagment.WebUI.Models.Main
{
    public class CreateVisitVM
    {
        public string DoctorId { get; set; }

        public int PatientId { get; set; }

        public string Summary { get; set; }

        public DateTime Date { get; set; }
    }
}
