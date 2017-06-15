using MedicalDocManagement.BLL.Services;
using MedicalDocManagement.BLL.Services.Abstract;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace MedicalDocManagment.WebUI.Controllers.CustomAttributes
{
    public class NeurologistsOnlyAuthorization : AuthorizationFilterAttribute
    {
        private readonly IUsersService _usersService;

        public NeurologistsOnlyAuthorization()
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

                if (positionName != "невролог")
                {
                    httpActionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                }
            }
        }
    }
}