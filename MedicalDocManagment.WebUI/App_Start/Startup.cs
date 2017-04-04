using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.AspNet.Identity;
using MedicalDocManagment.UsersDAL;

[assembly: OwinStartup(typeof(MedicalDocManagment.Startup))]

namespace MedicalDocManagment
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.CreatePerOwinContext<UsersContext>(UsersContext.Create);
            app.CreatePerOwinContext<UsersManager>(UsersManager.Create);
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login"),
            });
        }
    }
}