namespace MedicalDocManagement.BLL.DTO.Main.PediatriciansExamination
{
    public class PediatriciansExaminationDTO
    {
        public int Id { get; set; }
        public HeaderDTO Header { get; set; }
        public string Complaints { get; set; }
        public string AnamnesisOfDisease { get; set; }
        public string AnamnesisOfLife { get; set; }
        public PregnancyDetailsDTO PregnancyDetails { get; set; }
        public BirthDetailsDTO BirthDetails { get; set; }
        public bool? EarlyNeonatalPeriodWasWithoutComplications { get; set; }
        public string ComplicationsDuringNeonatalPeriod { get; set; }
        public string DetailsAfterEarlyNeonatalPeriod { get; set; }
        public PsychomotorDevelopmentDTO PsychomotorDevelopmentOnFirstYear { get; set; }
        public string NaturalFeedingDetails { get; set; }
        public string NonNaturalFeedingDetails { get; set; }
        public string MixedFeedingDetails { get; set; }
        public string PastIllnesses { get; set; }
        public string ScreeningReasonsDetails { get; set; }
        public bool? BadHabitsPresent { get; set; }
        public string BadHabitsDetails { get; set; }
        public bool? WeightedWithAllergicHistory { get; set; }
        public string AllergicHistoryDetails { get; set; }
        public bool? WeightedWithAncestralAnamnesis { get; set; }
        public string AncestralAnamnesisDetails { get; set; }
        public string PreventiveVaccinations { get; set; }
    }
}