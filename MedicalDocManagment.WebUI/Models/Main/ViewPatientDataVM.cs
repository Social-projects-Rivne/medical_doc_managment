using FluentValidation.Attributes;
using MedicalDocManagment.WebUI.Models.Validators;
using MedicalDocManagement.BLL.DTO.Main;
using System;

namespace MedicalDocManagment.WebUI.Models
{
    public enum ViewPatientDataCategoryEnum
    {
        byFirstName, byLastName, bySecondName, byBirthDate, byCardNumber, byAllInTheAbove
    }

    [Validator(typeof(AddPatientVMValidator))]
    public class ViewPatientDataVM: IViewPatientData
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public DateTime? Date { get; set; }
        public string CardNumber { get; set; }

        public ViewPatientDataCategoryEnum ViewCategory { get; set; }
    }
}