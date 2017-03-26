namespace MedicalDocManagment.UsersDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_constraint_for_position_name : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Positions", "PositionName", c => c.String(maxLength: 128));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Positions", "PositionName", c => c.String());
        }
    }
}
