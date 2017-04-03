using FluentValidation;

namespace MedicalDocManagment.SharedUI.Models.Validators
{
    public class UserModelValidator : AbstractValidator<UserModel>
    {
        public UserModelValidator()
        {
            RuleFor(user => user.UserName).Matches(@"[a-zA-Z0-9]{3,60}");
            RuleFor(user => user.Email).Matches(@"[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}");
            RuleFor(user => user.Password).Length(6, 100);
            RuleSet("Names", () =>
            {
                RuleFor(user => user.FirstName).Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}");
                RuleFor(user => user.SecondName).Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}");
                RuleFor(user => user.LastName).Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}");
            });
            //TODO fix validation
            //RuleFor(user => user.Position).NotEmpty();
        }
    }
}