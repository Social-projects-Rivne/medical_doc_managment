using System.Data.Entity;
using Ploeh.AutoFixture;
using MedicalDocManagment.DAL.Enities;
using System.Collections.Generic;

namespace MedicalDocManagment.DAL.Initializer
{
    public class DbInitializer : DropCreateDatabaseAlways<Context>
    {
        protected override void Seed(Context context)
        {
            var fixture = new Fixture();

            var users = fixture.Build<User>()
                               .Without(user => user.Position)
                               .Without(user => user.PositionId)
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
            var classesMkhList = InitializerHelpers.GetListMkhsObject(new List<ClassMkh>(), "classes");
            foreach (var item in classesMkhList)
            {
                var existModel = context.ClassesMkh.Find(item.Id);
                if (existModel == null)
                {
                    context.ClassesMkh.Add(item);
                }
            }
            var blocksMkhList = InitializerHelpers.GetListMkhsObject(new List<BlockMkh>(), "blocks");
            foreach (var item in blocksMkhList)
            {
                var existModel = context.BlocksMkh.Find(item.Id);
                if (existModel == null)
                {
                    context.BlocksMkh.Add(item);
                }
            }
        }
    }
}
