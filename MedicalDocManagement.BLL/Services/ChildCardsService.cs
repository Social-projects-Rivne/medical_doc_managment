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
using MedicalDocManagement.BLL.DTO.Main.PediatriciansExamination;
using MedicalDocManagment.DAL.Entities.Main.PediatriciansExamination;

namespace MedicalDocManagement.BLL.Services
{
    public class ChildCardsService : IChildCardsService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ChildCardsService()
        {
            _unitOfWork = new UnitOfWork();
        }
        public List<ChildCardDTO> GetChildrenCards()
        {
            var childrenCards = _unitOfWork.ChildrenCardsRepository
                                           .Get()
                                           .AsNoTracking()
                                           .ToList();
            return ChildCardDTOHelper.EntitiesToDTO(childrenCards);
        }
        public int GetChildrenCardsCount()
        {
            var count = _unitOfWork.ChildrenCardsRepository
                                   .Get()
                                   .Count();
            return count;
        }
        public List<ChildCardDTO> GetChildrenCardsPaged(int pageNumber = 1, int pageSize = 20)
        {
            var skip = (pageNumber - 1) * pageSize;
            var childrenCards = _unitOfWork.ChildrenCardsRepository
                                           .Get()
                                           .OrderBy(c => c.Id)
                                           .Skip(skip)
                                           .Take(pageSize)
                                           .AsNoTracking()
                                           .ToList();
            return ChildCardDTOHelper.EntitiesToDTO(childrenCards);
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

        public ParentDTO AddParent(ParentDTO parentDTO)
        {
            var parent = ChildCardDTOHelper.DTOToEntity(parentDTO);

            _unitOfWork.ParentRepository.Add(parent);
            _unitOfWork.Save();

            return ChildCardDTOHelper.EntityToDTO(parent);
        }

        public ParentChildCardDTO AddParentIntoChildCard(ParentChildCardDTO parentChildCardDTO)
        {
            var parentChildCard = ChildCardDTOHelper.DTOToEntity(parentChildCardDTO);

            _unitOfWork.ParentChildCardRepository.Add(parentChildCard);
            _unitOfWork.Save();

            return parentChildCardDTO;
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

        public string AddPsychiatristsConclusion(int childCardId, string conclusion)
        {
            var childCard = _unitOfWork.ChildrenCardsRepository
                                       .Get(card => card.Id == childCardId)
                                       .Single();
            childCard.PsychiatristsConclusion = conclusion;
            _unitOfWork.ChildrenCardsRepository.Update(childCard);
            _unitOfWork.Save();

            return childCard.PsychiatristsConclusion;
        }

        public void Dispose()
        {
            _unitOfWork.Dispose();
        }

        public PediatriciansExaminationDTO GetPediatriciansExamination(int childCardId)
        {
            var childCard = _unitOfWork.ChildrenCardsRepository
                                       .Get(card => card.Id == childCardId)
                                       .AsNoTracking()
                                       .Single();

            return PediatriciansExaminationDTOHelper.EntityToDTO(childCard.PediatriciansExamination);
        }

        public PediatriciansExaminationDTO SavePediatriciansExamination(int childCardId, 
            PediatriciansExaminationDTO examinationDTO)
        {
            var childCard = _unitOfWork.ChildrenCardsRepository
                                       .Get(card => card.Id == childCardId)
                                       .Single();
            PediatriciansExamination examination = PediatriciansExaminationDTOHelper.DTOToEntity(examinationDTO);
            if (childCard.PediatriciansExaminationId == null)
            {
                _unitOfWork.PediatriciansExaminationsRepository.Add(examination);
                _unitOfWork.Save();
                childCard.PediatriciansExaminationId = examination.Id;
                _unitOfWork.ChildrenCardsRepository.Update(childCard);
            }
            else
            {
                examination.Id = childCard.PediatriciansExaminationId.Value;
                _unitOfWork.PediatriciansExaminationsRepository.Update(examination);
            }
            _unitOfWork.Save();

            return PediatriciansExaminationDTOHelper.EntityToDTO(examination);
        }

        public ChildCardDTO GetChildCard(int childCardId)
        {
            var childCard = _unitOfWork.ChildrenCardsRepository
                                       .Get(card => card.Id == childCardId)
                                       .AsNoTracking();

            ChildCardDTO result = null;
            if (childCard.Any())
            {
                result = ChildCardDTOHelper.EntityToDTO(childCard.Single());
            }

            return result;
        }
    }
}
