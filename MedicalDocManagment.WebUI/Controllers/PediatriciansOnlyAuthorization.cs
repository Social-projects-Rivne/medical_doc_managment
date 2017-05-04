using MedicalDocManagement.BLL.Services;
using MedicalDocManagement.BLL.Services.Abstract;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace MedicalDocManagment.WebUI.Controllers
{
    public class PediatriciansOnlyAuthorization : AuthorizationFilterAttribute
    {
        private readonly IUsersService _usersService;

        public PediatriciansOnlyAuthorization()
        {
            _usersService = new UsersService();
        }

        public override void OnAuthorization(HttpActionContext httpActionContext)
        {
            base.OnAuthorization(httpActionContext);
            if (httpActionContext.Response == null)
            {
                var positionName = _usersService.GetPositionByUserName(
                    HttpContext.Current.User.Identity.Name);

                if (positionName != "педіатр")
                {
                    httpActionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                }
            }
        }
    }
}