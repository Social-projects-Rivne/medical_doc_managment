using Microsoft.AspNet.Identity.EntityFramework;

namespace MedicalDocManagment.UsersDAL.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }

        public virtual Position Position { get; set; }
    }
}
