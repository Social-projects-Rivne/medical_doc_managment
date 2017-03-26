using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

using MedicalDocManagment.UsersDAL;
using MedicalDocManagment.WebUI.Helpers;
using MedicalDocManagment.WebUI.Models;
using System.Collections.Generic;
using MedicalDocManagment.UsersDAL.Entities;

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
            user.PositionId = userModel.PositionId;
            user.IsActive = true;
            var result = await UsersManager.CreateAsync(user, userModel.Password);
            var errorResult = GetErrorResult(result);

            return errorResult ?? Ok(result);
        }


        [HttpPut]
        public async Task<IHttpActionResult> EditUser(UserEditModel userEditModel)
        {
            var user = await UsersManager.FindByIdAsync(userEditModel.Id);
            Position newPosition = null;

            if (user == null)
            {
                return NotFound();
            }

            newPosition = _GetPositionById(userEditModel.Position.PositionId);

            if (newPosition != null)
            {
                user.Position = newPosition;
            }

            user.FirstName = userEditModel.FirstName;
            user.LastName = userEditModel.LastName;
            user.SecondName = userEditModel.SecondName;
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
                    return Request.CreateResponse(HttpStatusCode.OK, "User successfully deleted.");
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User was not deleted.Internal error in database.");
            }
            return Request.CreateResponse(HttpStatusCode.NotFound, "User not found.");
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
