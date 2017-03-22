namespace MedicalDocManagment.UsersDAL.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MedicalDocManagment.UsersDAL.UsersContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "MedicalDocManagment.UsersDAL.UsersContext";
        }

        protected override void Seed(MedicalDocManagment.UsersDAL.UsersContext context)
        {
        }
    }
}
