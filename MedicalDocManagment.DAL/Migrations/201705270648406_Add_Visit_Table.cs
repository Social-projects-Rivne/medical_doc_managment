namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Visit_Table : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Visits",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PatientId = c.Int(nullable: false),
                        DoctorId = c.String(maxLength: 128),
                        Date = c.DateTime(nullable: false),
                        Summary = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.DoctorId)
                .ForeignKey("dbo.ChildrenCards", t => t.PatientId, cascadeDelete: true)
                .Index(t => t.PatientId)
                .Index(t => t.DoctorId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Visits", "PatientId", "dbo.ChildrenCards");
            DropForeignKey("dbo.Visits", "DoctorId", "dbo.AspNetUsers");
            DropIndex("dbo.Visits", new[] { "DoctorId" });
            DropIndex("dbo.Visits", new[] { "PatientId" });
            DropTable("dbo.Visits");
        }
    }
}
