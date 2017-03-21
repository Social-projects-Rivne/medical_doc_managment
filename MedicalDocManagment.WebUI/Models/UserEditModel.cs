using FluentValidation.Attributes;
using MedicalDocManagment.WebUI.Models.Validators;

namespace MedicalDocManagment.WebUI.Models
{
    [Validator(typeof(UserModelValidator))]
    public class UserEditModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }
        public bool IsActive { get; set; }
    }
}