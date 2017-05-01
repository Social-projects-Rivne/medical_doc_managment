using System;
using System.Collections.Generic;
using MedicalDocManagement.BLL.DTO;

namespace MedicalDocManagement.BLL.Services.Abstract
{
    public interface IChildCardsService : IDisposable
    {
        List<ClassMkhDTO> GetClassesMkh();
        ClassMkhDTO GetClassesMkh(string id);
        List<BlockMkhDTO> GetRelatedBlocksMkh(string classMkhId);
        List<NosologyMkhDTO> GetRelatedNosologiesMkh(string blockMkhId);
        List<DiagnosisMkhDTO> GetRelatedDiagnosesMkh(string nosologyMkhId);

        ChildCardDTO AddChildCard(ChildCardDTO childCardDTO);
        ParentDTO AddParent(ParentDTO parentDTO);
        ParentChildCardDTO AddParentIntoChildCard(ParentChildCardDTO parentChildCardDTO);
        List<ChildCardDTO> FindChildCards(ChildCardDTO childCardDTO);
        int GetChildrenCardsCount();
        List<ChildCardDTO> GetChildrenCards();
        List<ChildCardDTO> GetChildrenCardsPaged(int pageNumber, int pageSize);
        string AddPsychiatristsConclusion(int childCardId, string conclusion);
    }
}
