using System;

namespace MedicalDocManagment.WebUI.Models.Main
{
    public class ViewVisitVM
    {
        public UserEditModel Doctor { get; set; }
        public string DoctorId { get; set; }

        public ChildCardVM Patient { get; set; }
        public int PatientId { get; set; }

        public string Summary { get; set; }

        public DateTime Date { get; set; }
    }
}
