using AutoMapper;
using MedicalDocManagement.BLL.DTO;
using MedicalDocManagment.BLL.DTO.Main.NeurologistsExamination;
using MedicalDocManagment.WebUI.Models.Main;
using MedicalDocManagment.WebUI.Models.Main.NeurologistsExamination;

namespace MedicalDocManagment.WebUI.Helpers
{
    public static class NeurologistsExaminationHelper
    {
        private static MapperConfiguration mapperConfiguration;

        static NeurologistsExaminationHelper()
        {
            mapperConfiguration = new MapperConfiguration(
                 configuration =>
                 {
                     configuration.CreateMap<NeurologicalStateDTO, NeurologicalStateVM>();
                     configuration.CreateMap<NeurologistsExaminationDTO, NeurologistsExaminationVM>();

                     configuration.CreateMap<NeurologicalStateVM, NeurologicalStateDTO>();
                     configuration.CreateMap<NeurologistsExaminationVM, NeurologistsExaminationDTO>();
                 }
             );
        }

        public static NeurologistsExaminationDTO VMToDTO(
            NeurologistsExaminationVM pediatriciansExaminationVM)
        {
            var mapper = mapperConfiguration.CreateMapper();

            return mapper.Map<NeurologistsExaminationDTO>(pediatriciansExaminationVM);
        }

        public static NeurologistsExaminationVM DTOToVM(
            NeurologistsExaminationDTO pediatriciansExaminationDTO)
        {
            var mapper = mapperConfiguration.CreateMapper();

            return mapper.Map<NeurologistsExaminationVM>(pediatriciansExaminationDTO);
        }
    }
}