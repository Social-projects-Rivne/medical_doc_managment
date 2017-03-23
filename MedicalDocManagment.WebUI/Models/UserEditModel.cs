using FluentValidation.Attributes;
using MedicalDocManagment.UsersDAL.Entities;
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
        //TODO create DTO than remove useless namespace
        public Position Position { get; set; }
        public bool IsActive { get; set; }
    }
}