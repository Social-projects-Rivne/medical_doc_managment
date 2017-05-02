namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Featurefill_form_psychiatrist : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ChildrenCards", "PsychiatristsConclusion", c => c.String(maxLength: 2260));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ChildrenCards", "PsychiatristsConclusion");
        }
    }
}
