using FluentValidation;
using MedicalDocManagment.WebUI.Models.Main;
using MedicalDocManagment.WebUI.Models.Validators.Helpers;

namespace MedicalDocManagment.WebUI.Models.Validators
{
    public class RehabilitationVMValidator:AbstractValidator<RehabilitationVM>
    {
        public RehabilitationVMValidator()
        {
            RuleFor(rehabilitation => rehabilitation.BeginDate)
                   .Must(RehabilitationVMValidationHelper.IsNotNullAnyDate)
                   .WithMessage("Дата призначення обов'язкова для заповнення.");
            RuleFor(rehabilitation => rehabilitation.BeginDate)
                   .Must(CreateVisitValidatorHelper.IsAnyDateMoreThanToday)
                   .WithMessage("Дата призначення не може перевищувати теперішню дату.");
        }
    }
}