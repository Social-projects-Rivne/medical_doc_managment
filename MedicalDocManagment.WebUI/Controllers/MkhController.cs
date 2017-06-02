using System.Collections.Generic;
using System.Web.Http;
using AutoMapper;

using MedicalDocManagement.BLL.DTO;
using MedicalDocManagement.BLL.Services;
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagment.WebUI.Models.Main;

namespace MedicalDocManagment.WebUI.Controllers
{
    public class MkhController : ApiController
    {
        private readonly IMkhService _mkhService;

        public MkhController()
        {
            _mkhService = new MkhService();
        }

        #region Classes

        [HttpGet]
        public IHttpActionResult GetClassesMkh()
        {
            var classesMkhDTO = _mkhService.GetClassesMkh();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<ClassMkhDTO, ClassMkhVM>());
            var mapper = config.CreateMapper();
            var classesMkhVM = mapper.Map<List<ClassMkhVM>>(classesMkhDTO);

            return Ok(classesMkhVM);
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetClassMkhByBlock(string blockId)
        {
            var classMkhDTO = _mkhService.GetClassMkhByBlock(blockId);

            if (classMkhDTO != null)
            {
                var config = new MapperConfiguration(cfg => cfg.CreateMap<ClassMkhDTO, ClassMkhVM>());
                var mapper = config.CreateMapper();
                var classesMkhVM = mapper.Map<ClassMkhVM>(classMkhDTO);

                return Ok(classesMkhVM);
            }
            else
            {
                return Ok();
            }
        }

