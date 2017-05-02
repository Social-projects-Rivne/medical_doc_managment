using FluentValidation;
using MedicalDocManagment.WebUI.Models.Validators.Helpers;

namespace MedicalDocManagment.WebUI.Models.Validators
{
    public class AddPatientVMValidator : AbstractValidator<AddPatientVM>
    {
        public AddPatientVMValidator()
        {

            #region Names

            RuleFor(patient => patient.LastName)
                   .NotNull()
                   .WithMessage("Для додавання пацієнта необхідне його прізвище");

            RuleFor(patient => patient.SecondName)
                   .NotNull()
                   .WithMessage("Для додавання пацієнта необхідне його по батькові");

            RuleFor(patient => patient.FirstName)
                   .NotNull()
                   .WithMessage("Для додавання пацієнта необхідне його ім'я");

            RuleFor(patient => patient.FirstName)
                   .Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}")
                   .WithMessage("Ім'я пацієнта написане не кирилицею");

            RuleFor(patient => patient.SecondName)
                   .Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}")
                   .WithMessage("По батькові пацієнта написане не кирилицею");

            RuleFor(patient => patient.LastName)
                   .Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}")
                   .WithMessage("Прізвище пацієнта написане не кирилицею");

            #endregion

            #region Dates

            RuleFor(patient => patient.Checkin)
                   .Must(AddPatientValidatorHelper.IsNotNullAnyDate)
                   .WithMessage("Початкова дата обліку пацієнта є обов'язковою");

            RuleFor(patient => patient.Date)
                   .Must(AddPatientValidatorHelper.IsNotNullAnyDate)
                   .WithMessage("Дата народження пацієнта обов'язкова");

            RuleFor(patient => patient.Date)
                   .Must(AddPatientValidatorHelper.IsAnyDateMoreThanToday)
                   .WithMessage("Дата народження пацієнта введена не вірно");

            RuleFor(patient => patient.Checkin)
                   .Must(AddPatientValidatorHelper.IsAnyDateMoreThanToday)
                   .WithMessage("Початкова дата обліку пацієнта є більшою за теперішню дату");

            RuleFor(patient => patient)
                   .Must(AddPatientValidatorHelper.IsCheckInMoreThanDate)
                   .OverridePropertyName("checkIn")
                   .WithMessage("Початкова дата обліку пацієнта є більшою за його дату народження");

            RuleFor(patient => patient)
                   .Must(AddPatientValidatorHelper.IsValidCheckOut)
                   .OverridePropertyName("checkOut")
                   .WithMessage("Кінцева дата обліку пацієнта є меншою за початкову дату обліку");

            #endregion

            #region Address

            RuleFor(patient => patient.Address)
                       .NotNull()
                       .WithMessage("Адреса пацієнта обов'язкова");

            RuleFor(patient => patient.Address)
                   .Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}")
                   .WithMessage("Адресу пацієнта вказано невірно");

            #endregion 

            #region DiagnosisCode

            RuleFor(patient => patient.DiagnosisCode)
                       .NotNull()
                       .WithMessage("Діагноз для пацієнта обов'язковий");

            RuleFor(patient => patient.DiagnosisCode)
                   .Matches(@"[A-Z]\d{2}.\d")
                   .WithMessage("Діагноз для пацієнта виставлено невірно");

            #endregion

            RuleFor(patient => patient.DirectedBy)
                .NotNull()
                .WithMessage("Поле \"Ким направленний\" обов'язкове");

        }

    }
}
