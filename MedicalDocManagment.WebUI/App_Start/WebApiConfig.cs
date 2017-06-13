using FluentValidation.WebApi;
using MedicalDocManagment.WebUI.ValidateFilters;
using System.Net.Http.Headers;
using System.Web.Http;

namespace MedicalDocManagment.WebUI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.Filters.Add(new ValidateModelStateFilter());
            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            FluentValidationModelValidatorProvider.Configure(config);
        }
    }
}
