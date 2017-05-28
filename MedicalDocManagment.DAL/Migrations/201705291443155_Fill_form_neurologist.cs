namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Fill_form_neurologist : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.NeurologistsExaminations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Complaints = c.String(maxLength: 290),
                        Anamnesis = c.String(maxLength: 573),
                        StatokineticDevelopment = c.String(maxLength: 273),
                        PsychospeechDevelopment = c.String(maxLength: 272),
                        NeurologicalState_Consciousness = c.String(maxLength: 89),
                        NeurologicalState_ReactionToOthers = c.String(maxLength: 79),
                        NeurologicalState_MeningealSymptoms = c.String(maxLength: 78),
                        NeurologicalState_HeadCircumference = c.String(maxLength: 17),
                        NeurologicalState_HeadShape = c.String(maxLength: 46),
                        NeurologicalState_CranialNerves = c.String(maxLength: 276),
                        NeurologicalState_ReflexMotorArea = c.String(maxLength: 74),
                        NeurologicalState_MovementsVolume = c.String(maxLength: 187),
                        NeurologicalState_TendonAndPeriostealReflexes = c.String(maxLength: 163),
                        NeurologicalState_AbdominalReflexes = c.String(maxLength: 82),
                        NeurologicalState_AbnormalReflexes = c.String(maxLength: 178),
                        NeurologicalState_UnconditionedReflexes = c.String(maxLength: 278),
                        NeurologicalState_HeadControl = c.String(maxLength: 83),
                        NeurologicalState_TurningOnStomach = c.String(maxLength: 77),
                        NeurologicalState_TestForTraction = c.String(maxLength: 82),
                        NeurologicalState_Sitting = c.String(maxLength: 91),
                        NeurologicalState_Crawling = c.String(maxLength: 90),
                        NeurologicalState_Standing = c.String(maxLength: 91),
                        NeurologicalState_Backing = c.String(maxLength: 93),
                        NeurologicalState_Walking = c.String(maxLength: 93),
                        NeurologicalState_Hyperkinesis = c.String(maxLength: 87),
                        NeurologicalState_Episyndrome = c.String(maxLength: 286),
                        NeurologicalState_FunctionsOfPelvicOrgans = c.String(maxLength: 76),
                        Diagnosis = c.String(maxLength: 1477),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.ChildrenCards", "NeurologistsExaminationId", c => c.Int());
            CreateIndex("dbo.ChildrenCards", "NeurologistsExaminationId");
            AddForeignKey("dbo.ChildrenCards", "NeurologistsExaminationId", "dbo.NeurologistsExaminations", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ChildrenCards", "NeurologistsExaminationId", "dbo.NeurologistsExaminations");
            DropIndex("dbo.ChildrenCards", new[] { "NeurologistsExaminationId" });
            DropColumn("dbo.ChildrenCards", "NeurologistsExaminationId");
            DropTable("dbo.NeurologistsExaminations");
        }
    }
}
