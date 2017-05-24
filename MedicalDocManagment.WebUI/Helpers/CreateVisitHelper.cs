using AutoMapper;
using MedicalDocManagement.BLL.DTO.Main;
using MedicalDocManagment.WebUI.Models.Main;

namespace MedicalDocManagment.WebUI.Helpers
{
    public class CreateVisitHelper
    {
        public static CreateVisitVM DTOToVM(VisitDTO visitDTO)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<VisitDTO, CreateVisitVM>());
            return Mapper.Map<CreateVisitVM>(visitDTO);
        }

        public static VisitDTO VMToDTO(CreateVisitVM createVisitModel)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<CreateVisitVM, VisitDTO>());
            return Mapper.Map<VisitDTO>(createVisitModel);
        }

    }
}