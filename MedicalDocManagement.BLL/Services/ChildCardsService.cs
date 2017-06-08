using AutoMapper;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

using MedicalDocManagement.BLL.DTO;
using MedicalDocManagement.BLL.Helpers;
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository;
using MedicalDocManagment.DAL.Repository.Interfaces;
using MedicalDocManagement.BLL.DTO.Main.PediatriciansExamination;
using MedicalDocManagment.DAL.Entities.Main.PediatriciansExamination;
using MedicalDocManagement.BLL.DTO.Main;
using MedicalDocManagment.BLL.DTO.Main.NeurologistsExamination;
using MedicalDocManagment.DAL.Entities.Main.NeurologistsExamination;
using MedicalDocManagement.DAL.Entities.Main;
using MedicalDocManagment.BLL.DTO.Main;

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
            return ChildCardDTOHelper.EntitiesToDTOs(childrenCards);
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
            return ChildCardDTOHelper.EntitiesToDTOs(childrenCards);
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

        public List<BlockMkhDTO> GetRelatedBlocksMkhByNosology(string nosologyMkhId)
        {
            var nosologyMkh = _unitOfWork.NosologyMkhRepository
                                       .Get(n => n.Id == nosologyMkhId)
                                       .AsNoTracking()
                                       .SingleOrDefault();

            if (nosologyMkh != null)
            {
                return GetRelatedBlocksMkh(nosologyMkh.BlockMkh.ClassId);
            }
            else
            {
                return null;
            }
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

        public List<NosologyMkhDTO> GetRelatedNosologiesMkhByDiagnsosis(string diagnosisMkhId)
        {
            var diagnosisMkH = _unitOfWork.DiagnosisMkhRepository
                                       .Get(n => n.Id == diagnosisMkhId)
                                       .AsNoTracking()
                                       .SingleOrDefault();

            if (diagnosisMkH != null)
            {
                return GetRelatedNosologiesMkh(diagnosisMkH.NosologyMkh.BlockId);
            }
            else
            {
                return null;
            }
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

        public List<ChildCardDTO> FindChildCards(IViewPatientData viewPatientData)
        {
            // Creating expression
            ParameterExpression predicateParam = Expression.Parameter(typeof(ChildCard), "childCard");
            PropertyInfo[] properties = typeof(IViewPatientData).GetProperties();
            Expression predicateBody = null;
            foreach (PropertyInfo property in properties)
            {
                var value = property.GetValue(viewPatientData);
                if (value != null)
                {
                    Expression left = Expression.Property(predicateParam, property.Name);
                    Expression right = Expression.Constant(value);
                    Expression pair = Expression.Equal(left, right);
                    if (predicateBody == null)
                    {
                        predicateBody = pair;
                    }
                    else
                    {
                        predicateBody = Expression.AndAlso(predicateBody, pair);
                    }
                }
            }
            Expression<Func<ChildCard,bool>> expression = Expression.Lambda<Func<ChildCard, bool>>(predicateBody, predicateParam);

            //Searching cards
            var childCards = _unitOfWork.ChildrenCardsRepository
                                        .Get(expression)
                                        .AsNoTracking()
                                        .ToList();

            return ChildCardDTOHelper.EntitiesToDTOs(childCards);
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

        public List<ParentDTO> GetChildsParents(int childCardId)
        {
            var parentChilds = _unitOfWork.ParentChildCardRepository
                                         .Get(pc => pc.ChildId == childCardId)
                                         .AsNoTracking()
                                         .ToList();

            var parents = new List<Parent>();
            foreach (var parentChild in parentChilds)
            {
                parents.Add(_unitOfWork.ParentRepository
                                       .Get(p => p.Id == parentChild.ParentId)
                                       .AsNoTracking()
                                       .Single()
                                       );
            }

            return ChildCardDTOHelper.EntitiesToDTOs(parents);
        }

        public NeurologistsExaminationDTO GetNeurologistsExamination(int childCardId)
        {
            var childCard = _unitOfWork.ChildrenCardsRepository
                                       .Get(card => card.Id == childCardId)
                                       .AsNoTracking()
                                       .Single();

            return NeurologistsExaminationDTOHelper.EntityToDTO(childCard.NeurologistsExamination);
        }

        public NeurologistsExaminationDTO SaveNeurologistsExamination(int childCardId,
            NeurologistsExaminationDTO examinationDTO)
        {
            var childCard = _unitOfWork.ChildrenCardsRepository
                                       .Get(card => card.Id == childCardId)
                                       .Single();
            NeurologistsExamination examination = NeurologistsExaminationDTOHelper.DTOToEntity(examinationDTO);
            if (childCard.NeurologistsExaminationId == null)
            {
                _unitOfWork.NeurologistsExaminationsRepository.Add(examination);
                _unitOfWork.Save();
                childCard.NeurologistsExaminationId = examination.Id;
                _unitOfWork.ChildrenCardsRepository.Update(childCard);
            }
            else
            {
                examination.Id = childCard.NeurologistsExaminationId.Value;
                _unitOfWork.NeurologistsExaminationsRepository.Update(examination);
            }
            _unitOfWork.Save();

            return NeurologistsExaminationDTOHelper.EntityToDTO(examination);
        }

        public SpeechTherapistsExaminationDTO GetSpeechTherapistsExamination(int childCardId)
        {
            var childCard = _unitOfWork.ChildrenCardsRepository
                                       .Get(card => card.Id == childCardId)
                                       .AsNoTracking()
                                       .Single();

            return SpeechTherapistsExaminationDTOHelper.EntityToDTO(childCard.SpeechTherapistsExamination);
        }

        public SpeechTherapistsExaminationDTO SaveSpeechTherapistsExamination(int childCardId,
            SpeechTherapistsExaminationDTO examinationDTO)
        {
            var childCard = _unitOfWork.ChildrenCardsRepository
                                       .Get(card => card.Id == childCardId)
                                       .Single();
            SpeechTherapistsExaminationEntity examination = SpeechTherapistsExaminationDTOHelper
                .DTOToEntity(examinationDTO);
            if (childCard.NeurologistsExaminationId == null)
            {
                _unitOfWork.SpeechTherapistsExaminationsRepository.Add(examination);
                _unitOfWork.Save();
                childCard.SpeechTherapistsExaminationId = examination.Id;
                _unitOfWork.ChildrenCardsRepository.Update(childCard);
            }
            else
            {
                examination.Id = childCard.SpeechTherapistsExaminationId.Value;
                _unitOfWork.SpeechTherapistsExaminationsRepository.Update(examination);
            }
            _unitOfWork.Save();

            return SpeechTherapistsExaminationDTOHelper.EntityToDTO(examination);
        }
    }
}
