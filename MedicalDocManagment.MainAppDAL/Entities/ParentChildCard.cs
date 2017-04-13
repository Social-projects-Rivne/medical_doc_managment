using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.MainAppDAL.Entities
{
    [Table("ParentChild")]
    public class ParentChildCard
    {
        [Key]
        public int Id { get; set; }

        public int ParentId { get; set; }

        public int ChildId { get; set; }

        [ForeignKey("ParentId")]
        public virtual Parent Parent { get; set; }
        [ForeignKey("ChildId")]
        public virtual ChildCard ChildCard { get; set; }
    }
}
