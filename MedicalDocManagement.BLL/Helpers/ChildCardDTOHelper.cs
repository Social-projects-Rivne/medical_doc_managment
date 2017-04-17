using AutoMapper;
using MedicalDocManagement.BLL.DTO;
using MedicalDocManagment.DAL.Entities;

namespace MedicalDocManagement.BLL.Helpers
{
    class ChildCardDTOHelper
    {
        public static ChildCard DTOToEntity(ChildCardDTO childCardDTO)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<ChildCardDTO, ChildCard>());
            return Mapper.Map<ChildCard>(childCardDTO);
        }

        public static ChildCardDTO EntityToDTO(ChildCard childCard)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<ChildCard, ChildCardDTO>());
            return Mapper.Map<ChildCardDTO>(childCard);
        }
    }
}
