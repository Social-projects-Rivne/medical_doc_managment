using MedicalDocManagment.DAL.Entities;
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
                    Position = new Position { Name = "педіатр" },
                    IsActive = true,
                    Image = new Image { ImageUrl = "\\Files\\no-image.png" }
                },
                new User
                {
                    UserName = "psychiatrist",
                    Email = "psychiatrist@mail.com",
                    PasswordHash = passwordHash,
                    Position = new Position { Name = "психіатр" },
                    IsActive = true,
                    Image = new Image { ImageUrl = "/Files/no-image.png" }
                },
                new User
                {
                    UserName = "speechTherapist",
                    Email = "speech_therapist@mail.com",
                    LastName = "Петренко",
                    FirstName = "Леонід",
                    SecondName = "Іванович",
                    PasswordHash = passwordHash,
                    Position = new Position { Name = "логопед" },
                    IsActive = true,
                    Image = new Image { ImageUrl = "/Files/no-image.png" }
                },
                new User
                {
                    UserName = "neurologist",
                    Email = "neurologist@mail.com",
                    PasswordHash = passwordHash,
                    Position = new Position { Name = "невролог" },
                    IsActive = true,
                    Image = new Image { ImageUrl = "/Files/no-image.png" }
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
