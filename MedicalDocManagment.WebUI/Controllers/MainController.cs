using System;
using System.Linq;
using System.Web.Http;

using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL;
using MedicalDocManagment.WebUI.Models;
using MedicalDocManagment.DAL.Repository.Interfaces;
using MedicalDocManagment.DAL.Repository;

namespace MedicalDocManagment.WebUI.Controllers
{
    public class MainController : ApiController
    {

        private readonly IUnitOfWork _unitOfWork;

        public MainController()
        {
            _unitOfWork = new UnitOfWork();
        }

        [Authorize]
        [HttpPost]
        public IHttpActionResult AddPatient(AddPatientModel addPatientModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Context context = new Context();

            ChildCard newChildCard = new ChildCard
            {
                LastName = addPatientModel.LastName,
                FirstName = addPatientModel.FirstName,
                SecondName = addPatientModel.SecondName,
                Date = addPatientModel.Date,
                CheckIn = addPatientModel.Checkin,
                CheckOut = addPatientModel.Checkout,
                DirectedBy = addPatientModel.DirectedBy
            };
            newChildCard.Diagnosis = context.DiagnosesMkh.Find(addPatientModel.DiagnosisCode);

            ChildCard result = null;
            try
            {
                result = context.ChildrenCards.Add(newChildCard);
                context.SaveChanges();
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }

            return Ok(result);
        }

        #region Mkh's methods

        [HttpGet]
        public IHttpActionResult GetClassesMkh()
        {

            return Ok(_unitOfWork.ClassMkhRepository.Get().ToList());
        }

        #endregion

    }
}
