using MedicalDocManagment.MainAppDAL.Entities;
using MedicalDocManagment.MainAppDAL.Initializer;
using System.Data.Entity;

namespace MedicalDocManagment.MainAppDAL
{
    public class MainAppContext : DbContext
    {
        public DbSet<ChildCard> ChildrenCards { get; set; }
        public DbSet<Diagnosis> Diagnoses { get; set; }
        public DbSet<Parent> Parents { get; set; }
        public DbSet<ParentChildCard> ParentsChildrenCards { get; set; }

        static MainAppContext()
        {
            Database.SetInitializer(new MainAppInitializer());
        }

        public MainAppContext() : base("UsersDb") { }
    }
}
