using AutoMapper;
using MedicalDocManagement.BLL.DTO;
using MedicalDocManagment.WebUI.Models;

namespace MedicalDocManagement.WebUI.Helpers
{
    public static class AddPatientHelper
    {
        public static ChildCardDTO AddPatientVMToChildCardDTO(AddPatientVM childCardVM)
        {
            Mapper.Initialize(
                cfg => cfg.CreateMap<AddPatientVM, ChildCardDTO>()
                          .ForMember(childCardDTO => childCardDTO.DiagnosisId,
                            opt => opt.MapFrom(addPatientVM => addPatientVM.DiagnosisCode))
                          .ForMember(childCardDTO => childCardDTO.Id,
                            opt => opt.UseValue(0))
            );
            return Mapper.Map<ChildCardDTO>(childCardVM);
        }
    }
}