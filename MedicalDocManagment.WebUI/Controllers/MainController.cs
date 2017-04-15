using System;
using System.Linq;
using System.Web.Http;

using MedicalDocManagment.DAL.Entities;
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
            var newChildCard = new ChildCard
            {
                LastName = addPatientModel.LastName,
                FirstName = addPatientModel.FirstName,
                SecondName = addPatientModel.SecondName,
                Date = addPatientModel.Date,
                CheckIn = addPatientModel.Checkin,
                CheckOut = addPatientModel.Checkout,
                DirectedBy = addPatientModel.DirectedBy
            };
            try
            {
                newChildCard.Diagnosis = _unitOfWork.DiagnosisMkhRepository
                    .Get(diagnosisMkh => diagnosisMkh.Id == addPatientModel.DiagnosisCode)
                    .Single();

                _unitOfWork.ChildrenCardsRepository.Add(newChildCard);
                _unitOfWork.Save();
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }

            return Ok(newChildCard);
        }
    }
}
