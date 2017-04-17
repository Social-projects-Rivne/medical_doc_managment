using System;
using System.ComponentModel.DataAnnotations;

namespace MedicalDocManagment.WebUI.Models
{
    public class AddPatientVM
    {
        [Required(ErrorMessage = "Для додавання пацієнта необхідне його прізвище.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Для додавання пацієнта необхідне його ім'я.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Для додавання пацієнта необхідне його по-батькові.")]
        public string SecondName { get; set; }

        public DateTime? Date { get; set; }

        public DateTime? Checkin { get; set; }
        public DateTime? Checkout { get; set; }
        public string DiagnosisCode { get; set; }
        public string DirectedBy { get; set; }
    }
}