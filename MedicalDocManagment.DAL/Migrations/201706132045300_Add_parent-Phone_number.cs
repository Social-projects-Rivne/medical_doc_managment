namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_parentPhone_number : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Parents", "Phone", c => c.String(maxLength: 16));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Parents", "Phone", c => c.String(maxLength: 12));
        }
    }
}
