using System.Collections.Generic;
using AutoMapper;
using MedicalDocManagement.BLL.DTO;
using MedicalDocManagement.BLL.DTO.Main;
using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Entities.Main;


namespace MedicalDocManagement.BLL.Helpers
{
    public class VisitDTOHelper
    {
        private readonly static MapperConfiguration mapperConfiguration;

        static VisitDTOHelper()
        {
            mapperConfiguration = new MapperConfiguration(
                 configuration =>
                 {
                     configuration.CreateMap<Visit, VisitDTO>();
                     configuration.CreateMap<VisitDTO, Visit>();
                     configuration.CreateMap<User, UserDTO>();
                     configuration.CreateMap<UserDTO, User>();
                     configuration.CreateMap<ChildCard, ChildCardDTO>();
                     configuration.CreateMap<ChildCardDTO, ChildCard>();
                 }
             );
        }

        public static Visit DTOToEntity(VisitDTO visitDTO)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<Visit>(visitDTO);
        }

        public static VisitDTO EntityToDTO(Visit visit)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<VisitDTO>(visit);
        }

        public static List<VisitDTO> EntitiesToDTOs(List<Visit> visits)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<IList<Visit>, List<VisitDTO>>(visits);
        }
    }
}
