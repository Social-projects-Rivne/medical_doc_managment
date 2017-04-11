using System;
using System.Web.Http;

using MedicalDocManagment.MainAppDAL.Entities;
using MedicalDocManagment.MainAppDAL;
using MedicalDocManagment.WebUI.Models;

namespace MedicalDocManagment.WebUI.Controllers
{
    public class MainController : ApiController
    {       
        // TODO uncomment when feature will be implemented
        //[Authorize]
        [HttpPost]
        public IHttpActionResult AddPatient(AddPatientModel addPatientModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MainAppContext mainAppContext = new MainAppContext();

            ChildCard newChildCard = new ChildCard
            {
                L_Name = addPatientModel.L_Name,
                F_Name = addPatientModel.F_Name,
                S_Name = addPatientModel.S_Name,
                Date = addPatientModel.Date,
                CheckIn = addPatientModel.Checkin,
                CheckOut = addPatientModel.Checkout,
                DirectedBy = addPatientModel.DirectedBy
            };
            newChildCard.Diagnosis = mainAppContext.Diagnoses.Find(addPatientModel.DiagnosisCode);

            ChildCard result = null;
            try
            {
                result = mainAppContext.ChildrenCards.Add(newChildCard);
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
