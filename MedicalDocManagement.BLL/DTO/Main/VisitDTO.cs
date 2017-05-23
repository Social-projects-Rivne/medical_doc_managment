using System;
using MedicalDocManagment.DAL.Entities;

namespace MedicalDocManagement.BLL.DTO.Main
{
    public class VisitDTO
    {
        public int Id { get; set; }

        public int PatientId { get; set; }

        public virtual ChildCardDTO Patient { get; set; }

        public string DoctorId { get; set; }

        public virtual UserDTO Doctor { get; set; }

        public DateTime Date { get; set; }

        public string Summary { get; set; }
    }
}
