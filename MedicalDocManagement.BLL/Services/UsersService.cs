using AutoMapper;

using MedicalDocManagement.BLL.DTO;
using MedicalDocManagement.BLL.Helpers;
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository;
using MedicalDocManagment.DAL.Repository.Interfaces;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Linq;

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
        public List<UserDTO> GetPaged(int pageNumber, int pageSize)
        {
            int skip = (pageNumber - 1) * pageSize;
            var users = _unitOfWork.UsersManager.Users
                                                .OrderBy(c => c.Id)
                                                .Skip(skip)
                                                .Take(pageSize)
                                                .ToList();
            var usersMapped = UserDTOHelper.EntitiesToDTO(users);
            return usersMapped;
        }
        public List<UserDTO> GetUsers()
        {
            var users = _unitOfWork.UsersManager.Users.ToList();
            var usersMapped = UserDTOHelper.EntitiesToDTO(users);

            return usersMapped;
        }
        public int GetUsersCount()
        {
            var count = _unitOfWork.UsersManager.Users.Count();

            return count;
        }
        public void Dispose()
        {
            _unitOfWork.Dispose();
        }
    }
}
