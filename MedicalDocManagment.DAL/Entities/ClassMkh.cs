using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities
{
    [Table("ClassesMkh")]
    public class ClassMkh
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }
        [StringLength(200)]
        public string Name { get; set; }
        public virtual ICollection<BlockMkh> BlocksMkh { get; set; }
    }
}