        //[Authorize]
        [HttpGet]
        public IHttpActionResult GetClassesMkh(string id)
        {
            var classMkhDTO = _mkhService.GetClassesMkh(id);

            var config = new MapperConfiguration(cfg => cfg.CreateMap<ClassMkhDTO, ClassMkhVM>());
            var mapper = config.CreateMapper();
            var classMkhVM = mapper.Map<ClassMkhVM>(classMkhDTO);

            return Ok(classMkhVM);
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetClassMkhByDiagnosis(string diagnosisId)
        {
            var classMkhDTO = _mkhService.GetClassMkhByDiagnosis(diagnosisId);

            if (classMkhDTO != null)
            {
                var config = new MapperConfiguration(cfg => cfg.CreateMap<ClassMkhDTO, ClassMkhVM>());
                var mapper = config.CreateMapper();
                var classMkhVM = mapper.Map<ClassMkhVM>(classMkhDTO);

                return Ok(classMkhVM);
            }
            else
            {
                return Ok();
            }
        }

        #endregion

        #region Blocks
        //[Authorize]
        [HttpGet]
        public IHttpActionResult GetBlocksMkh(string classMkhId)
        {
            var blocksMkhDTO = _mkhService.GetRelatedBlocksMkh(classMkhId);

            var config = new MapperConfiguration(cfg => cfg.CreateMap<BlockMkhDTO, BlockMkhVM>());
            var mapper = config.CreateMapper();
            var blocksMkhVM = mapper.Map<List<BlockMkhVM>>(blocksMkhDTO);

            return Ok(blocksMkhVM);
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetBlockMkhByNosology(string nosologyId)
        {
            var blockMkhDTO = _mkhService.GetRelatedBlockMkhByNosology(nosologyId);

            if (blockMkhDTO!= null)
            {
                var config = new MapperConfiguration(cfg => cfg.CreateMap<BlockMkhDTO, BlockMkhVM>());
                var mapper = config.CreateMapper();
                var blockMkhVM = mapper.Map<BlockMkhVM>(blockMkhDTO);

                return Ok(blockMkhVM);
            }
            else
            {
                return Ok();
            }
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetBlockMkhByDiagnosis(string diagnosisId)
        {
            var blockMkhDTO = _mkhService.GetRelatedBlockMkhByDiagnosis(diagnosisId);

            if (blockMkhDTO != null)
            {
                var config = new MapperConfiguration(cfg => cfg.CreateMap<BlockMkhDTO, BlockMkhVM>());
                var mapper = config.CreateMapper();
                var blockMkhVM = mapper.Map<BlockMkhVM>(blockMkhDTO);

                return Ok(blockMkhVM);
            }
            else
            {
                return Ok();
            }
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetBlocksMkhByNosology(string nosologyId)
        {
            var blocksMkhDTO = _mkhService.GetRelatedBlocksMkhByNosology(nosologyId);

            if (blocksMkhDTO != null)
            {
                var config = new MapperConfiguration(cfg => cfg.CreateMap<BlockMkhDTO, BlockMkhVM>());
                var mapper = config.CreateMapper();
                var blocksMkhVM = mapper.Map<List<BlockMkhVM>>(blocksMkhDTO);

                return Ok(blocksMkhDTO);
            }
            else
            {
                return Ok();
            }
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetBlocksMkhByDiagnosis(string diagnosisId)
        {
            var blocksMkhDTO = _mkhService.GetRelatedBlocksMkhByDiagnosis(diagnosisId);

            if (blocksMkhDTO != null)
            {
                var config = new MapperConfiguration(cfg => cfg.CreateMap<BlockMkhDTO, BlockMkhVM>());
                var mapper = config.CreateMapper();
                var blocksMkhVM = mapper.Map<List<BlockMkhVM>>(blocksMkhDTO);

                return Ok(blocksMkhDTO);
            }
            else
            {
                return Ok();
            }
        }

        #endregion

        #region Nosologies
        [Authorize]
        [HttpGet]
        public IHttpActionResult GetNosologyMkhByDiagnosis(string diagnosisId)
        {
            var nosologyMkhDTO = _mkhService.GetRelatedNosologyMkhByDiagnosis(diagnosisId);

            var config = new MapperConfiguration(cfg => cfg.CreateMap<NosologyMkhDTO, NosologyMkhVM>());
            var mapper = config.CreateMapper();
            var nosologiesMkhVM = mapper.Map<NosologyMkhVM>(nosologyMkhDTO);

            return Ok(nosologiesMkhVM);
        }

        //[Authorize]
        [HttpGet]
        public IHttpActionResult GetNosologiesMkh(string blockMkhId)
        {
            var nosologiesMkhDTO = _mkhService.GetRelatedNosologiesMkh(blockMkhId);

            var config = new MapperConfiguration(cfg => cfg.CreateMap<NosologyMkhDTO, NosologyMkhVM>());
            var mapper = config.CreateMapper();
            var nosologiesMkhVM = mapper.Map<List<NosologyMkhVM>>(nosologiesMkhDTO);

            return Ok(nosologiesMkhVM);
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetNosologiesMkhByDiagnosis(string diagnosisId)
        {
            var nosologiesMkhDTO = _mkhService.GetRelatedNosologiesMkhByDiagnosis(diagnosisId);

            var config = new MapperConfiguration(cfg => cfg.CreateMap<NosologyMkhDTO, NosologyMkhVM>());
            var mapper = config.CreateMapper();
            var nosologiesMkhVM = mapper.Map<List<NosologyMkhVM>>(nosologiesMkhDTO);

            return Ok(nosologiesMkhVM);
        }
        #endregion

        #region Diagnoses
        //[Authorize]
        [HttpGet]
        public IHttpActionResult GetDiagnosesMkh(string nosologyMkhId)
        {
            var diagnosesMkhDTO = _mkhService.GetRelatedDiagnosesMkh(nosologyMkhId);

            var config = new MapperConfiguration(cfg => cfg.CreateMap<DiagnosisMkhDTO, DiagnosisMkhVM>());
            var mapper = config.CreateMapper();
            var diagnosesMkhVM = mapper.Map<List<DiagnosisMkhVM>>(diagnosesMkhDTO);

            return Ok(diagnosesMkhVM);
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetDiagnosisMkh(string diagnosisMkhId)
        {
            var diagnosisMkhDTO = _mkhService.GetDiagnosisMkh(diagnosisMkhId);

            if (diagnosisMkhDTO != null)
            {
                var config = new MapperConfiguration(cfg => cfg.CreateMap<DiagnosisMkhDTO, DiagnosisMkhVM>());
                var mapper = config.CreateMapper();
                var diagnosisMkhVM = mapper.Map<DiagnosisMkhVM>(diagnosisMkhDTO);

                return Ok(diagnosisMkhVM);
            }
            else
            {
                return Ok();
            }
        }
        #endregion
    }
}
