using FluentValidation;
using MedicalDocManagment.WebUI.Models.Validators.Helpers;

namespace MedicalDocManagment.WebUI.Models.Validators
{
    public class ViewPatientDataValidator : AbstractValidator<ViewPatientDataVM>
    {
        public ViewPatientDataValidator()
        {
            RuleFor(data => data.FirstName)
                .NotNull()
                .Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}")
                .When(data => data.ViewCategory == ViewPatientDataCategoryEnum.byFirstName ||
                    data.ViewCategory == ViewPatientDataCategoryEnum.byAllInTheAbove);
            RuleFor(data => data.FirstName)
                .Null()
                .When(data => data.ViewCategory != ViewPatientDataCategoryEnum.byFirstName &&
                    data.ViewCategory != ViewPatientDataCategoryEnum.byAllInTheAbove);

            RuleFor(data => data.SecondName)
                .NotNull()
                .Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}")
                .When(data => data.ViewCategory == ViewPatientDataCategoryEnum.bySecondName ||
                    data.ViewCategory == ViewPatientDataCategoryEnum.byAllInTheAbove);
            RuleFor(data => data.SecondName)
                .Null()
                .When(data => data.ViewCategory != ViewPatientDataCategoryEnum.bySecondName &&
                    data.ViewCategory != ViewPatientDataCategoryEnum.byAllInTheAbove);

            RuleFor(data => data.LastName)
                .NotNull()
                .Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}")
                .When(data => data.ViewCategory == ViewPatientDataCategoryEnum.byLastName ||
                    data.ViewCategory == ViewPatientDataCategoryEnum.byAllInTheAbove);
            RuleFor(data => data.LastName)
                .Null()
                .When(data => data.ViewCategory != ViewPatientDataCategoryEnum.byLastName &&
                    data.ViewCategory != ViewPatientDataCategoryEnum.byAllInTheAbove);

            RuleFor(data => data.Date)
                .NotNull()
                .Must(ViewPatientDataValidatorHelper.IsAnyDateMoreThanToday)
                .When(data => data.ViewCategory == ViewPatientDataCategoryEnum.byBirthDate ||
                    data.ViewCategory == ViewPatientDataCategoryEnum.byAllInTheAbove);
            RuleFor(data => data.Date)
                .Null()
                .When(data => data.ViewCategory != ViewPatientDataCategoryEnum.byBirthDate &&
                    data.ViewCategory != ViewPatientDataCategoryEnum.byAllInTheAbove);

            RuleFor(data => data.CardNumber)
                .NotNull()
                .When(data => data.ViewCategory == ViewPatientDataCategoryEnum.byCardNumber ||
                    data.ViewCategory == ViewPatientDataCategoryEnum.byAllInTheAbove);
            RuleFor(data => data.CardNumber)
                .Null()
                .When(data => data.ViewCategory != ViewPatientDataCategoryEnum.byCardNumber &&
                    data.ViewCategory != ViewPatientDataCategoryEnum.byAllInTheAbove);

            RuleFor(data => data.ViewCategory)
                .NotNull()
                .IsInEnum();
        }
    }
}
