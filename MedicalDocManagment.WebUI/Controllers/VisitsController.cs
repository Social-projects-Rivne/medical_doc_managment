using MedicalDocManagement.BLL.Services;
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagment.DAL.Repository;
using MedicalDocManagment.DAL.Repository.Interfaces;
using MedicalDocManagment.WebUI.Helpers;
using MedicalDocManagment.WebUI.Models.Main;
using System.Web.Http;


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
        public IHttpActionResult CreateVisit(CreateVisitVM visitModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var visitDTO = CreateVisitHelper.VMToDTO(visitModel);
            var result = _visitsService.CreateVisit(visitDTO);

            return Ok(result);
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
