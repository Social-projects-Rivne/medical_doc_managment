using System;

namespace MedicalDocManagement.BLL.DTO
{
    public class ChildCardDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        public DateTime Date { get; set; }
        public string Address { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime? CheckOut { get; set; }
        public string DiagnosisId { get; set; }
        public string Prescription { get; set; }
        public string DirectedBy { get; set; }
    }
}
