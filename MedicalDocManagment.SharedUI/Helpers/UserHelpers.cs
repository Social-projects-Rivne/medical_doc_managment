using MedicalDocManagment.UsersDAL.Entities;
using MedicalDocManagment.SharedUI.Models;

namespace MedicalDocManagment.SharedUI.Helpers
{
    public static class UserHelpers
    {   //TODO fix this helper
        public static User ConvertUserModelToUser(UserModel userModel)
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
