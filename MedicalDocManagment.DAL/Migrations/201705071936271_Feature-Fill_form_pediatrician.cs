namespace MedicalDocManagment.DAL.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class FeatureFill_form_pediatrician : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PediatriciansExaminations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Header_Age = c.String(maxLength: 33),
                        Header_Weight = c.String(maxLength: 32),
                        Header_Height = c.String(maxLength: 31),
                        Header_HeadCircumference = c.String(maxLength: 19),
                        Header_ChestCircumference = c.String(maxLength: 11),
                        Header_VT = c.String(maxLength: 34),
                        Complaints = c.String(maxLength: 308),
                        AnamnesisOfDisease = c.String(maxLength: 819),
                        AnamnesisOfLife = c.String(maxLength: 92),
                        PregnancyDetails_SomeDetails = c.String(maxLength: 54),
                        PregnancyDetails_PassedNormally = c.Boolean(),
                        PregnancyDetails_PassedWithToxemia = c.Boolean(),
                        PregnancyDetails_ToxemiaDetails = c.String(maxLength: 22),
                        PregnancyDetails_PassedWithAnemia = c.Boolean(),
                        PregnancyDetails_WithThreatInInterruption = c.Boolean(),
                        PregnancyDetails_DateOfInterruption = c.String(maxLength: 29),
                        PregnancyDetails_FromDetails = c.String(maxLength: 60),
                        PregnancyDetails_ChildBirth = c.Int(nullable: false),
                        BirthDetails_Weight = c.String(maxLength: 15),
                        BirthDetails_BodyLength = c.String(maxLength: 16),
                        BirthDetails_HeadCircumference = c.String(maxLength: 18),
                        BirthDetails_ChestCircumference = c.String(maxLength: 24),
                        BirthDetails_ScoreByApgar = c.String(maxLength: 29),
                        EarlyNeonatalPeriodWasWithoutComplications = c.Boolean(),
                        ComplicationsDuringNeonatalPeriod = c.String(maxLength: 35),
                        DetailsAfterEarlyNeonatalPeriod = c.String(maxLength: 105),
                        PsychomotorDevelopmentOnFirstYear_WasAccordingToAgeLimit = c.Boolean(),
                        PsychomotorDevelopmentOnFirstYear_WasNotNormal = c.Boolean(),
                        PsychomotorDevelopmentOnFirstYear_Details = c.String(maxLength: 125),
                        NaturalFeedingDetails = c.String(maxLength: 18),
                        NonNaturalFeedingDetails = c.String(maxLength: 19),
                        MixedFeedingDetails = c.String(maxLength: 21),
                        PastIllnesses = c.String(maxLength: 817),
                        ScreeningReasonsDetails = c.String(maxLength: 297),
                        BadHabitsPresent = c.Boolean(),
                        BadHabitsDetails = c.String(maxLength: 75),
                        WeightedWithAllergicHistory = c.Boolean(),
                        AllergicHistoryDetails = c.String(maxLength: 52),
                        WeightedWithAncestralAnamnesis = c.Boolean(),
                        AncestralAnamnesisDetails = c.String(maxLength: 55),
                        PreventiveVaccinations = c.String(maxLength: 83),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.ChildrenCards", "PediatriciansExaminationId", c => c.Int());
            CreateIndex("dbo.ChildrenCards", "PediatriciansExaminationId");
            AddForeignKey("dbo.ChildrenCards", "PediatriciansExaminationId", "dbo.PediatriciansExaminations", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ChildrenCards", "PediatriciansExaminationId", "dbo.PediatriciansExaminations");
            DropIndex("dbo.ChildrenCards", new[] { "PediatriciansExaminationId" });
            DropColumn("dbo.ChildrenCards", "PediatriciansExaminationId");
            DropTable("dbo.PediatriciansExaminations");
        }
    }
}
