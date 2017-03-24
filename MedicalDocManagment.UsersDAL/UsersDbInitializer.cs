using System.Data.Entity;
using Ploeh.AutoFixture;

using MedicalDocManagment.UsersDAL.Entities;

namespace MedicalDocManagment.UsersDAL
{
    public class UsersDbInitializer : DropCreateDatabaseAlways<UsersContext>
    {
        protected override void Seed(UsersContext context)
        {
            var fixture = new Fixture();
            
            var users = fixture.Build<User>()
                               .CreateMany(10);

            int userCnt = 0;
            foreach (var user in users)
            {
                user.UserName = "User" + ++userCnt;

                user.Position = new Position { Name = "Position" };
                context.Users.Add(user);
            }
        }
    }
}
