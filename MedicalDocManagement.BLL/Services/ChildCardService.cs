using MedicalDocManagement.BLL.DTO.Main.PediatriciansExamination;
using MedicalDocManagement.BLL.Helpers;
using MedicalDocManagement.BLL.Services.Abstract;
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
    }
}
