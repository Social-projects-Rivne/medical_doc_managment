using System;
using System.Web.Http;

using MedicalDocManagment.MainAppDAL.Entities;
using MedicalDocManagment.MainAppDAL;
using MedicalDocManagment.WebUI.Models;

namespace MedicalDocManagment.WebUI.Controllers
{
    public class MainController : ApiController
    {
        // TODO uncomment after implementing feauture
        //[Authorize]
        [HttpPost]
        public IHttpActionResult AddPatient(AddPatientModel addPatientModel)
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
