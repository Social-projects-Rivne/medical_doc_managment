using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using AutoMapper;


using MedicalDocManagment.UsersDAL;
using MedicalDocManagment.WebUI.Helpers;
using MedicalDocManagment.WebUI.Models;
using System.Collections.Generic;
using MedicalDocManagment.UsersDAL.Entities;
using MedicalDocManagment.UsersDAL.Repositories;
using MedicalDocManagment.UsersDAL.Repositories.Abstract;


namespace MedicalDocManagment.WebUI.Controllers.Api
{
    public class AdminController : ApiController
    {
        private readonly UsersManager _usersManager;
        private readonly UsersContext _context;
        private readonly IPositionRepository _positionRepository;

        public AdminController()
        {
            _usersManager = HttpContext.Current
                                       .GetOwinContext()
                                       .GetUserManager<UsersManager>();

            _context = new UsersContext();
            _positionRepository = new PositionRepository(_context);
        }

        [HttpGet]
        public IHttpActionResult GetUsers()
        {
            return Ok(_usersManager.Users.ToList());
        }

        [HttpGet]
        public IHttpActionResult GetPaged(int pageNumber = 1, int pageSize = 20)
        {
            int skip = (pageNumber - 1) * pageSize;
            int total = _usersManager.Users.Count();
            var users = _usersManager.Users
                                    .OrderBy(c => c.Id)
                                    .Skip(skip)
                                    .Take(pageSize)
                                    .ToList();

            return Ok(new PagedResultHelper<User>(users, pageNumber, pageSize, total));
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetUser(string id)
        {
            var user = await _usersManager.FindByIdAsync(id.ToString());

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
            var result = await _usersManager.CreateAsync(user, userModel.Password);
            var errorResult = GetErrorResult(result);

            return errorResult ?? Ok(result);
        }


        [HttpPut]
        public async Task<IHttpActionResult> EditUser(UserEditModel userEditModel)
        {
            var user = await _usersManager.FindByIdAsync(userEditModel.Id);
            Position newPosition = null;

            if (user == null)
            {
                return NotFound();
            }

            //newPosition = _GetPositionById(userEditModel.Position.PositionId);

            if (newPosition != null)
            {
                user.Position = newPosition;
            }

            user.FirstName = userEditModel.FirstName;
            user.LastName = userEditModel.LastName;
            user.SecondName = userEditModel.SecondName;
            user.IsActive = userEditModel.IsActive;

            var result = await _usersManager.UpdateAsync(user);

            return Ok(result);
        }

        [HttpDelete]
        public async Task<HttpResponseMessage> DeleteUser(string id)
        {
            var user = await _usersManager.FindByIdAsync(id);
            if (user != null)
            {
                if (!user.IsActive)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new HttpError("User already deleted."));
                }
                user.IsActive = false;
                var result = await _usersManager.UpdateAsync(user);
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
            var user = await _usersManager.FindByNameAsync(userName);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetUserByEmail(string email)
        {
            var user = await _usersManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet]
        public IHttpActionResult GetUsersByPosition(int positionId)
        {
            var users = _usersManager.Users.Where(user => user.PositionId == positionId).ToList();

            if (!users.Any())
            {
                return NotFound();
            }

            return  Ok(users);
        }

        [HttpGet]
        public IHttpActionResult GetUsersByPosition(string positionName)
        {
            var users = _usersManager.Users.Where(user => user.Position.Name == positionName).ToList();

            if (!users.Any())
            {
                return NotFound();
            }

            return Ok(users);
        }

        [HttpGet]
        public IHttpActionResult GetUsersByStatus(bool userStatus)
        {
            var users = _usersManager.Users.Where(user => user.IsActive == userStatus).ToList();

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
            Mapper.Initialize(config => config.CreateMap<Position, PositionModel>());

            var positions = Mapper.Map<IList<Position>, List<PositionModel>>(_positionRepository.Get().ToList());

            if (positions.Any())
            {
                return Ok(positions);
            }

            return NotFound();
        }

        [HttpGet]
        public IHttpActionResult GetPosition(int id)
        {
            Mapper.Initialize(config => config.CreateMap<Position, PositionModel>());
            var position = Mapper.Map<Position, PositionModel>(_positionRepository.Get(p => p.PositionId == id)
                                                                                  .FirstOrDefault());
            if (position != null)
            {
                return Ok(position);
            }

            return NotFound();
        }
        #endregion
    }
}
