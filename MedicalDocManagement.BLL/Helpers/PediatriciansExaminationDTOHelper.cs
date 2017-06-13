using AutoMapper;
using MedicalDocManagement.BLL.DTO.Main.PediatriciansExamination;
using MedicalDocManagment.DAL.Entities.Main.PediatriciansExamination;

namespace MedicalDocManagement.BLL.Helpers
{
    public static class PediatriciansExaminationDTOHelper
    {
        private static MapperConfiguration mapperConfiguration;

        static PediatriciansExaminationDTOHelper()
        {
            mapperConfiguration = new MapperConfiguration(
                configuration =>
                {
                    configuration.CreateMap<BirthDetails, BirthDetailsDTO>();
                    configuration.CreateMap<Header, HeaderDTO>();
                    configuration.CreateMap<PregnancyDetails, PregnancyDetailsDTO>();
                    configuration.CreateMap<PsychomotorDevelopment, PsychomotorDevelopmentDTO>();
                    configuration.CreateMap<PediatriciansExamination, PediatriciansExaminationDTO>();

                    configuration.CreateMap<BirthDetailsDTO, BirthDetails>();
                    configuration.CreateMap<HeaderDTO, Header>();
                    configuration.CreateMap<PregnancyDetailsDTO, PregnancyDetails>();
                    configuration.CreateMap<PsychomotorDevelopmentDTO, PsychomotorDevelopment>();
                    configuration.CreateMap<PediatriciansExaminationDTO, PediatriciansExamination>();
                }
            );
        }

        public static PediatriciansExamination DTOToEntity(
            PediatriciansExaminationDTO pediatriciansExaminationDTO)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<PediatriciansExamination>(pediatriciansExaminationDTO);
        }

        public static PediatriciansExaminationDTO EntityToDTO(
            PediatriciansExamination pediatriciansExamination)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<PediatriciansExaminationDTO>(pediatriciansExamination);
        }
    }
}