namespace MedicalDocManagment.DAL.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class Fill_form_neurologist1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.NeurologistsExaminations", "NeurologicalState_HeadCircumference", c => c.Single(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.NeurologistsExaminations", "NeurologicalState_HeadCircumference", c => c.String(maxLength: 17));
        }
    }
}
