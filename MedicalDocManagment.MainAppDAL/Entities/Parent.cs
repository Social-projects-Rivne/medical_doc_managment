using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.MainAppDAL.Entities
{
    [Table("Parents")]
    public class Parent
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }

        [StringLength(100)]
        [Column("f_name")]
        public string F_Name { get; set; }

        [StringLength(100)]
        [Column("s_name")]
        public string S_Name { get; set; }

        [StringLength(100)]
        [Column("l_name")]
        public string L_Name { get; set; }

        [Column("work")]
        public string Work { get; set; }

        [Column("phone")]
        public string Phone { get; set; }

        public virtual ICollection<ChildCard> ChildrenCards { get; set; }
    }
}
