using MedicalDocManagment.DAL.Entities.Main;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities
{
    public class User : IdentityUser
    {
        [StringLength(100)]
        public string FirstName { get; set; }

        [StringLength(100)]
        public string SecondName { get; set; }

        [StringLength(100)]
        public string LastName { get; set; }
        public bool IsActive { get; set; }

        public int PositionId { get; set; }
        [ForeignKey("PositionId")]
        public virtual Position Position { get; set; }
        public virtual Image Image { get; set; }

        public virtual ICollection<Visit> Visits { get; set; }
    }
}
