using System;
using System.Collections.Generic;
using MedicalDocManagement.BLL.DTO;
using MedicalDocManagement.BLL.DTO.Main.PediatriciansExamination;
using MedicalDocManagement.BLL.DTO.Main;
using MedicalDocManagment.BLL.DTO.Main.NeurologistsExamination;

namespace MedicalDocManagement.BLL.Services.Abstract
{
    public interface IChildCardsService : IDisposable
    {
        List<ClassMkhDTO> GetClassesMkh();
        ClassMkhDTO GetClassesMkh(string id);
        List<BlockMkhDTO> GetRelatedBlocksMkh(string classMkhId);
        List<BlockMkhDTO> GetRelatedBlocksMkhByNosology(string nosologyMkhId);
        List<NosologyMkhDTO> GetRelatedNosologiesMkh(string blockMkhId);
        List<NosologyMkhDTO> GetRelatedNosologiesMkhByDiagnsosis(string diagnosisMkhId);
        List<DiagnosisMkhDTO> GetRelatedDiagnosesMkh(string nosologyMkhId);

        ChildCardDTO AddChildCard(ChildCardDTO childCardDTO);
        ParentDTO AddParent(ParentDTO parentDTO);
        ParentChildCardDTO AddParentIntoChildCard(ParentChildCardDTO parentChildCardDTO);
        List<ChildCardDTO> FindChildCards(IViewPatientData viewPatientData);
        int GetChildrenCardsCount();
        List<ChildCardDTO> GetChildrenCards();
        List<ChildCardDTO> GetChildrenCardsPaged(int pageNumber, int pageSize);
        string AddPsychiatristsConclusion(int childCardId, string conclusion);
        PediatriciansExaminationDTO GetPediatriciansExamination(int childCardId);
        PediatriciansExaminationDTO SavePediatriciansExamination(int childCardId,
            PediatriciansExaminationDTO examination);
        ChildCardDTO GetChildCard(int childCardId);
        List<ParentDTO> GetChildsParents(int childCardId);
        NeurologistsExaminationDTO GetNeurologistsExamination(int childCardId);
        NeurologistsExaminationDTO SaveNeurologistsExamination(int childCardId,
            NeurologistsExaminationDTO examination);
    }
}
