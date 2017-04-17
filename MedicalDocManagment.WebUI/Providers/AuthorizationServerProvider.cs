using Microsoft.Owin.Security.OAuth;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;
using MedicalDocManagment.DAL.Repository;
using System.Collections.Generic;
using MedicalDocManagment.DAL.Entities;
using System.Linq;
using Microsoft.Owin.Security;

namespace MedicalDocManagment.WebUI.Providers
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (var pair in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(new KeyValuePair<string, object>(pair.Key, pair.Value));
            }

            return Task.FromResult<object>(null);
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            User user;
            ClaimsIdentity oAuthIdentity;
            using (var unitOfWork = new UnitOfWork())
            {
                user = await unitOfWork.UsersManager.FindAsync(context.UserName, context.Password);
                oAuthIdentity = await unitOfWork.UsersManager.CreateIdentityAsync(user, context.Options.AuthenticationType);
            }
            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }

            var roles = oAuthIdentity.Claims.Where(c => c.Type == ClaimTypes.Role).ToList();
            AuthenticationProperties properties = CreateProperties(user.UserName, Newtonsoft.Json.JsonConvert.SerializeObject(roles.Select(x => x.Value)));

            AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
            context.Validated(ticket);

        }
        public static AuthenticationProperties CreateProperties(string userName, string Roles)
        {
            var data = new Dictionary<string, string>
            {
                { "userName", userName },
                { "roles", Roles }
            };
            return new AuthenticationProperties(data);
        }
    }
}