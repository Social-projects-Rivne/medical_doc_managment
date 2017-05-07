using System.ComponentModel.DataAnnotations;

namespace MedicalDocManagment.DAL.Entities.Main.PediatriciansExamination
{
    public class PediatriciansExamination
    {
        [Key]
        public int Id { get; set; }

        public Header Header { get; set; }

        [StringLength(308)]
        public string Complaints { get; set; }

        [StringLength(819)]
        public string AnamnesisOfDisease { get; set; }

        [StringLength(92)]
        public string AnamnesisOfLife { get; set; }

        public PregnancyDetails PregnancyDetails { get; set; }
        public BirthDetails BirthDetails { get; set; }
        public bool? EarlyNeonatalPeriodWasWithoutComplications { get; set; }

        [StringLength(35)]
        public string ComplicationsDuringNeonatalPeriod { get; set; }

        [StringLength(105)]
        public string DetailsAfterEarlyNeonatalPeriod { get; set; }

        public PsychomotorDevelopment PsychomotorDevelopmentOnFirstYear { get; set; }

        [StringLength(18)]
        public string NaturalFeedingDetails { get; set; }

        [StringLength(19)]
        public string NonNaturalFeedingDetails { get; set; }

        [StringLength(21)]
        public string MixedFeedingDetails { get; set; }

        [StringLength(817)]
        public string PastIllnesses { get; set; }

        [StringLength(297)]
        public string ScreeningReasonsDetails { get; set; }

        public bool? BadHabitsPresent { get; set; }

        [StringLength(75)]
        public string BadHabitsDetails { get; set; }

        public bool? WeightedWithAllergicHistory { get; set; }

        [StringLength(52)]
        public string AllergicHistoryDetails { get; set; }

        public bool? WeightedWithAncestralAnamnesis { get; set; }

        [StringLength(55)]
        public string AncestralAnamnesisDetails { get; set; }

        [StringLength(83)]
        public string PreventiveVaccinations { get; set; }
    }
}
