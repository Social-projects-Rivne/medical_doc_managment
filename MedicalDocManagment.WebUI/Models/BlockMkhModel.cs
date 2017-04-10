using MedicalDocManagment.DAL.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MedicalDocManagment.WebUI.Models
{
    public class BlockMkhModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string ClassId { get; set; }
        public ClassMkhModel ClassMkh { get; set; }
    }
}