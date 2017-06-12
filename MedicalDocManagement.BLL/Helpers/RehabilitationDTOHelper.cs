using AutoMapper;
using MedicalDocManagement.BLL.DTO;
using MedicalDocManagement.BLL.Services;
using MedicalDocManagment.DAL.Entities.Main;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalDocManagement.BLL.Helpers
{
    class RehabilitationDTOHelper
    {
        private readonly static MapperConfiguration mapperConfiguration;
        static RehabilitationDTOHelper()
        {
            mapperConfiguration = new MapperConfiguration(
                 configuration =>
                 {
                     configuration.CreateMap<Rehabilitation, RehabilitationDTO>();
                     configuration.CreateMap<RehabilitationDTO, Rehabilitation>()
                                  .ForMember(dest => dest.TherapeuticProcedure, opt => opt.Ignore());
                     configuration.CreateMap<TherapeuticProcedure, TherapeuticProcedureDTO>();
                     configuration.CreateMap<TherapeuticProcedureDTO, TherapeuticProcedure>();
                 }
             );
        }
        public static Rehabilitation DTOToEntity(RehabilitationDTO rehabilitationDTO)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<RehabilitationDTO, Rehabilitation>(rehabilitationDTO);
        }
        public static RehabilitationDTO EntityToDTO(Rehabilitation rehabilitation)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<Rehabilitation, RehabilitationDTO>(rehabilitation);
        }
        public static List<RehabilitationDTO> EntitiesToDTOs(List<Rehabilitation> rehabilitations)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<List<RehabilitationDTO>>(rehabilitations);
        }
    }
}
