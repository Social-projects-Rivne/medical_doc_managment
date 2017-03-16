using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MedicalDocManagment.UsersDAL
{
    public class UsersContext : IdentityDbContext<User>
    {
        public UsersContext() : base("UsersDb") { }

        public static UsersContext Create()
        {
            return new UsersContext();
        }
    }
}
