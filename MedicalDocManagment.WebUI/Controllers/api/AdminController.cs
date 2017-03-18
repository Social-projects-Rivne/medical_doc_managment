using MedicalDocManagment.UsersDAL;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MedicalDocManagment.WebUI.Controllers.api
{
    public class AdminController : ApiController
    {
        private UsersManager UsersManager = HttpContext.Current.GetOwinContext().GetUserManager<UsersManager>();

        [HttpGet]
        public IHttpActionResult GetUsers()
        {
            return Ok(UsersManager.Users.ToList());
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            var user = await UsersManager.FindByIdAsync(id.ToString());

            if (user == null)
                return NotFound();

             return Ok(user);
        }

    }
}
