namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_BlockMkh_table_and_relationship : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BlockMkhs",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(maxLength: 200),
                        ClassId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ClassMkhs", t => t.ClassId)
                .Index(t => t.ClassId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BlockMkhs", "ClassId", "dbo.ClassMkhs");
            DropIndex("dbo.BlockMkhs", new[] { "ClassId" });
            DropTable("dbo.BlockMkhs");
        }
    }
}
