using FluentValidation.Attributes;
using MedicalDocManagment.WebUI.Models.Validators;
using System;
using System.ComponentModel.DataAnnotations;

namespace MedicalDocManagment.WebUI.Models
{
    [Validator(typeof(AddPatientVMValidator))]
    public class AddPatientVM
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public DateTime Date { get; set; }
        public string Address { get; set; }
        public DateTime Checkin { get; set; }
        public DateTime? Checkout { get; set; }
        public string DiagnosisCode { get; set; }
        public string DirectedBy { get; set; }
    }
}
