using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Net.Http;
using System.Net;

using MedicalDocManagment.UsersDAL;
using MedicalDocManagment.WebUI.Helpers;
using MedicalDocManagment.WebUI.Models;
using System.Collections.Generic;
using MedicalDocManagment.UsersDAL.Entities;
using System.Text;

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
        public IHttpActionResult GetPaged(int pageNumber = 1, int pageSize = 20)
        {
            int skip = (pageNumber - 1) * pageSize;
            int total = UsersManager.Users.Count();
            var users = UsersManager.Users
                                    .OrderBy(c => c.Id)
                                    .Skip(skip)
                                    .Take(pageSize)
                                    .ToList();

            return Ok(new PagedResultHelper<User>(users, pageNumber, pageSize, total));
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
            user.PositionId = userModel.PositionId;
            user.IsActive = true;
            var result = await UsersManager.CreateAsync(user, userModel.Password);
            var errorResult = GetErrorResult(result);

            return errorResult ?? Ok(result);
        }


        [HttpPut]
        public async Task<HttpResponseMessage> EditUser(string id, UserEditModel userEditModel)
        {
            var user = await UsersManager.FindByIdAsync(id);

            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, $"User wasn't found with ID {id}.");
            }

            user.PositionId = userEditModel.PositionId;
            user.UserName = userEditModel.UserName;
            user.Email = userEditModel.Email;
            user.FirstName = userEditModel.FirstName;
            user.LastName = userEditModel.LastName;
            user.SecondName = userEditModel.SecondName;
            user.IsActive = userEditModel.IsActive;

            var identityResult = await UsersManager.UpdateAsync(user);

            var identityErrors = _getErrorIdentityResult(identityResult);

            if (identityErrors != null)
            {
                return identityErrors;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        private HttpResponseMessage _getErrorIdentityResult(IdentityResult result)
        {

            if (result == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Error occured on the server");
            }

            if (result.Errors.Any())
            {
                StringBuilder errorsReport = new StringBuilder();

                foreach (var error in result.Errors)
                {
                    errorsReport.Append(error + "; ");
                }

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, errorsReport.ToString());
            }

            return null;
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
                    return Request.CreateResponse(HttpStatusCode.OK, "User successfully deleted.");
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User was not deleted.Internal error in database.");
            }
            return Request.CreateResponse(HttpStatusCode.NotFound, "User not found.");
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetUserByName(string userName)
        {
            var user = await UsersManager.FindByNameAsync(userName);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetUserByEmail(string email)
        {
            var user = await UsersManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet]
        public IHttpActionResult GetUsersByPosition(int positionId)
        {
            var users = UsersManager.Users.Where(user => user.PositionId == positionId).ToList();

            if (!users.Any())
            {
                return NotFound();
            }

            return  Ok(users);
        }

        [HttpGet]
        public IHttpActionResult GetUsersByPosition(string positionName)
        {
            var users = UsersManager.Users.Where(user => user.Position.Name == positionName).ToList();

            if (!users.Any())
            {
                return NotFound();
            }

            return Ok(users);
        }

        [HttpGet]
        public IHttpActionResult GetUsersByStatus(bool userStatus)
        {
            var users = UsersManager.Users.Where(user => user.IsActive == userStatus).ToList();

            if (!users.Any())
            {
                return NotFound();
            }

            return Ok(users);
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

        #region Position's methods

        [HttpGet]
        public IHttpActionResult GetPositions()
        {
            var positions = _GetPositions();
            if (positions.Any())
            {
                //TODO fix this using AutoMapper
                return Ok(positions.Select(p => new { p.PositionId, p.Name}).ToList());
            }

            return NotFound();
        }

        [HttpGet]
        public IHttpActionResult GetPosition(int id)
        {
            var position = _GetPositionById(id);
            if (position != null)
            {
                return Ok(position);
            }

            return NotFound();
        }

        private List<Position> _GetPositions()
        {
            List<Position> positions = null;
            using (var usersContext = new UsersContext())
            {
                positions = usersContext.Positions.ToList();
            }

            return positions;
        }

        private Position _GetPositionById(int id)
        {
            Position position = null;
            using (var usersContext = new UsersContext())
            {
                position = usersContext.Positions.FirstOrDefault(p => p.PositionId == id);
            }

            return position;
        }

        #endregion

    }
}
