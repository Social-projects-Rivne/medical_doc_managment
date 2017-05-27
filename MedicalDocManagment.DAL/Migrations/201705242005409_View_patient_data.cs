namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class View_patient_data : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ChildrenCards", "CardNumber", c => c.String(maxLength: 10));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ChildrenCards", "CardNumber");
        }
    }
}
