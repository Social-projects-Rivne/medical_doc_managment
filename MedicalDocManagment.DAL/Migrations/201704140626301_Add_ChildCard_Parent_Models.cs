namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_ChildCard_Parent_Models : DbMigration
    {
        public override void Up()
        {

            CreateTable(
            "dbo.Parents",
            c => new
            {
                Id = c.Int(nullable: false, identity: true),
                FirstName = c.String(maxLength: 100),
                SecondName = c.String(maxLength: 100),
                LastName = c.String(maxLength: 100),
                Work = c.String(),
                Phone = c.String(),
            })
            .PrimaryKey(t => t.Id);

            CreateTable(
                "dbo.ChildrenCards",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(maxLength: 100),
                        SecondName = c.String(maxLength: 100),
                        LastName = c.String(maxLength: 100),
                        Date = c.DateTime(nullable: false),
                        Address = c.String(),
                        CheckIn = c.DateTime(nullable: false),
                        CheckOut = c.DateTime(),
                        DiagnosisId = c.String(maxLength: 128),
                        Prescription = c.String(),
                        DirectedBy = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.DiagnosesMkh", t => t.DiagnosisId)
                .Index(t => t.DiagnosisId);
            
            CreateTable(
                "dbo.ParentChild",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ParentId = c.Int(nullable: false),
                        ChildId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ChildrenCards", t => t.ChildId, cascadeDelete: true)
                .ForeignKey("dbo.Parents", t => t.ParentId, cascadeDelete: true)
                .Index(t => t.ParentId)
                .Index(t => t.ChildId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ParentChild", "ParentId", "dbo.Parents");
            DropForeignKey("dbo.ParentChild", "ChildId", "dbo.ChildrenCards");
            DropForeignKey("dbo.ChildrenCards", "DiagnosisId", "dbo.DiagnosesMkh");
            DropIndex("dbo.ParentChild", new[] { "ChildId" });
            DropIndex("dbo.ParentChild", new[] { "ParentId" });
            DropIndex("dbo.ChildrenCards", new[] { "DiagnosisId" });
            DropTable("dbo.Parents");
            DropTable("dbo.ParentChild");
            DropTable("dbo.ChildrenCards");
        }
    }
}
