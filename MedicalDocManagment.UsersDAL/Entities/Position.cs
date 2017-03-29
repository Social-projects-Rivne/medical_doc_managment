using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.UsersDAL.Entities
{
    public class Position
    {
        public Position()
        {
            Users = new List<User>();
        }

        [Key]
        public int PositionId { get; set; }

        [Column("PositionName")]
        [StringLength(128)]
        public string Name { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
