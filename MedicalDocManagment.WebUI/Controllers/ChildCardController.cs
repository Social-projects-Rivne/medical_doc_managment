using System;
using System.Web.Http;

using MedicalDocManagement.BLL.Services;
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagment.WebUI.Helpers;
using MedicalDocManagment.WebUI.Models.Main.PediatriciansExamination;
using MedicalDocManagment.WebUI.Controllers.CustomAttributes;
using MedicalDocManagment.WebUI.Models.Main.NeurologistsExamination;
using System.Net.Http;
using MedicalDocManagment.WebUI.Models;
using MedicalDocManagment.WebUI.Models.Validators;
using System.Net;
using MedicalDocManagement.WebUI.Helpers;
using MedicalDocManagment.WebUI.Models.Main;

namespace MedicalDocManagment.WebUI.Controllers
{
    public class ChildCardController : ApiController
    {
        private readonly IChildCardsService _childCardsService;

        public ChildCardController()
        {
            _childCardsService = new ChildCardsService();
        }

        [Authorize]
        [HttpPost]
        public HttpResponseMessage AddPatient(AddPatientVM addPatientVM)
        {
            var addPatientValidator = new AddPatientVMValidator();
            var fluentValidationResult = addPatientValidator.Validate(addPatientVM);
            if (!fluentValidationResult.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, fluentValidationResult.Errors);
            }

            var newChildCardDTO = AddPatientHelper.AddPatientVMToChildCardDTO(addPatientVM);

            try
            {
                var result = _childCardsService.AddChildCard(newChildCardDTO);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception);
            }
        }

        [PsychiatristsOnlyAuthorization]
        [HttpPatch]
        public IHttpActionResult SavePsychiatristsConclusion(int childCardId,
            [FromBody]string conclusion)
        {
            if (conclusion == null)
            {
                return BadRequest("No conclusion is supplied.");
            }
            if (conclusion.Length>2260)
            {
                return BadRequest("Conclusion is too long.");
            }

            try
            {
                var result = _childCardsService.AddPsychiatristsConclusion(childCardId, conclusion);
                return Ok(result);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [PediatriciansOnlyAuthorization]
        [HttpPut]
        public IHttpActionResult SavePediatriciansExamination(int childCardId,
            [FromBody]PediatriciansExaminationVM examinationVM)
        {
            try
            {
                var examinationDTO = PediatriciansExaminationHelper.VMToDTO(examinationVM);
                var resultDTO = _childCardsService.SavePediatriciansExamination(childCardId,
                    examinationDTO);
                var resultVM = PediatriciansExaminationHelper.DTOToVM(resultDTO);
                return Ok(resultVM);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetPediatriciansExamination(int childCardId)
        {
            try
            {
                var resultDTO = _childCardsService.GetPediatriciansExamination(childCardId);
                var resultVM = PediatriciansExaminationHelper.DTOToVM(resultDTO);
                return Ok(resultVM);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetChildCard(int childCardId)
        {
            try
            {
                var resultDTO = _childCardsService.GetChildCard(childCardId);

                if (resultDTO!=null)
                {
                    return Ok(ChildCardMapHelper.DTOToVM(resultDTO));
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [NeurologistsOnlyAuthorization]
        [HttpPut]
        public IHttpActionResult SaveNeurologistsExamination(int childCardId,
            [FromBody]NeurologistsExaminationVM examinationVM)
        {
            if (examinationVM == null)
            {
                return BadRequest("No examination to save.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var examinationDTO = NeurologistsExaminationHelper.VMToDTO(examinationVM);
                var resultDTO = _childCardsService.SaveNeurologistsExamination(childCardId,
                    examinationDTO);
                var resultVM = NeurologistsExaminationHelper.DTOToVM(resultDTO);
                return Ok(resultVM);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetNeurologistsExamination(int childCardId)
        {
            try
            {
                var resultDTO = _childCardsService.GetNeurologistsExamination(childCardId);
                var resultVM = NeurologistsExaminationHelper.DTOToVM(resultDTO);
                return Ok(resultVM);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [SpeechTherapistsOnlyAuthorization]
        [HttpPut]
        public IHttpActionResult SaveSpeechTherapistsExamination(int childCardId,
            [FromBody]SpeechTherapistsExaminationVM examinationVM)
        {
            if (examinationVM == null)
            {
                return BadRequest("No examination to save.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var validator = new SpeechTherapistsExaminationValidator();
            var fluentValidationResult = validator.Validate(examinationVM);
            if (!fluentValidationResult.IsValid)
            {
                return ResponseMessage(Request.CreateResponse
                    (HttpStatusCode.BadRequest, fluentValidationResult.Errors)
                    );
            }

            try
            {
                var examinationDTO = SpeechTherapistsExaminationHelper.VMToDTO(examinationVM);
                var resultDTO = _childCardsService.SaveSpeechTherapistsExamination(childCardId,
                    examinationDTO);
                var resultVM = SpeechTherapistsExaminationHelper.DTOToVM(resultDTO);
                return Ok(resultVM);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetSpeechTherapistsExamination(int childCardId)
        {
            try
            {
                var resultDTO = _childCardsService.GetSpeechTherapistsExamination(childCardId);
                var resultVM = SpeechTherapistsExaminationHelper.DTOToVM(resultDTO);
                return Ok(resultVM);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }
    }
}
