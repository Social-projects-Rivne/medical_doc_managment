using AutoMapper;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

using MedicalDocManagement.BLL.DTO;
using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository;
using MedicalDocManagment.DAL.Repository.Interfaces;
using MedicalDocManagement.BLL.Services.Abstract;

namespace MedicalDocManagement.BLL.Services
{
    public class MkhService : IMkhService
    {
        private readonly IUnitOfWork _unitOfWork;

        public MkhService()
        {
            _unitOfWork = new UnitOfWork();
        }

        public void Dispose()
        {
            _unitOfWork.Dispose();
        }

        #region Classes

        public ClassMkhDTO GetClassMkhByBlock(string blockId)
        {
            var block = _unitOfWork.BlockMkhRepository
                                   .Get(x => x.Id == blockId)
                                   .AsNoTracking()
                                   .SingleOrDefault();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<BlockMkh, BlockMkhDTO>());
            var mapper = config.CreateMapper();

            return block != null ? mapper.Map<ClassMkhDTO>(block.ClassMkh) : null;
        }

        public ClassMkhDTO GetClassMkhByDiagnosis(string diagnosisMkhId)
        {
            var diagnosisMkh = _unitOfWork.DiagnosisMkhRepository
                                          .Get(n => n.Id == diagnosisMkhId)
                                          .AsNoTracking()
                                          .SingleOrDefault();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<ClassMkh, ClassMkhDTO>());
            var mapper = config.CreateMapper();

            return diagnosisMkh != null ? 
                mapper.Map<ClassMkhDTO>(diagnosisMkh.NosologyMkh.BlockMkh.ClassMkh) : null;
        }

        public List<ClassMkhDTO> GetClassesMkh()
        {
            var classesMkh = _unitOfWork.ClassMkhRepository
                                        .Get()
                                        .AsNoTracking();  
                                                                  
            var config = new MapperConfiguration(cfg => cfg.CreateMap<ClassMkh, ClassMkhDTO>());
            var mapper = config.CreateMapper();

            return mapper.Map<List<ClassMkhDTO>>(classesMkh);             
        }

        public ClassMkhDTO GetClassesMkh(string id)
        {
            var classMkh = _unitOfWork.ClassMkhRepository
                                      .Get(c => c.Id == id)
                                      .AsNoTracking()
                                      .FirstOrDefault();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<ClassMkh, ClassMkhDTO>());
            var mapper = config.CreateMapper();

            return mapper.Map<ClassMkhDTO>(classMkh);
        }

        #endregion

        #region Blocks
        public BlockMkhDTO GetRelatedBlockMkhByNosology(string nosologyId)
        {
            var nosology = _unitOfWork.NosologyMkhRepository
                                      .Get(x => x.Id == nosologyId)
                                      .AsNoTracking()
                                      .SingleOrDefault();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<BlockMkh, BlockMkhDTO>());
            var mapper = config.CreateMapper();

            return nosology != null ? mapper.Map<BlockMkhDTO>(nosology.BlockMkh) : null;
        }

        public BlockMkhDTO GetRelatedBlockMkhByDiagnosis(string diagnosisId)
        {
            var diagnosis = _unitOfWork.DiagnosisMkhRepository
                                      .Get(x => x.Id == diagnosisId)
                                      .AsNoTracking()
                                      .SingleOrDefault();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<BlockMkh, BlockMkhDTO>());
            var mapper = config.CreateMapper();

            return diagnosis != null ? mapper.Map<BlockMkhDTO>(diagnosis.NosologyMkh.BlockMkh) : null;
        }

        public List<BlockMkhDTO> GetRelatedBlocksMkh(string classMkhId)
        {
            var relatedBlocksMkh = _unitOfWork.BlockMkhRepository
                                              .Get(b => b.ClassId == classMkhId)
                                              .AsNoTracking();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<BlockMkh, BlockMkhDTO>());
            var mapper = config.CreateMapper();

            return mapper.Map<List<BlockMkhDTO>>(relatedBlocksMkh);
        }

        public List<BlockMkhDTO> GetRelatedBlocksMkhByDiagnosis(string diagnosisMkhId)
        {
            var diagnosisMkh = _unitOfWork.DiagnosisMkhRepository
                                          .Get(n => n.Id == diagnosisMkhId)
                                          .AsNoTracking()
                                          .SingleOrDefault();

            return diagnosisMkh != null ? 
                GetRelatedBlocksMkh(diagnosisMkh.NosologyMkh.BlockMkh.ClassId) : null;
        }

        public List<BlockMkhDTO> GetRelatedBlocksMkhByNosology(string nosologyMkhId)
        {
            var nosologyMkh = _unitOfWork.NosologyMkhRepository
                                       .Get(n => n.Id == nosologyMkhId)
                                       .AsNoTracking()
                                       .SingleOrDefault();

            return nosologyMkh != null ? GetRelatedBlocksMkh(nosologyMkh.BlockMkh.ClassId) : null;
        }
        #endregion

        #region Nosologies
        public List<NosologyMkhDTO> GetRelatedNosologiesMkh(string blockMkhId)
        {
            var relatedNosologiesMkh = _unitOfWork.NosologyMkhRepository
                                                  .Get(n => n.BlockId == blockMkhId)
                                                  .AsNoTracking();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<NosologyMkh, NosologyMkhDTO>());
            var mapper = config.CreateMapper();

            return mapper.Map<List<NosologyMkhDTO>>(relatedNosologiesMkh);
        }

        public List<NosologyMkhDTO> GetRelatedNosologiesMkhByDiagnosis(string diagnosisMkhId)
        {
            var diagnosisMkh = _unitOfWork.DiagnosisMkhRepository
                                       .Get(n => n.Id == diagnosisMkhId)
                                       .AsNoTracking()
                                       .SingleOrDefault();

            return diagnosisMkh != null ? GetRelatedNosologiesMkh(diagnosisMkh.NosologyMkh.BlockId) :
                null;
        }

        public NosologyMkhDTO GetRelatedNosologyMkhByDiagnosis(string diagnosisMkhId)
        {
            var diagnosisMkh = _unitOfWork.DiagnosisMkhRepository
                                       .Get(n => n.Id == diagnosisMkhId)
                                       .AsNoTracking()
                                       .SingleOrDefault();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<NosologyMkh, NosologyMkhDTO>());
            var mapper = config.CreateMapper();

            return diagnosisMkh != null ? mapper.Map<NosologyMkhDTO>(diagnosisMkh.NosologyMkh) :
                null;
        }
        #endregion

        public List<DiagnosisMkhDTO> GetRelatedDiagnosesMkh(string nosologyMkhId)
        {
            var relatedNosologiesMkh = _unitOfWork.DiagnosisMkhRepository
                                                  .Get(b => b.NosologyId == nosologyMkhId)
                                                  .AsNoTracking();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<DiagnosisMkh, DiagnosisMkhDTO>());
            var mapper = config.CreateMapper();

            return mapper.Map<List<DiagnosisMkhDTO>>(relatedNosologiesMkh);
        }
    }
}
