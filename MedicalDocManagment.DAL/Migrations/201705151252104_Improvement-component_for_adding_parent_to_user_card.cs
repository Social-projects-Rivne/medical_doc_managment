namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Improvementcomponent_for_adding_parent_to_user_card : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Parents", "Work", c => c.String(maxLength: 100));
            AlterColumn("dbo.Parents", "Phone", c => c.String(maxLength: 12));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Parents", "Phone", c => c.String());
            AlterColumn("dbo.Parents", "Work", c => c.String());
        }
    }
}
