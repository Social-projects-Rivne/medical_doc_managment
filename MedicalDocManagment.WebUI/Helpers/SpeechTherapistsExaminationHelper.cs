using AutoMapper;
using MedicalDocManagment.BLL.DTO.Main;
using MedicalDocManagment.WebUI.Models.Main;

namespace MedicalDocManagment.WebUI.Helpers
{
    public static class SpeechTherapistsExaminationHelper
    {
        private static MapperConfiguration mapperConfiguration;

        static SpeechTherapistsExaminationHelper()
        {
            mapperConfiguration = new MapperConfiguration(
                 configuration =>
                 {
                     configuration.CreateMap<SpeechTherapistsExaminationDTO, SpeechTherapistsExaminationVM>();

                     configuration.CreateMap<SpeechTherapistsExaminationVM, SpeechTherapistsExaminationDTO>();
                 }
             );
        }

        public static SpeechTherapistsExaminationDTO VMToDTO(
            SpeechTherapistsExaminationVM examinationVM)
        {
            var mapper = mapperConfiguration.CreateMapper();

            return mapper.Map<SpeechTherapistsExaminationDTO>(examinationVM);
        }

        public static SpeechTherapistsExaminationVM DTOToVM(
            SpeechTherapistsExaminationDTO examinationDTO)
        {
            var mapper = mapperConfiguration.CreateMapper();

            return mapper.Map<SpeechTherapistsExaminationVM>(examinationDTO);
        }
    }
}