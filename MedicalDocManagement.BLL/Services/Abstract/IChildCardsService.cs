using System;
using System.Collections.Generic;
using MedicalDocManagement.BLL.DTO;
using MedicalDocManagement.BLL.DTO.Main;

namespace MedicalDocManagement.BLL.Services.Abstract
{
    public interface IChildCardsService : IDisposable
    {
        ChildCardDTO AddChildCard(ChildCardDTO childCardDTO);
        ParentDTO AddParent(ParentDTO parentDTO);
        ParentChildCardDTO AddParentIntoChildCard(ParentChildCardDTO parentChildCardDTO);
        List<ChildCardDTO> FindChildCards(IViewPatientData viewPatientData);
        int GetChildrenCardsCount();
        List<ChildCardDTO> GetChildrenCards();
        List<ChildCardDTO> GetChildrenCardsPaged(int pageNumber, int pageSize);
        ChildCardDTO GetChildCard(int childCardId);
        List<ParentDTO> GetChildsParents(int childCardId);
        List<TherapeuticProcedureDTO> GetTherapeuticProcedures();
        RehabilitationDTO AddRehabilitationIntoChildCard(int childCardId, RehabilitationDTO rehabilitationDTO);
        List<RehabilitationDTO> GetRehabilitationsList(int childCardId);
    }
}
