using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using MedicalDocManagment.DAL.Entities;

namespace MedicalDocManagment.DAL.Manager
{
    public class RolesManager : RoleManager<Role>
    {
        public RolesManager(IRoleStore<Role, string> roleStore)
                : base(roleStore)
        {
        }
        public static RolesManager Create(IdentityFactoryOptions<RolesManager> options,
                                                IOwinContext context)
        {
            var db = context.Get<Context>();
            var rolesManager = new RolesManager(new RoleStore<Role>(db));
            return rolesManager;
        }
    }
}
