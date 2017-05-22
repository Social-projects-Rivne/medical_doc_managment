using AutoMapper;
using MedicalDocManagement.BLL.DTO.Main;
using MedicalDocManagment.WebUI.Models.Main;

namespace MedicalDocManagment.WebUI.Helpers
{
    public class CreateVisitHelper
    {
        public static CreateVisitModel DTOToVM(VisitDTO visitDTO)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<VisitDTO, CreateVisitModel>());
            return Mapper.Map<CreateVisitModel>(visitDTO);
        }

        public static VisitDTO VMToDTO(CreateVisitModel createVisitModel)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<CreateVisitModel, VisitDTO>());
            return Mapper.Map<VisitDTO>(createVisitModel);
        }

    }
}