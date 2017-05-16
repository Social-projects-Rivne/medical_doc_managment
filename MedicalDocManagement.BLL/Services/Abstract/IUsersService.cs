using MedicalDocManagment.DAL.Entities;
using System;
using System.Collections.Generic;

namespace MedicalDocManagement.BLL.Services.Abstract
{
    public interface IUsersService : IDisposable
    {
        string GetPositionByUserName(string userName);
        List<UserDTO> GetPaged(int pageNumber, int pageSize);
        int GetUsersCount();
    }
}
