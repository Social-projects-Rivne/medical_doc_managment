using AutoMapper;
using MedicalDocManagement.BLL.DTO.Main.PediatriciansExamination;
using MedicalDocManagment.WebUI.Models.Main.PediatriciansExamination;

namespace MedicalDocManagment.WebUI.Helpers
{
    public static class PediatriciansExaminationHelper
    {
        private static MapperConfiguration mapperConfiguration;

        static PediatriciansExaminationHelper()
        {
            mapperConfiguration = new MapperConfiguration(
                 configuration =>
                 {
                     configuration.CreateMap<BirthDetailsDTO, BirthDetailsVM>();
                     configuration.CreateMap<HeaderDTO, HeaderVM>();
                     configuration.CreateMap<PregnancyDetailsDTO, PregnancyDetailsVM>();
                     configuration.CreateMap<PsychomotorDevelopmentDTO, PsychomotorDevelopmentVM>();
                     configuration.CreateMap<PediatriciansExaminationDTO, PediatriciansExaminationVM>();

                     configuration.CreateMap<BirthDetailsVM, BirthDetailsDTO>();
                     configuration.CreateMap<HeaderVM, HeaderDTO>();
                     configuration.CreateMap<PregnancyDetailsVM, PregnancyDetailsDTO>();
                     configuration.CreateMap<PsychomotorDevelopmentVM, PsychomotorDevelopmentDTO>();
                     configuration.CreateMap<PediatriciansExaminationVM, PediatriciansExaminationDTO>();
                 }
             );
        }

        public static PediatriciansExaminationDTO VMToDTO(
            PediatriciansExaminationVM pediatriciansExaminationVM)
        {
            var mapper = mapperConfiguration.CreateMapper();

            return mapper.Map<PediatriciansExaminationDTO>(pediatriciansExaminationVM);
        }

        public static PediatriciansExaminationVM DTOToVM(
    PediatriciansExaminationDTO pediatriciansExaminationDTO)
        {
            var mapper = mapperConfiguration.CreateMapper();

            return mapper.Map<PediatriciansExaminationVM>(pediatriciansExaminationDTO);
        }
    }
}