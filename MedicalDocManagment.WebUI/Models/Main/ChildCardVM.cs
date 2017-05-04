using System;
using System.ComponentModel.DataAnnotations;

namespace MedicalDocManagment.WebUI.Models.Main
{
    public class SavePediatriciansExaminationVM
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Для збереження огляду педіатра необхідно вказати ідентифікатор картки пацієнта")]
        public int ChildCardId { get; set; }

    header: HeaderModel;
    complaints: string;
    anamnesisOfDisease: string;
    anamnesisOfLife: string;
    pregnancyDetails: PregnancyDetailsModel;
    birthDetails: BirthDetailsModel;
    earlyNeonatalPeriodWasWithoutComplications: Trilean;
    complicationsDuringNeonatalPeriod: string;
    detailsAfterEarlyNeonatalPeriod: string;
    psychomotorDevelopmentOnFirstYear: PsychomotorDevelopmentModel;    
    naturalFeedingDetails: string;
    nonNaturalFeedingDetails: string;
    mixedFeedingDetails: string;
    pastIllnesses: string;
    screeningReasonsDetails: string;
    badHabitsPresent: Trilean;
    badHabitsDetails: string;
    weightedWithAllergicHistory: Trilean;
    allergicHistoryDetails: string;
    weightedWithAncestralAnamnesis: Trilean;
    ancestralAnamnesisDetails: string;
    preventiveVaccinations: string;
    }
}