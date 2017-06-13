using System;
using MedicalDocManagement.BLL.DTO.Main.PediatriciansExamination;
using MedicalDocManagment.BLL.DTO.Main.NeurologistsExamination;

namespace MedicalDocManagement.BLL.Services.Abstract
{
    public interface IChildCardService : IDisposable
    {
        string AddPsychiatristsConclusion(int childCardId, string conclusion);

        PediatriciansExaminationDTO GetPediatriciansExamination(int childCardId);
        PediatriciansExaminationDTO SavePediatriciansExamination(int childCardId,
            PediatriciansExaminationDTO examinationDTO);

        NeurologistsExaminationDTO GetNeurologistsExamination(int childCardId);
        NeurologistsExaminationDTO SaveNeurologistsExamination(int childCardId,
            NeurologistsExaminationDTO examinationDTO);
    }
}
