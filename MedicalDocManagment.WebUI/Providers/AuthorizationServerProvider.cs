using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using MedicalDocManagment.UsersDAL.Repositories.Interfaces;
using MedicalDocManagment.UsersDAL.Repositories;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;
using MedicalDocManagment.UsersDAL;
using Microsoft.AspNet.Identity.Owin;

namespace MedicalDocManagment.WebUI.Providers
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        //TODO Resolve unitOfWork disposable problem
        //private readonly IUnitOfWork _unitOfWork;
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }
        public AuthorizationServerProvider()
        {
            //_unitOfWork = new UnitOfWork();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            var _usersManager = HttpContext.Current.GetOwinContext().GetUserManager<UsersManager>();
            IdentityUser user = await _usersManager.FindAsync(context.UserName, context.Password);
            //IdentityUser user = await _unitOfWork.UsersManager.FindAsync(context.UserName, context.Password);
            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim("sub", context.UserName));
            identity.AddClaim(new Claim("role", "user"));

            context.Validated(identity);

        }
    }
}