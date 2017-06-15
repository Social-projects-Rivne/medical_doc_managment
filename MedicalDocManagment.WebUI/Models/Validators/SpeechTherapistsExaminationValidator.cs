using FluentValidation;
using MedicalDocManagment.WebUI.Models.Main;
using MedicalDocManagment.WebUI.Models.Validators.Helpers;

namespace MedicalDocManagment.WebUI.Models.Validators
{
    public class SpeechTherapistsExaminationValidator : AbstractValidator<SpeechTherapistsExaminationVM>
    {
        public SpeechTherapistsExaminationValidator()
        {
            RuleFor(data => data.Date)
                .Must(ViewPatientDataValidatorHelper.IsAnyDateMoreThanToday)
                .When(data => data.Date != null);

            RuleFor(data => data.DoctorsId)
                .NotEmpty();

            RuleFor(data => data.FeaturesOfPhoneticAndPhonematicSpeechComponents.LevelOfFormation)
                .IsInEnum();

            RuleFor(data => data.GrammaticalStructureOfSpeech.LevelOfFormation)
                .IsInEnum();

            RuleFor(data => data.StateOfTheLexicalPartOfSpeech.LevelOfFormation)
                .IsInEnum();
        }
    }
}
