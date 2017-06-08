using AutoMapper;
using MedicalDocManagement.DAL.Entities.Main;
using MedicalDocManagment.BLL.DTO.Main;

namespace MedicalDocManagement.BLL.Helpers
{
    public static class SpeechTherapistsExaminationDTOHelper
    {
        private static MapperConfiguration mapperConfiguration;

        static SpeechTherapistsExaminationDTOHelper()
        {
            mapperConfiguration = new MapperConfiguration(
                 configuration =>
                 {
                     configuration.CreateMap<SpeechTherapistsExaminationEntity, SpeechTherapistsExaminationDTO>();

                     configuration.CreateMap<SpeechTherapistsExaminationDTO, SpeechTherapistsExaminationEntity>();
                 }
             );
        }

        public static SpeechTherapistsExaminationEntity DTOToEntity(
            SpeechTherapistsExaminationDTO pediatriciansExaminationDTO)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<SpeechTherapistsExaminationEntity>(pediatriciansExaminationDTO);
        }

        public static SpeechTherapistsExaminationDTO EntityToDTO(
            SpeechTherapistsExaminationEntity pediatriciansExamination)
        {
            var mapper = mapperConfiguration.CreateMapper();
            return mapper.Map<SpeechTherapistsExaminationDTO>(pediatriciansExamination);
        }
    }
}