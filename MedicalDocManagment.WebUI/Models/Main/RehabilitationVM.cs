using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MedicalDocManagment.WebUI.Models.Main
{
    public class RehabilitationVM
    {
        public int Id { get; set; }
        public DateTime BeginDate { get; set; }
        public int Count { get; set; }
        public string Commentary { get; set; }
        public virtual TherapeuticProcedureVM TherapeuticProcedure { get; set; }
    }
}