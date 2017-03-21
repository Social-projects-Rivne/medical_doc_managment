﻿using MedicalDocManagment.UsersDAL;
using MedicalDocManagment.WebUI.Models;

namespace MedicalDocManagment.WebUI.Helpers
{
    public static class UserHelpers
    {
        public static User ConvertUserModelToUser(UserModel userModel)
        {
            return new User
            {
                UserName = userModel.UserName,
                Email = userModel.Email,
                FirstName = userModel.FirstName,
                SecondName = userModel.SecondName,
                LastName = userModel.LastName,
                Position = userModel.Position
            };
        }
    }
}