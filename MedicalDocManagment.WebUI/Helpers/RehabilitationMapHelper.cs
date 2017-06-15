using AutoMapper;
using MedicalDocManagement.BLL.DTO;
using MedicalDocManagment.WebUI.Models.Main;
using System.Collections.Generic;

namespace MedicalDocManagment.WebUI.Helpers
{
    public class RehabilitationMapHelper
    {
        private readonly static MapperConfiguration mapperConfiguration;
        static RehabilitationMapHelper()
        {
            mapperConfiguration = new MapperConfiguration(
                 configuration =>
                 {
                     configuration.CreateMap<RehabilitationDTO, RehabilitationVM>();
                     configuration.CreateMap<RehabilitationVM, RehabilitationDTO > ()
                                  .ForMember("TherapeuticProcedureId", opt => opt.MapFrom(src => src.TherapeuticProcedure.Id));
                     configuration.CreateMap<TherapeuticProcedureDTO, TherapeuticProcedureVM>();
                     configuration.CreateMap<TherapeuticProcedureVM, TherapeuticProcedureDTO>();
                 }
             );
        }
        public static RehabilitationDTO VMToDTO(RehabilitationVM rehabilitationVM)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<RehabilitationVM, RehabilitationDTO>(rehabilitationVM);
        }
        public static List<RehabilitationVM> DTOsToVMs(List<RehabilitationDTO> rehabilitations)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<List<RehabilitationVM>>(rehabilitations);
        }
    }
}