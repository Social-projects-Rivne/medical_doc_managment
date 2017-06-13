using System;

namespace MedicalDocManagement.BLL.DTO
{
    public class RehabilitationDTO
    {
        public int Id { get; set; }
        public DateTime BeginDate { get; set; }
        public int Count { get; set; }
        public string Commentary { get; set; }
        public int TherapeuticProcedureId { get; set; }
        public TherapeuticProcedureDTO TherapeuticProcedure { get; set; }
    }
}