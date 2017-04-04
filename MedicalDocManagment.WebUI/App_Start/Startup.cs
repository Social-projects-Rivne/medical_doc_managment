using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.AspNet.Identity;
using MedicalDocManagment.UsersDAL;
using Microsoft.Owin.Security.OAuth;
using System;
using MedicalDocManagment.WebUI.Providers;

[assembly: OwinStartup(typeof(MedicalDocManagment.Startup))]

namespace MedicalDocManagment
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            
            app.CreatePerOwinContext<UsersContext>(UsersContext.Create);
            app.CreatePerOwinContext<UsersManager>(UsersManager.Create);
            ConfigureOAuth(app);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            //app.UseCookieAuthentication(new CookieAuthenticationOptions
            //{
            //    AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
            //    LoginPath = new PathString("/Account/Login"),
            //});
        }
        public void ConfigureOAuth(IAppBuilder app)
        {
            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new AuthorizationServerProvider()
            };

            // Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

        }
    }
}