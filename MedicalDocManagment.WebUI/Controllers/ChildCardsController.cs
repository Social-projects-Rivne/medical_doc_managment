﻿using System;
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
using MedicalDocManagement.WebUI.Helpers;
using MedicalDocManagment.WebUI.Helpers;

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
        public IHttpActionResult AddPatient(AddPatientVM addPatientVM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newChildCardDTO = AddPatientHelper.AddPatientVMToChildCardDTO(addPatientVM);

            try
            {
                var result = _childCardsService.AddChildCard(newChildCardDTO);
                return Ok(result);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
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

        [HttpGet]
        public IHttpActionResult GetClassesMkh()
        {
            var classesMkhDTO = _childCardsService.GetClassesMkh();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<ClassMkhDTO, ClassMkhVM>());
            var mapper = config.CreateMapper();
            var classesMkhVM = mapper.Map<List<ClassMkhVM>>(classesMkhDTO);

            return Ok(classesMkhVM);
        }

        //[Authorize]
        [HttpGet]
        public IHttpActionResult GetClassesMkh(string id)
        {
            var classMkhDTO = _childCardsService.GetClassesMkh(id);

            var config = new MapperConfiguration(cfg => cfg.CreateMap<ClassMkhDTO, ClassMkhVM>());
            var mapper = config.CreateMapper();
            var classMkhVM = mapper.Map<ClassMkhVM>(classMkhDTO);

            return Ok(classMkhVM);
        }

        //[Authorize]
        [HttpGet]
        public IHttpActionResult GetBlocksMkh(string classMkhId)
        {
            var blocksMkhDTO = _childCardsService.GetRelatedBlocksMkh(classMkhId);

            var config = new MapperConfiguration(cfg => cfg.CreateMap<BlockMkhDTO, BlockMkhVM>());
            var mapper = config.CreateMapper();
            var blocksMkhVM = mapper.Map<List<BlockMkhVM>>(blocksMkhDTO);

            return Ok(blocksMkhVM);
        }

        //[Authorize]
        [HttpGet]
        public IHttpActionResult GetNosologiesMkh(string blockMkhId)
        {
            var nosologiesMkhDTO = _childCardsService.GetRelatedNosologiesMkh(blockMkhId);

            var config = new MapperConfiguration(cfg => cfg.CreateMap<NosologyMkhDTO, NosologyMkhVM>());
            var mapper = config.CreateMapper();
            var nosologiesMkhVM = mapper.Map<List<NosologyMkhVM>>(nosologiesMkhDTO);

            return Ok(nosologiesMkhVM);
        }

        //[Authorize]
        [HttpGet]
        public IHttpActionResult GetDiagnosesMkh(string nosologyMkhId)
        {
            var diagnosesMkhDTO = _childCardsService.GetRelatedDiagnosesMkh(nosologyMkhId);

            var config = new MapperConfiguration(cfg => cfg.CreateMap<DiagnosisMkhDTO, DiagnosisMkhVM>());
            var mapper = config.CreateMapper();
            var diagnosesMkhVM = mapper.Map<List<DiagnosisMkhVM>>(diagnosesMkhDTO);

            return Ok(diagnosesMkhVM);
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult ViewPatientData([FromUri]ViewPatientDataVM viewPatientDataVM)
        {
            if (viewPatientDataVM == null)
            {
                return BadRequest("No data about patient to view.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var сhildCardDTO = ViewPatientDataHelper.
                ViewPatientDataVMToChildCardDTO(viewPatientDataVM);

            try
            {
                var result = _childCardsService.FindChildCards(сhildCardDTO);
                return Ok(result);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }
    }
}
