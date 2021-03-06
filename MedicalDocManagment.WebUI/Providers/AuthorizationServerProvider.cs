﻿using Microsoft.Owin.Security.OAuth;
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
            else if(!user.IsActive)
            {
                context.SetError("invalid_grant", "The user was deleted.");
                return;
            }

            var roles = oAuthIdentity.Claims.Where(c => c.Type == ClaimTypes.Role).ToList();
            AuthenticationProperties properties = CreateProperties(user.UserName, Newtonsoft.Json.JsonConvert.SerializeObject(roles.Select(x => x.Value)));
            properties.Dictionary.Add("position", user.Position.Name);
            properties.Dictionary.Add("positionId", user.Position.PositionId.ToString());
            properties.Dictionary.Add("id", user.Id);
            properties.Dictionary.Add("firstName", user.FirstName != null ? user.FirstName : "");
            properties.Dictionary.Add("secondName", user.SecondName != null ? user.SecondName : "");
            properties.Dictionary.Add("lastName", user.LastName != null ? user.LastName : "");
            properties.Dictionary.Add("email", user.Email);
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