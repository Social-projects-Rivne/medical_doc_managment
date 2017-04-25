using System;
using System.ComponentModel.DataAnnotations;

namespace MedicalDocManagment.WebUI.Models
{
    public class ViewPatientDataVM
    {
        [Required(ErrorMessage = "Для перегляду даних про пацієнта необхідне його прізвище.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Для перегляду даних про пацієнта необхідне його ім'я.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Для перегляду даних про пацієнта необхідне його по батькові.")]
        public string SecondName { get; set; }

        [Required(ErrorMessage = "Для перегляду даних про пацієнта необхідна дата його народження.")]
        public DateTime? BirthDate { get; set; }
    }
}