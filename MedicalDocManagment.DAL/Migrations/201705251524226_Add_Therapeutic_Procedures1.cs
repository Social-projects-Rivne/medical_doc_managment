namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Therapeutic_Procedures1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Rehabilitations", "TherapeuticProcedure_Id", "dbo.TherapeuticProcedure");
            DropIndex("dbo.Rehabilitations", new[] { "TherapeuticProcedure_Id" });
            RenameColumn(table: "dbo.Rehabilitations", name: "TherapeuticProcedure_Id", newName: "TherapeuticProcedureId");
            AlterColumn("dbo.Rehabilitations", "TherapeuticProcedureId", c => c.Int(nullable: false));
            CreateIndex("dbo.Rehabilitations", "TherapeuticProcedureId");
            AddForeignKey("dbo.Rehabilitations", "TherapeuticProcedureId", "dbo.TherapeuticProcedure", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Rehabilitations", "TherapeuticProcedureId", "dbo.TherapeuticProcedure");
            DropIndex("dbo.Rehabilitations", new[] { "TherapeuticProcedureId" });
            AlterColumn("dbo.Rehabilitations", "TherapeuticProcedureId", c => c.Int());
            RenameColumn(table: "dbo.Rehabilitations", name: "TherapeuticProcedureId", newName: "TherapeuticProcedure_Id");
            CreateIndex("dbo.Rehabilitations", "TherapeuticProcedure_Id");
            AddForeignKey("dbo.Rehabilitations", "TherapeuticProcedure_Id", "dbo.TherapeuticProcedure", "Id");
        }
    }
}
