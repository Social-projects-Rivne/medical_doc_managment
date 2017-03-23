using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

using MedicalDocManagment.UsersDAL.Entities;

namespace MedicalDocManagment.UsersDAL
{
    public class UsersContext : IdentityDbContext<User>
    {
        public DbSet<Position> Positions { get; set; }

        static UsersContext()
        {
            Database.SetInitializer(new UsersDbInitializer());
        }

        public UsersContext() : base("UsersDb") { }

        public static UsersContext Create()
        {
            return new UsersContext();
        }
    }
}
