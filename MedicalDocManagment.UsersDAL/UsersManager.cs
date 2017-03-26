using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

using MedicalDocManagment.UsersDAL.Entities;


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
