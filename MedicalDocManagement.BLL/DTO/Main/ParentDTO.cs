using System.Collections.Generic;

namespace MedicalDocManagement.BLL.DTO
{
    public class ParentDTO
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string SecondName { get; set; }

        public string LastName { get; set; }

        public string Work { get; set; }

        public string Phone { get; set; }

        //public virtual ICollection<ParentChildCardDTO> ParentsChildren { get; set; }
    }
}
