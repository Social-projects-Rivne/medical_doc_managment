using FluentValidation.Attributes;
using MedicalDocManagment.WebUI.Models.Validators;
using System.ComponentModel.DataAnnotations.Schema;
using MultipartDataMediaFormatter.Infrastructure;

namespace MedicalDocManagment.WebUI.Models
{
    [Validator(typeof(UserModelValidator))]
    public class UserCreateModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        [NotMapped]
        public HttpFile Content { get; set; }
        public int PositionId { get; set; }
    }
}