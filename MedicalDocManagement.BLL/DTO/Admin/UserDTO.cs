using Microsoft.AspNet.Identity.EntityFramework;

namespace MedicalDocManagment.DAL.Entities
{
    public class UserDTO : IdentityUser
    {
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }
        public int PositionId { get; set; }
        public PositionDTO Position { get; set; }
        public ImageDTO Image { get; set; }
    }
}
