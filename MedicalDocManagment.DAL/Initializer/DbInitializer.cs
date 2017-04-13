using System.Data.Entity;
using Ploeh.AutoFixture;
using MedicalDocManagment.DAL.Enities;
using System.Linq;
using System.Collections.Generic;

namespace MedicalDocManagment.DAL.Initializer
{
    public class DbInitializer : DropCreateDatabaseIfModelChanges<Context>
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

            ICollection<ClassMkh> listClassesMkh = InitializerHelpers.GetListClassesMkh();
            ICollection<BlockMkh> listBlocksMkh = InitializerHelpers.GetListBlocksMkh();
            ICollection<NosologyMkh> listNosologiesMkh = InitializerHelpers.GetListNosologiesMkh();
            ICollection<DiagnosisMkh> listDiagnosesMkh = InitializerHelpers.GetListDiagnosesMkh();

            listClassesMkh = InitializerHelpers.FillClassesOfOtherMkhsModels(listClassesMkh, listBlocksMkh, listNosologiesMkh, listDiagnosesMkh);

            context.ClassesMkh.AddRange(listClassesMkh);
        }
       
    }
}
