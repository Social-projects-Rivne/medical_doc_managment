using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper;

using MedicalDocManagment.WebUI.Helpers;
using MedicalDocManagment.WebUI.Models;
using Microsoft.AspNet.Identity;
using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository.Interfaces;
using MedicalDocManagment.DAL.Repository;

namespace MedicalDocManagment.WebUI.Controllers
{
    public class AdminController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public AdminController()
        {
            _unitOfWork = new UnitOfWork();
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetUsers()
        {
            return Ok(_unitOfWork.UsersManager.Users.ToList());
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetPaged(int pageNumber = 1, int pageSize = 20)
        {
            int skip = (pageNumber - 1) * pageSize;
            int total = _unitOfWork.UsersManager.Users.Count();
            var users = _unitOfWork.UsersManager.Users
                                                .OrderBy(c => c.Id)
                                                .Skip(skip)
                                                .Take(pageSize)
                                                .ToList();

            return Ok(new PagedResultHelper<User>(users, pageNumber, pageSize, total));
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetUser(string id)
        {
            var user = await _unitOfWork.UsersManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Authorize]
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
            var result = await _unitOfWork.UsersManager.CreateAsync(user, userModel.Password);
            var errorResult = GetErrorResult(result);

            return errorResult ?? Ok(result);
        }

        [Authorize]
        [HttpPut]
        public async Task<HttpResponseMessage> EditUser(string id, UserEditModel userEditModel)
        {
            var user = await _unitOfWork.UsersManager.FindByIdAsync(userEditModel.Id);

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

            var result = await _unitOfWork.UsersManager.UpdateAsync(user);

            var identityErrors = _getErrorIdentityResult(result);

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

        [Authorize]
        [HttpDelete]
        public async Task<HttpResponseMessage> DeleteUser(string id)
        {
            var user = await _unitOfWork.UsersManager.FindByIdAsync(id);
            if (user != null)
            {
                if (!user.IsActive)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new HttpError("User already deleted."));
                }
                user.IsActive = false;
                var result = await _unitOfWork.UsersManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "User successfully deleted.");
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User was not deleted.Internal error in database.");
            }
            return Request.CreateResponse(HttpStatusCode.NotFound, "User not found.");
        }

        [Authorize]
        [HttpGet]
        public async Task<IHttpActionResult> GetUserByName(string userName)
        {
            var user = await _unitOfWork.UsersManager.FindByNameAsync(userName);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Authorize]
        [HttpGet]
        public async Task<IHttpActionResult> GetUserByEmail(string email)
        {
            var user = await _unitOfWork.UsersManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetUsersByPosition(int positionId)
        {
            var users = _unitOfWork.UsersManager.Users.Where(user => user.PositionId == positionId).ToList();

            if (!users.Any())
            {
                return NotFound();
            }

            return Ok(users);
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetUsersByPosition(string positionName)
        {
            var users = _unitOfWork.UsersManager.Users.Where(user => user.Position.Name == positionName).ToList();

            if (!users.Any())
            {
                return NotFound();
            }

            return Ok(users);
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetUsersByStatus(bool userStatus)
        {
            var users = _unitOfWork.UsersManager.Users.Where(user => user.IsActive == userStatus).ToList();

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
        [Authorize]
        [HttpGet]
        public IHttpActionResult GetPositions()
        {
            Mapper.Initialize(config => config.CreateMap<Position, PositionModel>());

            var positions = Mapper.Map<IList<Position>, List<PositionModel>>(_unitOfWork.PositionRepository.Get().ToList());

            if (positions.Any())
            {
                return Ok(positions);
            }

            return NotFound();
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetPosition(int id)
        {
            Mapper.Initialize(config => config.CreateMap<Position, PositionModel>());
            var position = Mapper.Map<Position, PositionModel>(_unitOfWork.PositionRepository.Get(p => p.PositionId == id)
                                                                                             .FirstOrDefault());
            if (position != null)
            {
                return Ok(position);
            }

            return NotFound();
        }
        #endregion

        protected override void Dispose(bool disposing)
        {
            _unitOfWork.Dispose();
            base.Dispose(disposing);
        }
    }
}
