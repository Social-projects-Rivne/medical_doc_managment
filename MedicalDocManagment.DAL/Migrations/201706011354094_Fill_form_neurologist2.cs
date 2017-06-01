namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Fill_form_neurologist2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.NeurologistsExaminations", "DiagnosisId", c => c.String(maxLength: 128));
            CreateIndex("dbo.NeurologistsExaminations", "DiagnosisId");
            AddForeignKey("dbo.NeurologistsExaminations", "DiagnosisId", "dbo.DiagnosesMkh", "Id");
            DropColumn("dbo.NeurologistsExaminations", "Diagnosis");
        }
        
        public override void Down()
        {
            AddColumn("dbo.NeurologistsExaminations", "Diagnosis", c => c.String(maxLength: 1477));
            DropForeignKey("dbo.NeurologistsExaminations", "DiagnosisId", "dbo.DiagnosesMkh");
            DropIndex("dbo.NeurologistsExaminations", new[] { "DiagnosisId" });
            DropColumn("dbo.NeurologistsExaminations", "DiagnosisId");
        }
    }
}
