using MedicalDocManagment.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalDocManagement.BLL.Services.Abstract
{
    public interface IPositionsService
    {
        List<PositionDTO> GetPositions();
        PositionDTO GetPosition(int id);
    }
}
