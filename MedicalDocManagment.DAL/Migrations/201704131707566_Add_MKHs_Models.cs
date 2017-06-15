namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_MKHs_Models : DbMigration
    {
        public override void Up()
        {
            CreateTable(
            "dbo.ClassesMkh",
            c => new
            {
                Id = c.String(nullable: false, maxLength: 128),
                Name = c.String(maxLength: 200),
            })
            .PrimaryKey(t => t.Id);

            CreateTable(
                "dbo.BlocksMkh",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(maxLength: 200),
                        ClassId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ClassesMkh", t => t.ClassId)
                .Index(t => t.ClassId);
            
            CreateTable(
                "dbo.NosologiesMkh",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(maxLength: 200),
                        BlockId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BlocksMkh", t => t.BlockId)
                .Index(t => t.BlockId);
            
            CreateTable(
                "dbo.DiagnosesMkh",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(maxLength: 300),
                        NosologyId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.NosologiesMkh", t => t.NosologyId)
                .Index(t => t.NosologyId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.DiagnosesMkh", "NosologyId", "dbo.NosologiesMkh");
            DropForeignKey("dbo.NosologiesMkh", "BlockId", "dbo.BlocksMkh");
            DropForeignKey("dbo.BlocksMkh", "ClassId", "dbo.ClassesMkh");
            DropIndex("dbo.DiagnosesMkh", new[] { "NosologyId" });
            DropIndex("dbo.NosologiesMkh", new[] { "BlockId" });
            DropIndex("dbo.BlocksMkh", new[] { "ClassId" });
            DropTable("dbo.DiagnosesMkh");
            DropTable("dbo.NosologiesMkh");
            DropTable("dbo.ClassesMkh");
            DropTable("dbo.BlocksMkh");
        }
    }
}
