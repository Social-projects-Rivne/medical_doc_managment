using MedicalDocManagment.DAL.Enities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace MedicalDocManagment.DAL.Manager
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
            var db = context.Get<Context>();
            var manager = new UsersManager(new UserStore<User>(db));
            return manager;
        }
    }
}
