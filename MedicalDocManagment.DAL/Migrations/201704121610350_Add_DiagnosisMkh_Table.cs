namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_DiagnosisMkh_Table : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.DiagnosisMkhs",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(maxLength: 200),
                        NosologyId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.NosologyMkhs", t => t.NosologyId)
                .Index(t => t.NosologyId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.DiagnosisMkhs", "NosologyId", "dbo.NosologyMkhs");
            DropIndex("dbo.DiagnosisMkhs", new[] { "NosologyId" });
            DropTable("dbo.DiagnosisMkhs");
        }
    }
}
