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
using MedicalDocManagment.DAL.Entities.Main;
using MedicalDocManagement.BLL.DTO.Main;

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
        public List<TherapeuticProcedureDTO> GetTherapeuticProcedures()
        {
            var procedures = _unitOfWork.TherapeuticProceduresRepository.Get()
                                                                        .AsNoTracking()
                                                                        .ToList();
            var config = new MapperConfiguration(cfg => cfg.CreateMap<TherapeuticProcedure, TherapeuticProcedureDTO>());
            var mapper = config.CreateMapper();

            return mapper.Map<List<TherapeuticProcedureDTO>>(procedures);
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

        public void Dispose()
        {
            _unitOfWork.Dispose();
        }

        public List<RehabilitationDTO> GetRehabilitationsList(int childCardId)
        {
            var childCard = _unitOfWork.ChildrenCardsRepository
                                       .Get(card => card.Id == childCardId)
                                       .AsNoTracking()
                                       .Single();
            var rehabilitationsSortedByDate = childCard.Rehabilitations.OrderBy(rehabilitation => rehabilitation.BeginDate);
            return RehabilitationDTOHelper.EntitiesToDTOs(rehabilitationsSortedByDate.ToList());
        }
        public RehabilitationDTO AddRehabilitationIntoChildCard(int childCardId,
            RehabilitationDTO rehabilitationDTO)
        {
            var childCard = _unitOfWork.ChildrenCardsRepository
                                       .Get(card => card.Id == childCardId)
                                       .Single();
            var rehabilitation = RehabilitationDTOHelper.DTOToEntity(rehabilitationDTO);

            _unitOfWork.RehabilitationsRepository.Add(rehabilitation);
            childCard.Rehabilitations.Add(rehabilitation);
            _unitOfWork.Save();

            return RehabilitationDTOHelper.EntityToDTO(rehabilitation);
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
    }
}
