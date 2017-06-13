using System;
using System.Web.Http;

using MedicalDocManagement.BLL.Services;
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagment.WebUI.Helpers;
using MedicalDocManagment.WebUI.Models.Main.PediatriciansExamination;
using MedicalDocManagment.WebUI.Controllers.CustomAttributes;

namespace MedicalDocManagment.WebUI.Controllers
{
    public class ChildCardController : ApiController
    {
        private readonly IChildCardService childCardService;

        public ChildCardController()
        {
            childCardService = new ChildCardService();
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
                var result = childCardService.AddPsychiatristsConclusion(childCardId, conclusion);
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
                var resultDTO = childCardService.SavePediatriciansExamination(childCardId,
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
                var resultDTO = childCardService.GetPediatriciansExamination(childCardId);
                var resultVM = PediatriciansExaminationHelper.DTOToVM(resultDTO);
                return Ok(resultVM);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }
    }
}
