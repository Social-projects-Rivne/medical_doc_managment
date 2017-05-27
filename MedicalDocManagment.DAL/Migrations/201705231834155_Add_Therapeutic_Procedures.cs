namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Therapeutic_Procedures : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Rehabilitations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BeginDate = c.DateTime(nullable: false),
                        Count = c.Int(nullable: false),
                        Commentary = c.String(),
                        TherapeuticProcedure_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TherapeuticProcedure", t => t.TherapeuticProcedure_Id)
                .Index(t => t.TherapeuticProcedure_Id);
            
            CreateTable(
                "dbo.TherapeuticProcedure",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProcedureCaption = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RehabilitationChildCards",
                c => new
                    {
                        Rehabilitation_Id = c.Int(nullable: false),
                        ChildCard_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Rehabilitation_Id, t.ChildCard_Id })
                .ForeignKey("dbo.Rehabilitations", t => t.Rehabilitation_Id, cascadeDelete: true)
                .ForeignKey("dbo.ChildrenCards", t => t.ChildCard_Id, cascadeDelete: true)
                .Index(t => t.Rehabilitation_Id)
                .Index(t => t.ChildCard_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Rehabilitations", "TherapeuticProcedure_Id", "dbo.TherapeuticProcedure");
            DropForeignKey("dbo.RehabilitationChildCards", "ChildCard_Id", "dbo.ChildrenCards");
            DropForeignKey("dbo.RehabilitationChildCards", "Rehabilitation_Id", "dbo.Rehabilitations");
            DropIndex("dbo.RehabilitationChildCards", new[] { "ChildCard_Id" });
            DropIndex("dbo.RehabilitationChildCards", new[] { "Rehabilitation_Id" });
            DropIndex("dbo.Rehabilitations", new[] { "TherapeuticProcedure_Id" });
            DropTable("dbo.RehabilitationChildCards");
            DropTable("dbo.TherapeuticProcedure");
            DropTable("dbo.Rehabilitations");
        }
    }
}
