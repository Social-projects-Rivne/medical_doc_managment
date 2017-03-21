using FluentValidation.Attributes;
using MedicalDocManagment.WebUI.Models.Validators;

namespace MedicalDocManagment.WebUI.Models
{
    [Validator(typeof(UserModelValidator))]
    public class UserModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }
    }
}