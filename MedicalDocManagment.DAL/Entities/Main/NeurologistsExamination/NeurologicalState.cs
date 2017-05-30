using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities.Main.NeurologistsExamination
{
    [ComplexType]
    public class NeurologicalState
    {
        [StringLength(89)]
        public string Consciousness { get; set; }

        [StringLength(79)]
        public string ReactionToOthers { get; set; }

        [StringLength(78)]
        public string MeningealSymptoms { get; set; }

        [Range(10, 100)]
        [RegularExpression(@"[1-9]\d(\.\d)?")]
        public float HeadCircumference { get; set; }

        [StringLength(46)]
        public string HeadShape { get; set; }

        [StringLength(276)]
        public string CranialNerves { get; set; }

        [StringLength(74)]
        public string ReflexMotorArea { get; set; }

        [StringLength(187)]
        public string MovementsVolume { get; set; }

        [StringLength(163)]
        public string TendonAndPeriostealReflexes { get; set; }

        [StringLength(82)]
        public string AbdominalReflexes { get; set; }

        [StringLength(178)]
        public string AbnormalReflexes { get; set; }

        [StringLength(278)]
        public string UnconditionedReflexes { get; set; }

        [StringLength(83)]
        public string HeadControl { get; set; }

        [StringLength(77)]
        public string TurningOnStomach { get; set; }

        [StringLength(82)]
        public string TestForTraction { get; set; }

        [StringLength(91)]
        public string Sitting { get; set; }

        [StringLength(90)]
        public string Crawling { get; set; }

        [StringLength(91)]
        public string Standing { get; set; }

        [StringLength(93)]
        public string Backing { get; set; }

        [StringLength(93)]
        public string Walking { get; set; }

        [StringLength(87)]
        public string Hyperkinesis { get; set; }

        [StringLength(286)]
        public string Episyndrome { get; set; }

        [StringLength(76)]
        public string FunctionsOfPelvicOrgans { get; set; }
    }
}