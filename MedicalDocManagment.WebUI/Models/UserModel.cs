using FluentValidation.Attributes;
using MedicalDocManagment.WebUI.Models.Validators;
using MedicalDocManagment.UsersDAL.Entities;

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
        //TODO create DTO than remove useless namespace
        public int PositionId { get; set; }
    }
}