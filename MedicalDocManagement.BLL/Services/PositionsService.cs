using MedicalDocManagement.BLL.Helpers;
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository;
using MedicalDocManagment.DAL.Repository.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace MedicalDocManagement.BLL.Services
{
    public class PositionsService : IPositionsService
    {
        private readonly IUnitOfWork _unitOfWork;
        public PositionsService()
        {
            _unitOfWork = new UnitOfWork();
        }
        public List<PositionDTO> GetPositions()
        {
            var positions = _unitOfWork.PositionRepository.Get().ToList();
            var positionsMapped = PositionDTOHelper.EntitiesToDTO(positions);

            return positionsMapped;
        }
        public PositionDTO GetPosition(int id)
        {
            var position = _unitOfWork.PositionRepository.Get(p => p.PositionId == id).FirstOrDefault();
            var positionMapped = PositionDTOHelper.EntityToDTO(position);

            return positionMapped;
        }
    }
}
