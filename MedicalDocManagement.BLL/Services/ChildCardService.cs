using MedicalDocManagement.BLL.DTO.Main.PediatriciansExamination;
using MedicalDocManagement.BLL.Helpers;
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagment.BLL.DTO.Main.NeurologistsExamination;
using MedicalDocManagment.DAL.Entities.Main.NeurologistsExamination;
using MedicalDocManagment.DAL.Entities.Main.PediatriciansExamination;
using MedicalDocManagment.DAL.Repository;
using MedicalDocManagment.DAL.Repository.Interfaces;
using System.Data.Entity;
using System.Linq;

namespace MedicalDocManagement.BLL.Services
{
    public class ChildCardService: IChildCardService
    {
        private readonly IUnitOfWork _unitOfWork;

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

        public ChildCardService()
        {
            _unitOfWork = new UnitOfWork();
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
    }
}
