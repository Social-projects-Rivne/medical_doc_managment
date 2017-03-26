using FluentValidation;

namespace MedicalDocManagment.WebUI.Models.Validators
{
    public class UserEditModelValidator : AbstractValidator<UserEditModel>
    {
        public UserEditModelValidator()
        {
            RuleSet("Names", () =>
            {
                RuleFor(user => user.FirstName).Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}");
                RuleFor(user => user.SecondName).Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}");
                RuleFor(user => user.LastName).Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}");
            });
            //TODO fix this validaton
            //RuleFor(user => user.Position).NotEmpty();
        }
    }
}
