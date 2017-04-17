namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Adding_patient_into_the_system : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.ChildrenCards", "Date", c => c.DateTime());
            AlterColumn("dbo.ChildrenCards", "CheckIn", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.ChildrenCards", "CheckIn", c => c.DateTime(nullable: false));
            AlterColumn("dbo.ChildrenCards", "Date", c => c.DateTime(nullable: false));
        }
    }
}
