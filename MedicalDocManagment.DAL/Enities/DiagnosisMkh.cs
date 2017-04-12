﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Enities
{
    public class DiagnosisMkh
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }
        [StringLength(300)]
        public string Name { get; set; }
        public string NosologyId { get; set; }
        [ForeignKey("NosologyId")]
        public NosologyMkh NosologyMkh { get; set; }
    }
}
