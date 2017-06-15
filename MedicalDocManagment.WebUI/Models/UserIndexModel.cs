using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MedicalDocManagment.WebUI.Models
{
    public class UserIndexModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }
        public string Photo { get; set; }
        public int PositionId { get; set; }
        public PositionModel Position { get; set; }
    }
}