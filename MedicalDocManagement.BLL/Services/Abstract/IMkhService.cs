using System;
using System.Collections.Generic;
using MedicalDocManagement.BLL.DTO;

namespace MedicalDocManagement.BLL.Services.Abstract
{
    public interface IMkhService : IDisposable
    {
        ClassMkhDTO GetClassMkhByBlock(string blockId);
        ClassMkhDTO GetClassMkhByDiagnosis(string diagnosisMkhId);
        List<ClassMkhDTO> GetClassesMkh();
        ClassMkhDTO GetClassesMkh(string id);

        BlockMkhDTO GetRelatedBlockMkhByNosology(string nosologyId);
        BlockMkhDTO GetRelatedBlockMkhByDiagnosis(string diagnosisId);
        List<BlockMkhDTO> GetRelatedBlocksMkh(string classMkhId);
        List<BlockMkhDTO> GetRelatedBlocksMkhByDiagnosis(string diagnosisMkhId);
        List<BlockMkhDTO> GetRelatedBlocksMkhByNosology(string nosologyMkhId);

        List<NosologyMkhDTO> GetRelatedNosologiesMkh(string blockMkhId);
        List<NosologyMkhDTO> GetRelatedNosologiesMkhByDiagnosis(string diagnosisMkhId);
        NosologyMkhDTO GetRelatedNosologyMkhByDiagnosis(string diagnosisMkhId);

        DiagnosisMkhDTO GetDiagnosisMkh(string diagnosisMkhId);
        List<DiagnosisMkhDTO> GetRelatedDiagnosesMkh(string nosologyMkhId);
    }
}
