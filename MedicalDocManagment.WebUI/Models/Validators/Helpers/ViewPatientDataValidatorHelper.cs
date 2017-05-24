using System;

namespace MedicalDocManagment.WebUI.Models.Validators.Helpers
{
    internal class ViewPatientDataValidatorHelper
    {
        public static bool IsAnyDateMoreThanToday(DateTime? date)
        {
            return date.HasValue ? DateTime.Compare(date.Value, DateTime.Now) <= 0 : false;
        }
    }
}