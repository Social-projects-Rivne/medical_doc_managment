namespace MedicalDocManagment.UsersDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Fix_wrong_relationship_between_user_and_position : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AspNetUsers", "Position_Id", "dbo.Positions");
            DropForeignKey("dbo.AspNetUsers", "PositionId", "dbo.Positions");
            DropIndex("dbo.AspNetUsers", new[] { "Position_Id" });
            DropPrimaryKey("dbo.Positions");
            DropColumn("dbo.Positions", "Id");
            RenameColumn(table: "dbo.AspNetUsers", name: "Position_Id", newName: "PositionId");            
            AddColumn("dbo.Positions", "PositionId", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.AspNetUsers", "PositionId", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.Positions", "PositionId");
            CreateIndex("dbo.AspNetUsers", "PositionId");
            AddForeignKey("dbo.AspNetUsers", "PositionId", "dbo.Positions", "PositionId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            AddColumn("dbo.Positions", "Id", c => c.Int(nullable: false, identity: true));
            DropForeignKey("dbo.AspNetUsers", "PositionId", "dbo.Positions");
            DropIndex("dbo.AspNetUsers", new[] { "PositionId" });
            DropPrimaryKey("dbo.Positions");
            AlterColumn("dbo.AspNetUsers", "PositionId", c => c.Int());
            DropColumn("dbo.Positions", "PositionId");
            AddPrimaryKey("dbo.Positions", "Id");
            RenameColumn(table: "dbo.AspNetUsers", name: "PositionId", newName: "Position_Id");
            CreateIndex("dbo.AspNetUsers", "Position_Id");
            AddForeignKey("dbo.AspNetUsers", "PositionId", "dbo.Positions", "PositionId", cascadeDelete: true);
            AddForeignKey("dbo.AspNetUsers", "Position_Id", "dbo.Positions", "Id");
        }
    }
}
