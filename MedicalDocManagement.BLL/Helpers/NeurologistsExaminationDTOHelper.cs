using AutoMapper;
using MedicalDocManagment.BLL.DTO.Main.NeurologistsExamination;
using MedicalDocManagment.DAL.Entities.Main.NeurologistsExamination;

namespace MedicalDocManagement.BLL.Helpers
{
    public static class NeurologistsExaminationDTOHelper
    {
        private static MapperConfiguration mapperConfiguration;

        static NeurologistsExaminationDTOHelper()
        {
            mapperConfiguration = new MapperConfiguration(
                 configuration =>
                 {
                     configuration.CreateMap<NeurologicalState, NeurologicalStateDTO>();
                     configuration.CreateMap<NeurologistsExamination, NeurologistsExaminationDTO>();

                     configuration.CreateMap<NeurologicalStateDTO, NeurologicalState>();
                     configuration.CreateMap<NeurologistsExaminationDTO, NeurologistsExamination>();
                 }
             );
        }

        public static NeurologistsExamination DTOToEntity(
            NeurologistsExaminationDTO pediatriciansExaminationDTO)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<NeurologistsExamination>(pediatriciansExaminationDTO);
        }

        public static NeurologistsExaminationDTO EntityToDTO(
            NeurologistsExamination pediatriciansExamination)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<NeurologistsExaminationDTO>(pediatriciansExamination);
        }
    }
}