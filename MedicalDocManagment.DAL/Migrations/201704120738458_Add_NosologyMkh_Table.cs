namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_NosologyMkh_Table : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.NosologyMkhs",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(maxLength: 200),
                        BlockId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BlockMkhs", t => t.BlockId)
                .Index(t => t.BlockId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.NosologyMkhs", "BlockId", "dbo.BlockMkhs");
            DropIndex("dbo.NosologyMkhs", new[] { "BlockId" });
            DropTable("dbo.NosologyMkhs");
        }
    }
}
