using System;
using System.Collections.Generic;
using System.Web.Http;
using AutoMapper;

using MedicalDocManagment.WebUI.Models;
using MedicalDocManagment.DAL.Repository.Interfaces;
using MedicalDocManagment.DAL.Repository;
using MedicalDocManagement.BLL.DTO;
using MedicalDocManagement.BLL.Services;
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagment.WebUI.Models.Main;
using MedicalDocManagment.WebUI.Helpers;
using MedicalDocManagment.WebUI.Models.Validators;
using System.Net.Http;
using System.Net;
using MedicalDocManagement.WebUI.Helpers;

namespace MedicalDocManagment.WebUI.Controllers
{
    public class ChildCardsController : ApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IChildCardsService _childCardsService;

        public ChildCardsController()
        {
            _unitOfWork = new UnitOfWork();
            //TODO DI
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

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetChildCard(int childCardId)
        {
            try
            {
                var resultDTO = _childCardsService.GetChildCard(childCardId);

                if (resultDTO != null)
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

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetChildrenCards()
        {
            var childrenCardsDTO = _childCardsService.GetChildrenCards();
            var config = new MapperConfiguration(cfg => 
            {
                cfg.CreateMap<ChildCardDTO, ChildCardVM>();
                cfg.CreateMap<DiagnosisMkhDTO, DiagnosisMkhVM>();
            });
            var mapper = config.CreateMapper();
            var childrenCardsVM = mapper.Map<List<ChildCardVM>>(childrenCardsDTO);

            return Ok(childrenCardsVM);
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetChildrenCardsPaged(int pageNumber = 1, int pageSize = 20)
        {
            var childrenCardsDTO = _childCardsService.GetChildrenCardsPaged(pageNumber, pageSize);
            var total = _childCardsService.GetChildrenCardsCount();
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ChildCardDTO, ChildCardVM>();
                cfg.CreateMap<DiagnosisMkhDTO, DiagnosisMkhVM>();
            });
            var mapper = config.CreateMapper();
            var childrenCardsVM = mapper.Map<List<ChildCardVM>>(childrenCardsDTO);

            return Ok(new PagedResultHelper<ChildCardVM>(childrenCardsVM, pageNumber, pageSize, total));
        }

        [Authorize]
        [HttpPost]
        public IHttpActionResult AddParent(AddParentVM parentVM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newParentdDTO = ChildCardMapHelper.VMToDTO(parentVM);
            var result = _childCardsService.AddParent(newParentdDTO);

            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public IHttpActionResult AddParentIntoChildCard(AddParentChildCardVM parentChildCardVM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var parentChildCardDTO = ChildCardMapHelper.VMToDTO(parentChildCardVM);
            var result = _childCardsService.AddParentIntoChildCard(parentChildCardDTO);

            return Ok(result);
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult ViewPatientData([FromUri]ViewPatientDataVM viewPatientDataVM)
        {
            // Validation
            if (viewPatientDataVM == null)
            {
                return BadRequest("No data about patient to view.");
            }
            var viewPatientDataValidator = new ViewPatientDataValidator();
            var fluentValidationResult = viewPatientDataValidator.Validate(viewPatientDataVM);
            if (!fluentValidationResult.IsValid)
            {
                return ResponseMessage(Request.CreateResponse
                    (HttpStatusCode.BadRequest, fluentValidationResult.Errors)
                    );
            }

            try
            {
                var result = _childCardsService.FindChildCards(viewPatientDataVM);

                return Ok(result);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetChildsParents(int childCardId)
        {
            try
            {
                var resultDTOs = _childCardsService.GetChildsParents(childCardId);

                if (resultDTOs != null)
                {
                    return Ok(ChildCardMapHelper.DTOsToVMs(resultDTOs));
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
    }
}
