using AutoMapper;

using MedicalDocManagement.BLL.DTO;
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository;
using MedicalDocManagment.DAL.Repository.Interfaces;
using Microsoft.AspNet.Identity;

namespace MedicalDocManagement.BLL.Services
{
    public class UsersService : IUsersService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UsersService()
        {
            _unitOfWork = new UnitOfWork();
        }

        public string GetPositionByUserName(string userName)
        {
            var user = _unitOfWork.UsersManager.FindByName(userName);

            return (user != null) ? user.Position.Name : null;
        }

        public void Dispose()
        {
            _unitOfWork.Dispose();
        }
    }
}
