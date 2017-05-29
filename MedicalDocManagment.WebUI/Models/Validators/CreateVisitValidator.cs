using FluentValidation;
using MedicalDocManagment.WebUI.Models.Main;
using MedicalDocManagment.WebUI.Models.Validators.Helpers;

namespace MedicalDocManagment.WebUI.Models.Validators
{
    public class CreateVisitValidator : AbstractValidator<CreateVisitVM>
    {
        public CreateVisitValidator()
        {
            RuleFor(visit => visit.Summary)
                   .NotEmpty()
                   .WithMessage("Заключення для пацієнта пусте.");

            RuleFor(visit => visit.Summary)
                   .NotNull()
                   .WithMessage("Заключення для пацієнта обов'язкове.");

            RuleFor(visit => visit.Date)
                   .Must(CreateVisitValidatorHelper.IsNotNullAnyDate)
                   .WithMessage("Дата візиту до лікаря є обов'язковою.");

            RuleFor(visit => visit.Date)
                   .Must(CreateVisitValidatorHelper.IsAnyDateMoreThanToday)
                   .WithMessage("Дата візиту до лікаря є більшьою за сьогоднішню.");
        }
    }
}
