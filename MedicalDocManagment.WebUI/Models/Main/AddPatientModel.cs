using System;

namespace MedicalDocManagment.WebUI.Models
{
    public class AddPatientModel
    {
        public string L_Name { get; set; }
        public string F_Name { get; set; }
        public string S_Name { get; set; }        
        public DateTime Date { get; set; }
        public DateTime Checkin { get; set; }
        public DateTime Checkout { get; set; }
        public string DiagnosisCode { get; set; }
        public string DirectedBy { get; set; }
    }
}