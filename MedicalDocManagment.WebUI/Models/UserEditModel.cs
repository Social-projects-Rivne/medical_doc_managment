namespace MedicalDocManagment.WebUI.Models
{
    public class UserEditModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }
        public bool IsActive { get; set; }
    }
}