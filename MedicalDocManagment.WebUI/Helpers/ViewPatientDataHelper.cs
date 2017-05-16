using AutoMapper;
using MedicalDocManagement.BLL.DTO;
using MedicalDocManagment.WebUI.Models;

namespace MedicalDocManagement.WebUI.Helpers
{
    public static class ViewPatientDataHelper
    {
        private static MapperConfiguration mapperConfiguration;

        static ViewPatientDataHelper()
        {
            mapperConfiguration = new MapperConfiguration(
                configuration => 
                {
                    configuration.CreateMap<ViewPatientDataVM, ChildCardDTO>()
                                 .ForMember(childCardDTO => childCardDTO.Date,
                                    opt => opt.MapFrom
                                    ( viewPatientDataVM => viewPatientDataVM.BirthDate )
                                 );
                }
            );
        }

        public static ChildCardDTO ViewPatientDataVMToChildCardDTO(
            ViewPatientDataVM viewPatientDataVM)
        {
            var mapper = mapperConfiguration.CreateMapper();

            return mapper.Map<ChildCardDTO>(viewPatientDataVM);
        }
    }
}