using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace MedicalDocManagment.WebUI.Models
{
    public class UserEditViewModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }
        public bool IsActive { get; set; }
    }
}