using AutoMapper;
using MedicalDocManagement.BLL.DTO.Main;
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
                     configuration.CreateMap<PediatriciansExaminationDTO, PediatriciansExaminationVM>();
                     configuration.CreateMap<PediatriciansExaminationVM, PediatriciansExaminationDTO>();
                 }
             );
        }
    }