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
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagement.BLL.Services;
using System;
using System.IO;
using MultipartDataMediaFormatter.Infrastructure;


namespace MedicalDocManagment.WebUI.Controllers
{
    public class AdminController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUsersService _usersService;
        private readonly IPositionsService _positionsService;

        public AdminController()
        {
            _unitOfWork = new UnitOfWork();
            _usersService = new UsersService();
            _positionsService = new PositionsService();
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetUsers()
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<UserDTO, UserIndexModel>()
                   .ForMember("Avatar", opt => opt.MapFrom(src => src.Image.ImageUrl));
                cfg.CreateMap<PositionDTO, PositionModel>();
            });
            var mapper = config.CreateMapper();
            var users = mapper.Map<IList<User>, List<UserIndexModel>>(_unitOfWork.UsersManager.Users.ToList());

            return Ok(users);
        }
       
        private async Task<string> SaveImage(HttpFile photo)
        {
            string root = System.Web.HttpContext.Current.Server.MapPath("~");
            if (!System.IO.Directory.Exists(root))
            {
                System.IO.Directory.CreateDirectory(root);
            }

            byte[] fileArray = photo.Buffer;
            var filename = photo.FileName;
            string guid = Guid.NewGuid().ToString();
            string path = $"/Files/{guid + Path.GetExtension(filename)}";
            
            using (System.IO.FileStream fs = new System.IO.FileStream(root+path
                , System.IO.FileMode.Create))
            {
                await fs.WriteAsync(fileArray, 0, fileArray.Length);
            }
            return path;
        }
        [Authorize]
        [HttpGet]
        public IHttpActionResult GetPaged(int pageNumber = 1, int pageSize = 20)
        {
            var usersPagedDTO = _usersService.GetPaged(pageNumber, pageSize);
            int total = _usersService.GetUsersCount();
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<UserDTO, UserIndexModel>()
                   .ForMember("Avatar", opt => opt.MapFrom(src => src.Image.ImageUrl));
                cfg.CreateMap<PositionDTO, PositionModel>();
            });
            var mapper = config.CreateMapper();
            var usersMapped = mapper.Map<IList<UserDTO>, List<UserIndexModel>>(usersPagedDTO);

            return Ok(new PagedResultHelper<UserIndexModel>(usersMapped, pageNumber, pageSize, total));
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetUser(string id)
        {
            Mapper.Initialize(config => {
                config.CreateMap<User, UserIndexModel>()
                      .ForMember("Avatar", opt => opt.MapFrom(src => src.Image.ImageUrl));
                config.CreateMap<Position, PositionModel>();
            });
            var user = await _unitOfWork.UsersManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<User, UserIndexModel>(user));
        }

        [Authorize]
        [HttpPost]
        public async Task<IHttpActionResult> AddUser(UserCreateModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            string imagePath = "/Files/no-image.png";
            if (userModel.Content!=null)
            {
                if (!ImageHelper.IsImage(userModel.Content))
                {
                    return BadRequest("Image is not valid.");
                }
                imagePath = await SaveImage(userModel.Content);
                var imageSize = userModel.Content.Buffer.Length;
                if (!ImageHelper.IsImageValid(imagePath, imageSize))
                {
                    var imageMappedPath = System.Web.HttpContext.Current.Server.MapPath(imagePath);
                    if (File.Exists(imageMappedPath))
                    {
                        File.Delete(imageMappedPath);
                    }
                    return BadRequest("Image is not valid.");
                }
            }
            var user = UserHelpers.ConvertUserModelToUser(userModel);
            user.PositionId = userModel.PositionId;
            user.IsActive = true;
            user.Image = new Image { ImageUrl = imagePath };
            
            var result = await _unitOfWork.UsersManager.CreateAsync(user, userModel.Password);
            _unitOfWork.UsersManager.AddToRole(user.Id, "user");

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
            string imagePath = String.Empty;
            if (userEditModel.Content != null)
            {
                if (!ImageHelper.IsImage(userEditModel.Content))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Image is not valid.");
                }
                imagePath = await SaveImage(userEditModel.Content);
                var imageSize = userEditModel.Content.Buffer.Length;
                if (!ImageHelper.IsImageValid(imagePath, imageSize))
                {
                    var imageMappedPath = System.Web.HttpContext.Current.Server.MapPath(imagePath);
                    if (File.Exists(imageMappedPath))
                    {
                        File.Delete(imageMappedPath);
                    }
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Image is not valid.");
                }
            }
            user.PositionId = userEditModel.PositionId;
            user.UserName = userEditModel.UserName;
            user.Email = userEditModel.Email;
            user.FirstName = userEditModel.FirstName;
            user.LastName = userEditModel.LastName;
            user.SecondName = userEditModel.SecondName;
            user.IsActive = userEditModel.IsActive;
            if(imagePath != String.Empty)
            {
                user.Image.ImageUrl = imagePath;
            }

            var result = await _unitOfWork.UsersManager.UpdateAsync(user);

            var identityErrors = _getErrorIdentityResult(result);

            if (identityErrors != null)
            {
                return identityErrors;
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { Avatar = user.Image.ImageUrl });
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
            Mapper.Initialize(config => {
                config.CreateMap<User, UserIndexModel>()
                      .ForMember("Avatar", opt => opt.MapFrom(src => src.Image.ImageUrl));
                config.CreateMap<Position, PositionModel>();
            });
            var user = await _unitOfWork.UsersManager.FindByNameAsync(userName);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<User, UserIndexModel>(user));
        }

        [Authorize]
        [HttpGet]
        public async Task<IHttpActionResult> GetUserByEmail(string email)
        {
            Mapper.Initialize(config => {
                config.CreateMap<User, UserIndexModel>()
                      .ForMember("Avatar", opt => opt.MapFrom(src => src.Image.ImageUrl));
                config.CreateMap<Position, PositionModel>();
            });
            var user = await _unitOfWork.UsersManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<User, UserIndexModel>(user));
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetUsersByPosition(int positionId)
        {
            Mapper.Initialize(config => {
                config.CreateMap<User, UserIndexModel>()
                      .ForMember("Avatar", opt => opt.MapFrom(src => src.Image.ImageUrl));
                config.CreateMap<Position, PositionModel>();
            });
            var users = _unitOfWork.UsersManager.Users.Where(user => user.PositionId == positionId).ToList();

            if (!users.Any())
            {
                return NotFound();
            }

            return Ok(Mapper.Map<IList<User>, List<UserIndexModel>>(users));
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetUsersByPosition(string positionName)
        {
            Mapper.Initialize(config => {
                config.CreateMap<User, UserIndexModel>()
                      .ForMember("Avatar", opt => opt.MapFrom(src => src.Image.ImageUrl));
                config.CreateMap<Position, PositionModel>();
            });
            var users = _unitOfWork.UsersManager.Users.Where(user => user.Position.Name == positionName).ToList();

            if (!users.Any())
            {
                return NotFound();
            }

            return Ok(Mapper.Map<IList<User>, List<UserIndexModel>>(users));
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetUsersByStatus(bool userStatus)
        {
            Mapper.Initialize(config => {
                config.CreateMap<User, UserIndexModel>()
                      .ForMember("Avatar", opt => opt.MapFrom(src => src.Image.ImageUrl));
                config.CreateMap<Position, PositionModel>();
            });
            var users = _unitOfWork.UsersManager.Users.Where(user => user.IsActive == userStatus).ToList();

            if (!users.Any())
            {
                return NotFound();
            }

            return Ok(Mapper.Map<IList<User>, List<UserIndexModel>>(users));
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
            var positionsDTO = _positionsService.GetPositions();

            if (positionsDTO.Any())
            {
                var positionsMapped = PositionMapHelper.DTOsToVMs(positionsDTO);
                return Ok(positionsMapped);
            }

            return NotFound();
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetPosition(int id)
        {
            var position = _positionsService.GetPosition(id);

            if(position != null)
            {
                var positionMapped = PositionMapHelper.DTOToVM(position);
                return Ok(position);
                
            }

            return NotFound();
        }
        #endregion

        protected override void Dispose(bool disposing)
        {
            //_unitOfWork.Dispose();
            //base.Dispose(disposing);
        }
    }
}
