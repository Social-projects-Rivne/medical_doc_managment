using FluentValidation;
using System;

namespace MedicalDocManagment.WebUI.Models.Validators
{
    public class AddPatientVMValidator : AbstractValidator<AddPatientVM>
    {
        public AddPatientVMValidator()
        {
            RuleSet("Names", () =>
            {
                RuleFor(patient => patient.FirstName)
                       .Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}")
                       .WithMessage("Ім'я пацієнта написане не кирилицею");

                RuleFor(patient => patient.SecondName)
                       .Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}")
                       .WithMessage("По батькові пацієнта написане не кирилицею");

                RuleFor(patient => patient.LastName)
                       .Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}")
                       .WithMessage("Прізвище пацієнта написане не кирилицею");

                RuleFor(patient => patient.LastName)
                       .NotNull()
                       .WithMessage("Для додавання пацієнта необхідне його прізвище");

                RuleFor(patient => patient.SecondName)
                       .NotNull()
                       .WithMessage("Для додавання пацієнта необхідне його по батькові");

                RuleFor(patient => patient.FirstName)
                       .NotNull()
                       .WithMessage("Для додавання пацієнта необхідне його ім'я");
            });

            RuleSet("Dates", () =>
            {
                RuleFor(patient => patient.Checkin)
                       .NotNull()
                       .WithMessage("Початкова дата обліку пацієнта є обов'язковою");

                RuleFor(patient => patient.Checkin)
                       .Must(IsValidCheckIn)
                       .WithMessage("Початкова дата обліку пацієнта є більшою за теперішню дату");

                RuleFor(patient => patient.Date)
                       .Must(IsValidDate)
                       .WithMessage("Дата народження пацієнта є більшою за сьогоднішню");
            });

            RuleFor(patient => patient.Address)
                   .Matches(@"[А-Яа-яґҐєЄіІїЇ`´ʼ’ʼ’'-]{1,100}")
                   .WithMessage("Адресу пацієнта вказано невірно");

            RuleFor(patient => patient.DiagnosisCode)
                   .Matches(@"[A-Z]\d{2}.\d")
                   .WithMessage("Діагноз для пацієнта виставленно невірно");
        }

        private bool IsValidDate(DateTime date)
        {
            return DateTime.Compare(date, DateTime.Now) <= 0;
        }

        private bool IsValidCheckIn(DateTime checkIn)
        {
            return DateTime.Compare(checkIn, DateTime.Now) <= 0;
        }

        private bool IsValidCheckOut(AddPatientVM addPatientVM)
        {
            if (!addPatientVM.Checkout.HasValue)
            {
                return true;
            }

            return DateTime.Compare(addPatientVM.Checkin, (DateTime)addPatientVM.Checkout) <= 0;
        }
    }
}
