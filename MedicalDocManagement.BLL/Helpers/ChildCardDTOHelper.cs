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

        public static Parent DTOToEntity(ParentDTO parentDTO)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<ParentDTO, Parent>());
            return Mapper.Map<Parent>(parentDTO);
        }

        public static ParentDTO EntityToDTO(Parent parentDTO)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Parent, ParentDTO>());
            return Mapper.Map<ParentDTO>(parentDTO);
        }

        public static ParentChildCard DTOToEntity(ParentChildCardDTO parentChildCardDTO)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<ParentChildCardDTO, ParentChildCard>());
            return Mapper.Map<ParentChildCard>(parentChildCardDTO);
        }

        public static ParentChildCardDTO EntityToDTO(ParentChildCard parentChildCard)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<ParentChildCard, ParentChildCardDTO>());
            return Mapper.Map<ParentChildCardDTO>(parentChildCard);
        }
    }
}
