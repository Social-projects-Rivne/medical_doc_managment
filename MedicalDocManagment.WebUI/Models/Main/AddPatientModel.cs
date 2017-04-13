using System;

namespace MedicalDocManagment.WebUI.Models
{
    public class AddPatientModel
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }        
        public DateTime Date { get; set; }
        public DateTime Checkin { get; set; }
        public DateTime? Checkout { get; set; }
        public string DiagnosisCode { get; set; }
        public string DirectedBy { get; set; }
    }
}