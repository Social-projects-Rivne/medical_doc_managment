using AutoMapper;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

using MedicalDocManagement.BLL.DTO;
using MedicalDocManagement.BLL.Helpers;
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository;
using MedicalDocManagment.DAL.Repository.Interfaces;

namespace MedicalDocManagement.BLL.Services
{
    public class ChildCardsService : IChildCardsService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ChildCardsService()
        {
            _unitOfWork = new UnitOfWork();
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

        public List<BlockMkhDTO> GetRelatedBlocksMkh(string classMkhId)
        {
            var relatedBlocksMkh = _unitOfWork.BlockMkhRepository
                                              .Get(b => b.ClassId == classMkhId)
                                              .AsNoTracking();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<BlockMkh, BlockMkhDTO>());
            var mapper = config.CreateMapper();

            return mapper.Map<List<BlockMkhDTO>>(relatedBlocksMkh);
        }

        public List<NosologyMkhDTO> GetRelatedNosologiesMkh(string blockMkhId)
        {
            var relatedNosologiesMkh = _unitOfWork.NosologyMkhRepository
                                                  .Get(n => n.BlockId == blockMkhId)
                                                  .AsNoTracking();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<NosologyMkh, NosologyMkhDTO>());
            var mapper = config.CreateMapper();

            return mapper.Map<List<NosologyMkhDTO>>(relatedNosologiesMkh);
        }

        public List<DiagnosisMkhDTO> GetRelatedDiagnosesMkh(string nosologyMkhId)
        {
            var relatedNosologiesMkh = _unitOfWork.DiagnosisMkhRepository
                                                  .Get(b => b.NosologyId == nosologyMkhId)
                                                  .AsNoTracking();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<DiagnosisMkh, DiagnosisMkhDTO>());
            var mapper = config.CreateMapper();

            return mapper.Map<List<DiagnosisMkhDTO>>(relatedNosologiesMkh);
        }

        public ChildCardDTO AddChildCard(ChildCardDTO childCardDTO)
        {
            var childCard = ChildCardDTOHelper.DTOToEntity(childCardDTO);

            _unitOfWork.ChildrenCardsRepository.Add(childCard);
            _unitOfWork.Save();

            return ChildCardDTOHelper.EntityToDTO(childCard);
        }

        public List<ChildCardDTO> FindChildCards(ChildCardDTO childCardDTO)
        {
            var childCards = _unitOfWork.ChildrenCardsRepository
                                        .Get
                                        (
                                            childCard =>
                                                childCard.LastName == childCardDTO.LastName &&
                                                childCard.FirstName == childCardDTO.FirstName &&
                                                childCard.SecondName == childCardDTO.SecondName &&
                                                childCard.Date == childCardDTO.Date
                                        )
                                        .AsNoTracking()
                                        .AsEnumerable()
                                        .ToList();

            return ChildCardDTOHelper.EntitiesToDTO(childCards);
        }

        public void Dispose()
        {
            _unitOfWork.Dispose();
        }
    }
}
