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
    }
}
