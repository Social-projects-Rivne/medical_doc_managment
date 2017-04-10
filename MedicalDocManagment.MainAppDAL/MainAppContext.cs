using MedicalDocManagment.MainAppDAL.Entities;
using MedicalDocManagment.MainAppDAL.Initializer;
using System.Data.Entity;

namespace MedicalDocManagment.MainAppDAL
{
    public class MainAppContext : DbContext
    {
        public DbSet<Parent> Parents { get; set; }
        public DbSet<ChildCard> ChildrenCards { get; set; }

        static MainAppContext()
        {
            Database.SetInitializer(new MainAppInitializer());
        }

        public MainAppContext() : base("UsersDb") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Parent>()
                 .HasMany(parent => parent.ChildrenCards)
                 .WithMany(childCard => childCard.Parents)
                 .Map(parentChild =>
                 {
                     parentChild.MapLeftKey("id_parent");
                     parentChild.MapRightKey("id_child");
                     parentChild.ToTable("ParentChild");
                 });
        }
    }
}
