﻿using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.WebUI.Models;

namespace MedicalDocManagment.WebUI.Helpers
{
    public static class UserHelpers
    {   //TODO fix this helper
        public static User ConvertUserModelToUser(UserCreateModel userModel)
        {
            return new User
            {
                UserName = userModel.UserName,
                Email = userModel.Email,
                FirstName = userModel.FirstName,
                SecondName = userModel.SecondName,
                LastName = userModel.LastName,
                //Position = userModel.Position
            };
        }
    }
}
