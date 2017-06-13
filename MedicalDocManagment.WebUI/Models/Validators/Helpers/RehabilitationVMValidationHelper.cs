using System;

namespace MedicalDocManagment.WebUI.Models.Validators.Helpers
{
    internal class RehabilitationVMValidationHelper
    {
        public static bool IsAnyDateMoreThanToday(DateTime date)
        {
            return DateTime.Compare(date, DateTime.Now) <= 0;
        }

        public static bool IsNotNullAnyDate(DateTime date)
        {
            return date.Year != 1;
        }
    }
}