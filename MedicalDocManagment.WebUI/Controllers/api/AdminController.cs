using MedicalDocManagment.UsersDAL;
using MedicalDocManagment.WebUI.Models;
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

        [HttpPost]
        public async Task<IHttpActionResult> AddUser(UserViewModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = new User
            {
                UserName = userModel.UserName,
                Email = userModel.Email,
                FirstName = userModel.FirstName,
                SecondName = userModel.SecondName,
                LastName = userModel.LastName,
                Position = userModel.Position,
                IsActive = true
            };
            IdentityResult result = await UsersManager.CreateAsync(user, userModel.Password);
            IHttpActionResult errorResult = GetErrorResult(result);
            if (errorResult != null)
            {
                return errorResult;
            }
            return Ok(result);
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }
                if (ModelState.IsValid)
                {
                    // If no ModelState errors are available to send, just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        [HttpPut]
        public async Task<IHttpActionResult> EditUser(UserEditViewModel userModel)
        {
            var userInDb = await UsersManager.FindByIdAsync(userModel.Id.ToString());

            if (userInDb == null)
                return NotFound();

            userInDb.FirstName = userModel.FirstName;
            userInDb.LastName = userModel.LastName;
            userInDb.SecondName = userModel.SecondName;
            userInDb.Position = userModel.Position;
            userInDb.IsActive = userModel.IsActive;

            var result = await UsersManager.UpdateAsync(userInDb);
            return Ok(result);
        }
        
    }
}
