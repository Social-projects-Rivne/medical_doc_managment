﻿using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;

namespace MedicalDocManagment.DAL.Initializer.Helpers
{
    internal static class DoctorsHelper
    {
        public static void AddSomeDoctorsToDb(UnitOfWork unitOfWork, Role doctorsRole)
        {
            var passwordHash = new PasswordHasher().HashPassword("password");
            var doctors = new List<User>
            {
                new User
                {
                    UserName = "pediatrician",
                    Email = "pediatrician@mail.com",
                    PasswordHash = passwordHash,
                    Position = new Position { Name = "педіатр" }
                },
                new User
                {
                    UserName = "psychiatrist",
                    Email = "psychiatrist@mail.com",
                    PasswordHash = passwordHash,
                    Position = new Position { Name = "психіатр" }
                }
            };

            foreach (User user in doctors)
            {
                var result = unitOfWork.UsersManager.Create(user);
                if (result.Succeeded)
                {
                    unitOfWork.UsersManager.AddToRole(user.Id, doctorsRole.Name);
                }
            }
        }
    }
}