namespace MedicalDocManagement.BLL.DTO.Main
{
    public class PediatriciansExaminationDTO
    {
        public int Id { get; set; }

        public string HeaderAge { get; set; }
        public string HeaderWeight { get; set; }
        public string HeaderHeight { get; set; }
        public string HeaderHeadCircumference { get; set; }
        public string HeaderChestCircumference { get; set; }
        public string HeaderVT { get; set; }

        public string Complaints { get; set; }
        public string AnamnesisOfDisease { get; set; }
        public string AnamnesisOfLife { get; set; }

        public string PregnancyDetailsSomeDetails { get; set; }
        public bool? PregnancyDetailsPassedNormally { get; set; }
        public bool? PregnancyDetailsPassedWithToxemia { get; set; }
        public string PregnancyDetailsToxemiaDetails { get; set; }
        public bool? PregnancyDetailsPassedWithAnemia { get; set; }
        public bool? PregnancyDetailsWithThreatInInterruption { get; set; }
        public string PregnancyDetailsDateOfInterruption { get; set; }
        public string PregnancyDetailsFromDetails { get; set; }
        public int PregnancyDetailsChildBirth { get; set; }

        public string BirthDetailsWeight { get; set; }
        public string BirthDetailsBodyLength { get; set; }
        public string BirthDetailsHeadCircumference { get; set; }
        public string BirthDetailsChestCircumference { get; set; }
        public string BirthDetailsScoreByApgar { get; set; }

        public bool? EarlyNeonatalPeriodWasWithoutComplications { get; set; }
        public string ComplicationsDuringNeonatalPeriod { get; set; }
        public string DetailsAfterEarlyNeonatalPeriod { get; set; }

        public bool? PsychomotorDevelopmentWasAccordingToAgeLimit { get; set; }
        public bool? PsychomotorDevelopmentWasNotNormal { get; set; }
        public string PsychomotorDevelopmentDetails { get; set; }

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
