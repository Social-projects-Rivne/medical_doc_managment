using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalDocManagment.UsersDAL.Entities
{
    public class Position
    {
        public int Id { get; set; }
        [Column("PositionName")]
        public string Name { get; set; }
    }
}
