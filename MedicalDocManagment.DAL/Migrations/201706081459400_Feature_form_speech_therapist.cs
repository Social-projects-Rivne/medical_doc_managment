namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Feature_form_speech_therapist : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SpeechTherapistsExaminationEntities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ChildsEarlySpeechDevelopment_Cooing = c.String(maxLength: 58),
                        ChildsEarlySpeechDevelopment_Babble = c.String(maxLength: 58),
                        ChildsEarlySpeechDevelopment_FirstWords = c.String(maxLength: 49),
                        ChildsEarlySpeechDevelopment_PhraseSpeech = c.String(maxLength: 61),
                        ChildsEarlySpeechDevelopment_BreaksInDevelopment = c.String(maxLength: 145),
                        ChildsEarlySpeechDevelopment_WorkWithTeacherAndSpeechTherapist = c.String(maxLength: 122),
                        StateOfTheLexicalPartOfSpeech_ImpressiveSpeech = c.String(maxLength: 173),
                        StateOfTheLexicalPartOfSpeech_ExspressiveSpeech = c.String(maxLength: 172),
                        StateOfTheLexicalPartOfSpeech_LevelOfFormation = c.Int(nullable: false),
                        StateOfTheLexicalPartOfSpeech_LevelOfFormationText = c.String(maxLength: 116),
                        GrammaticalStructureOfSpeech_Text = c.String(maxLength: 161),
                        GrammaticalStructureOfSpeech_LevelOfFormation = c.Int(nullable: false),
                        GrammaticalStructureOfSpeech_LevelOfFormationText = c.String(maxLength: 135),
                        FeaturesOfPhoneticAndPhonematicSpeechComponents_Text = c.String(maxLength: 328),
                        FeaturesOfPhoneticAndPhonematicSpeechComponents_LevelOfFormation = c.Int(nullable: false),
                        FeaturesOfPhoneticAndPhonematicSpeechComponents_LevelOfFormationText = c.String(maxLength: 125),
                        ManifestationsOfStuttering = c.String(maxLength: 78),
                        Conclusion = c.String(maxLength: 466),
                        LongtermIndividualPlanOfRemedialWork = c.String(maxLength: 902),
                        EfficiencyOfSpeechTherapyEffect = c.String(maxLength: 347),
                        Date = c.DateTime(),
                        DoctorsId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.DoctorsId, cascadeDelete: true)
                .Index(t => t.DoctorsId);
            
            AddColumn("dbo.ChildrenCards", "SpeechTherapistsExaminationId", c => c.Int());
            CreateIndex("dbo.ChildrenCards", "SpeechTherapistsExaminationId");
            AddForeignKey("dbo.ChildrenCards", "SpeechTherapistsExaminationId", "dbo.SpeechTherapistsExaminationEntities", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ChildrenCards", "SpeechTherapistsExaminationId", "dbo.SpeechTherapistsExaminationEntities");
            DropForeignKey("dbo.SpeechTherapistsExaminationEntities", "DoctorsId", "dbo.AspNetUsers");
            DropIndex("dbo.SpeechTherapistsExaminationEntities", new[] { "DoctorsId" });
            DropIndex("dbo.ChildrenCards", new[] { "SpeechTherapistsExaminationId" });
            DropColumn("dbo.ChildrenCards", "SpeechTherapistsExaminationId");
            DropTable("dbo.SpeechTherapistsExaminationEntities");
        }
    }
}
