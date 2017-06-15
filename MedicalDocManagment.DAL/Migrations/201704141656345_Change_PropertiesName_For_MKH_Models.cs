namespace MedicalDocManagment.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_PropertiesName_For_MKH_Models : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.BlocksMkh", name: "Name", newName: "BlockName");
            RenameColumn(table: "dbo.ClassesMkh", name: "Name", newName: "ClassName");
            RenameColumn(table: "dbo.NosologiesMkh", name: "Name", newName: "NosologyName");
            RenameColumn(table: "dbo.DiagnosesMkh", name: "Name", newName: "DiagnosisName");
        }
        
        public override void Down()
        {
            RenameColumn(table: "dbo.DiagnosesMkh", name: "DiagnosisName", newName: "Name");
            RenameColumn(table: "dbo.NosologiesMkh", name: "NosologyName", newName: "Name");
            RenameColumn(table: "dbo.ClassesMkh", name: "ClassName", newName: "Name");
            RenameColumn(table: "dbo.BlocksMkh", name: "BlockName", newName: "Name");
        }
    }
}
