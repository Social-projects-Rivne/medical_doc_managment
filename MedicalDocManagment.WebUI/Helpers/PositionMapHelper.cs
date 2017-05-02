using AutoMapper;
using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.WebUI.Models;
using System.Collections.Generic;

namespace MedicalDocManagment.WebUI.Helpers
{
    public class PositionMapHelper
    {
        public static PositionModel DTOToVM(PositionDTO position)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<PositionDTO, PositionModel>();
            });
            var mapper = config.CreateMapper();
            return mapper.Map<PositionDTO, PositionModel>(position);
        }
        public static List<PositionModel> DTOsToVMs(List<PositionDTO> positions)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<PositionDTO, PositionModel>();
            });
            var mapper = config.CreateMapper();
            return mapper.Map<IList<PositionDTO>, List<PositionModel>>(positions);
        }
    }
}