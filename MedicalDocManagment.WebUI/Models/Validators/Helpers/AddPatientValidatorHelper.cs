using System;

namespace MedicalDocManagment.WebUI.Models.Validators.Helpers
{
    internal class AddPatientValidatorHelper
    {

        public static bool IsValidCheckOut(AddPatientVM addPatientVM)
        {
            if (addPatientVM.Checkout == null)
            {
                return true;
            }

            var isValid = (DateTime.Compare((DateTime)addPatientVM.Checkout, addPatientVM.Checkin) >= 0);

            return isValid;
        }

        public static bool IsCheckInMoreThanDate(AddPatientVM addPatientVM)
        {
            var isValid = DateTime.Compare(addPatientVM.Checkin, addPatientVM.Date) >= 0;

            return isValid;
        }

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