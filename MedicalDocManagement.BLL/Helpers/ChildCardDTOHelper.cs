﻿using AutoMapper;
using MedicalDocManagement.BLL.DTO;
using MedicalDocManagment.DAL.Entities;
using System.Collections.Generic;

namespace MedicalDocManagement.BLL.Helpers
{
    public static class ChildCardDTOHelper
    {
        private static MapperConfiguration mapperConfiguration;

        static ChildCardDTOHelper()
        {
           mapperConfiguration = new MapperConfiguration(
                configuration =>
                {
                    configuration.CreateMap<ChildCardDTO, ChildCard>();
                    configuration.CreateMap<ChildCard, ChildCardDTO>();
                    configuration.CreateMap<DiagnosisMkh, DiagnosisMkhDTO>();
                }
            );
        }

        public static ChildCard DTOToEntity(ChildCardDTO childCardDTO)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<ChildCard>(childCardDTO);
        }

        public static ChildCardDTO EntityToDTO(ChildCard childCard)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<ChildCardDTO>(childCard);
        }

        public static List<ChildCardDTO> EntitiesToDTO(List<ChildCard> childCard)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<List<ChildCardDTO>>(childCard);
        }
    }
}
