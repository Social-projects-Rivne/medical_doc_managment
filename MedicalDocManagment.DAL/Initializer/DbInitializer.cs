using System.Data.Entity;
using Ploeh.AutoFixture;
using MedicalDocManagment.DAL.Enities;
using System.Linq;

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

            var listClassesMkh = InitializerHelpers.GetListClassesMkh();
            var listBlocksMkh = InitializerHelpers.GetListBlocksMkh();
            var listNosologiesMkh = InitializerHelpers.GetListNosologiesMkh();
            var listDiagnosesMkh = InitializerHelpers.GetListDiagnosesMkh();

            foreach (var classMkh in listClassesMkh)
            {
                classMkh.BlocksMkh = InitializerHelpers.GetListBlocksOfClass(classMkh, listBlocksMkh);

                foreach (var block in classMkh.BlocksMkh)
                {
                    block.NosologiesMkh = InitializerHelpers.GetListNosologiesOfBlock(block, listNosologiesMkh);

                    foreach (var nosology in block.NosologiesMkh)
                    {
                        nosology.DiagnosesMkh = InitializerHelpers.GetListDiagnosesOfNosology(nosology, listDiagnosesMkh);
                    }
                }
            }

            context.ClassesMkh.AddRange(listClassesMkh);
        }
       
    }
}
