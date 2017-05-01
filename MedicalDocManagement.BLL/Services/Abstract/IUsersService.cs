using System;

namespace MedicalDocManagement.BLL.Services.Abstract
{
    public interface IUsersService : IDisposable
    {
        string GetPositionByUserName(string userName);
    }
}
