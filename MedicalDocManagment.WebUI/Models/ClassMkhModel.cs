using System.Collections.Generic;

namespace MedicalDocManagment.WebUI.Models
{
    public class ClassMkhModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ICollection<ClassMkhModel> BlocksMkh { get; set; }
    }
}
