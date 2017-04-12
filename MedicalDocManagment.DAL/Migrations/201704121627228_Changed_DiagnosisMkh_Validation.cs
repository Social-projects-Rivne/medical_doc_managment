namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Changed_DiagnosisMkh_Validation : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.DiagnosisMkhs", "Name", c => c.String(maxLength: 300));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.DiagnosisMkhs", "Name", c => c.String(maxLength: 200));
        }
    }
}
