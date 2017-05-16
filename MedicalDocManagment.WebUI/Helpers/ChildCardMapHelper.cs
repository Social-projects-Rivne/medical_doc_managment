using AutoMapper;
using MedicalDocManagement.BLL.DTO;
using MedicalDocManagment.WebUI.Models.Main;

namespace MedicalDocManagment.WebUI.Helpers
{
    public class ChildCardMapHelper
    {
        public static AddParentVM DTOToVM(ParentDTO parentDTO)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<ParentDTO, AddParentVM>());
            return Mapper.Map<AddParentVM>(parentDTO);
        }

        public static ParentDTO VMToDTO(AddParentVM parentVM)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<AddParentVM, ParentDTO>());
            return Mapper.Map<ParentDTO>(parentVM);
        }

        public static AddParentChildCardVM DTOToVM(ParentChildCardDTO parentVM)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<AddParentChildCardVM, AddParentChildCardVM>());
            return Mapper.Map<AddParentChildCardVM>(parentVM);
        }

        public static ParentChildCardDTO VMToDTO(AddParentChildCardVM parentVM)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<AddParentChildCardVM, ParentChildCardDTO>());
            return Mapper.Map<ParentChildCardDTO>(parentVM);
        }

        public static ChildCardVM DTOToVM(ChildCardDTO childCardDTO)
        {
            Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<DiagnosisMkhDTO, DiagnosisMkhVM>();
                    cfg.CreateMap<ChildCardDTO, ChildCardVM>();
                }
            );
            return Mapper.Map<ChildCardVM>(childCardDTO);
        }
    }
}
