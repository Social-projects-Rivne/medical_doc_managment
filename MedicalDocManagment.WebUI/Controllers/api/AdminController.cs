using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

using MedicalDocManagment.UsersDAL;
using MedicalDocManagment.WebUI.Helpers;
using MedicalDocManagment.WebUI.Models;

namespace MedicalDocManagment.WebUI.Controllers.Api
{
    public class AdminController : ApiController
    {
        private UsersManager UsersManager => HttpContext.Current
                                                        .GetOwinContext()
                                                        .GetUserManager<UsersManager>();

        [HttpGet]
        public IHttpActionResult GetUsers()
        {
            return Ok(UsersManager.Users.ToList());
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetUser(string id)
        {
            var user = await UsersManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost]
        public async Task<IHttpActionResult> AddUser(UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = UserHelpers.ConvertUserModelToUser(userModel);
            user.IsActive = true;
            
            var result = await UsersManager.CreateAsync(user, userModel.Password);
            var errorResult = GetErrorResult(result);

            return errorResult ?? Ok(result);
        }

        [HttpPut]
        public async Task<IHttpActionResult> EditUser(UserEditModel userEditModel)
        {
            var user = await UsersManager.FindByIdAsync(userEditModel.Id);

            if (user == null)
            {
                return NotFound();
            }
                           
            user.FirstName = userEditModel.FirstName;
            user.LastName = userEditModel.LastName;
            user.SecondName = userEditModel.SecondName;
            user.Position = userEditModel.Position;
            user.IsActive = userEditModel.IsActive;

            var result = await UsersManager.UpdateAsync(user);

            return Ok(result);
        }
        
		    [HttpDelete]
        public async Task<HttpResponseMessage> DeleteUser(string id)
        {
            var user = await UsersManager.FindByIdAsync(id);
            if (user != null)
            {
                if (!user.IsActive)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new HttpError("User already deleted."));
                }
                user.IsActive = false;
                var result = await UsersManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return  Request.CreateResponse(HttpStatusCode.OK, "User successfully deleted.");
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User was not deleted.Internal error in database.");
            }
            return  Request.CreateResponse(HttpStatusCode.NotFound, "User not found.");
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }
            if (result.Succeeded)
            {
                return null;
            }
            if (result.Errors != null)
            {
                foreach (var error in result.Errors)
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
    }
}
