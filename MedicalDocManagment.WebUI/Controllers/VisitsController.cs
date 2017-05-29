using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using MedicalDocManagement.BLL.Services;
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagment.WebUI.Helpers;
using MedicalDocManagment.WebUI.Models.Main;
using MedicalDocManagment.WebUI.Models.Validators;

namespace MedicalDocManagment.WebUI.Controllers
{
    public class VisitsController : ApiController
    {
        private readonly IVisitsService _visitsService;

        public VisitsController()
        {
            _visitsService = new VisitsService();
        }

        [HttpPost]
        [Authorize]
        public async Task<HttpResponseMessage> CreateVisit(CreateVisitVM visitModel)
        {
            var createVisitValidator = new CreateVisitValidator();
            var fluentValidationResult = createVisitValidator.Validate(visitModel);
            if (!fluentValidationResult.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, fluentValidationResult.Errors);
            }

            var visitDTO = CreateVisitHelper.VMToDTO(visitModel);
            try
            {
                var result = await _visitsService.CreateVisit(visitDTO);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception);
            }
        }

        [HttpGet]
        [Authorize]
        public IHttpActionResult GetVisitsByPatientId(int id)
        {
            var result = _visitsService.GetVisitsByPatientId(id);

            return Ok(result);
        }

    }
}
