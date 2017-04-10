using System;
using System.Web.Http;

using MedicalDocManagment.MainAppDAL.Entities;
using MedicalDocManagment.MainAppDAL;

namespace MedicalDocManagment.WebUI.Controllers
{
    public class MainController : ApiController
    {
        // TODO uncomment after implementing feauture
        //[Authorize]
        [HttpPost]
        public IHttpActionResult AddPatient(ChildCard patientCard)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MainAppContext mainAppContext = new MainAppContext();

            ChildCard result = null;
            try
            { 
                result = mainAppContext.ChildrenCards.Add(patientCard);
                mainAppContext.SaveChanges();
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }

            return Ok(result);
        }
    }
}
