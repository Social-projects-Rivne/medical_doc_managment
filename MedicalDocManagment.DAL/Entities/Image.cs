using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities
{
    public class Image
    {
        [ForeignKey("User")]
        public string ImageId { get; set; }
        public string ImageUrl { get; set; }
        public virtual User User { get; set; }
    }
}
