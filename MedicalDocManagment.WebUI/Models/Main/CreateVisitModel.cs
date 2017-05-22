using System;

namespace MedicalDocManagment.WebUI.Models.Main
{
    public class CreateVisitModel
    {
        public string DoctorId { get; set; }

        public int PatientId { get; set; }

        public string Summury { get; set; }

        public DateTime Date { get; set; }
    }
}
