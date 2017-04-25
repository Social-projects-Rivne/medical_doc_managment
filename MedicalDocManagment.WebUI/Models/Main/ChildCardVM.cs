using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MedicalDocManagment.WebUI.Models.Main
{
    public class ChildCardVM
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        public DateTime Date { get; set; }
        public string Address { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime? CheckOut { get; set; }
        public string DiagnosisId { get; set; }
        public string Prescription { get; set; }
        public string DirectedBy { get; set; }
        public DiagnosisMkhVM Diagnosis { get; set; }
    }
}