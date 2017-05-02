using AutoMapper;
using MedicalDocManagment.DAL.Entities;
using System.Collections.Generic;

namespace MedicalDocManagement.BLL.Helpers
{
    public class PositionDTOHelper
    {
        private readonly static MapperConfiguration mapConfig;
        static PositionDTOHelper()
        {
            mapConfig = new MapperConfiguration(cfg => {
                cfg.CreateMap<Position, PositionDTO>();
            });
        }
        public static PositionDTO EntityToDTO(Position position)
        {
            var mapper = mapConfig.CreateMapper();
            return mapper.Map<Position, PositionDTO>(position);
        }
        public static List<PositionDTO> EntitiesToDTO(List<Position> positions)
        {
            var mapper = mapConfig.CreateMapper();
            return mapper.Map<IList<Position>, List<PositionDTO>>(positions);
        }
    }
}
