using System.Data.Entity;
using Ploeh.AutoFixture;

using MedicalDocManagment.UsersDAL.Entities;

namespace MedicalDocManagment.UsersDAL.Initializer
{
    public class UsersDbInitializer : DropCreateDatabaseAlways<UsersContext>
    {
        protected override void Seed(UsersContext context)
        {
            var fixture = new Fixture();
            
            var users = fixture.Build<User>()
                               .CreateMany(10);

            int userCounter = 1;
            int positionCounter = 1;                  
            foreach (var user in users)
            {
                user.Position = new Position { Name = InitializerHelpers.GeneratePositionName(positionCounter) };
                user.UserName = InitializerHelpers.GenerateUserName(userCounter);
                user.Email = InitializerHelpers.GenerateEmail(userCounter);

                context.Users.Add(user);

                userCounter++;
                positionCounter++;
            }
        }
    }
}
