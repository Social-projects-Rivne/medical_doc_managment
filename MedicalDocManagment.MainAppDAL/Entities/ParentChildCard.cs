using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.MainAppDAL.Entities
{
    [Table("ParentChild")]
    public class ParentChildCard
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }

        [Column("id_parent")]
        public int ParentId { get; set; }

        [Column("id_child")]
        public int ChildId { get; set; }

        [ForeignKey("ParentId")]
        public virtual Parent Parent { get; set; }

        [ForeignKey("ChildId")]
        public virtual ChildCard ChildCard { get; set; }
    }
}
