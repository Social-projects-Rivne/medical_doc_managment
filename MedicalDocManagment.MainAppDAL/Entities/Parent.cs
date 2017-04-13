using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.MainAppDAL.Entities
{
    public class Parent
    {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string FirstName { get; set; }

        [StringLength(100)]
        public string SecondName { get; set; }

        [StringLength(100)]
        public string LastName { get; set; }

        public string Work { get; set; }

        public string Phone { get; set; }

        public virtual ICollection<ParentChildCard> ParentsChildren { get; set; }
    }
}
