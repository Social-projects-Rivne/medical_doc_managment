using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities
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

        [StringLength(100)]
        public string Work { get; set; }
        
        [StringLength(12)]
        public string Phone { get; set; }
        
        public virtual ICollection<ParentChildCard> ParentsChildren { get; set; }
    }
}
