using System;
using System.ComponentModel.DataAnnotations;
using FluentValidation.Attributes;
using MedicalDocManagment.WebUI.Models.Validators;


namespace MedicalDocManagment.WebUI.Models.Main
{
    [Validator(typeof(RehabilitationVMValidator))]
    public class RehabilitationVM
    {
        public int? Id { get; set; }
        public DateTime BeginDate { get; set; }
        public int Count { get; set; }
        public string Commentary { get; set; }
        public virtual TherapeuticProcedureVM TherapeuticProcedure { get; set; }
    }
}