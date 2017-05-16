using System;
using MedicalDocManagment.DAL.Entities;

namespace MedicalDocManagement.BLL.DTO.Main
{
    public class VisitDTO
    {
        public int Id { get; set; }

        public int PatientId { get; set; }

        public ChildCardDTO Patient { get; set; }

        public string DoctorId { get; set; }

        public UserDTO Doctor { get; set; }

        public DateTime Date { get; set; }

        public string Summury { get; set; }
    }
}
