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
        public ChildCard Patient { get; set; }

        public string DoctorId { get; set; }

        [ForeignKey("DoctorId")]
        public User Doctor { get; set; }

        public DateTime Date { get; set; }

        public string Summury { get; set; }
    }
}
