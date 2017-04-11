﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.MainAppDAL.Entities
{
    [Table("ChildrenCards")]
    public class ChildCard
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

        [Column("date")]
        public DateTime Date { get; set; }

        [Column("address")]
        public string Address { get; set; }

        [Column("checkin")]
        public DateTime CheckIn { get; set; }

        [Column("checkout")]
        public DateTime? CheckOut { get; set; }

        [Column("id_diagnose")]
        public string DiagnosisId { get; set; }

        [ForeignKey("DiagnosisId")]
        public virtual Diagnosis Diagnosis { get; set; }

        [Column("prescription")]
        public string Prescription { get; set; }

        [Column("directedby")]
        public string DirectedBy { get; set; }

        public virtual ICollection<ParentChildCard> ParentsChildren { get; set; }
    }
}
