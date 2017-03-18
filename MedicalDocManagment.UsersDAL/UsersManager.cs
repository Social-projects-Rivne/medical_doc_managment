using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace MedicalDocManagment.UsersDAL
{
    public class UsersManager : UserManager<User>
    {
        public UsersManager(IUserStore<User> store)
            : base(store)
        {
        }
        public static UsersManager Create(IdentityFactoryOptions<UsersManager> options,
                                                IOwinContext context)
        {
            var db = context.Get<UsersContext>();
            var manager = new UsersManager(new UserStore<User>(db));
            return manager;
        }
    }
}
