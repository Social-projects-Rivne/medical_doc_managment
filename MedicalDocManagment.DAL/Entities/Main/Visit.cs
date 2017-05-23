using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.DAL.Entities.Main
{
    public class Visit
    {
        [Key]
        public int Id { get; set; }

        public int PatientId { get; set; }

        [ForeignKey("PatientId")]
        public virtual ChildCard Patient { get; set; }

        public string DoctorId { get; set; }

        [ForeignKey("DoctorId")]
        public virtual User Doctor { get; set; }

        public DateTime Date { get; set; }

        public string Summary { get; set; }
    }
}
