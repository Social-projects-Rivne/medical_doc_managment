using AutoMapper;
using MedicalDocManagment.DAL.Entities;
using System.Collections.Generic;

namespace MedicalDocManagement.BLL.Helpers
{
    class UserDTOHelper
    {
        private readonly static MapperConfiguration mapperConfiguration;
        static UserDTOHelper()
        {
            mapperConfiguration = new MapperConfiguration(
                 configuration =>
                 {
                     configuration.CreateMap<User, UserDTO>();
                     configuration.CreateMap<UserDTO, User>();
                     configuration.CreateMap<Position, PositionDTO>();
                     configuration.CreateMap<PositionDTO, Position>();
                     configuration.CreateMap<Image, ImageDTO>();
                     configuration.CreateMap<ImageDTO, Image>();
                 }
             );
        }
        public static List<UserDTO> EntitiesToDTO(List<User> users)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<IList<User>, List<UserDTO>>(users);
        }
    }
}
