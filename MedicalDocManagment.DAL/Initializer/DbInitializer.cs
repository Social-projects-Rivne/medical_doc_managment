using System.Data.Entity;

namespace MedicalDocManagment.DAL.Initializer
{
    public class DbInitializer : DropCreateDatabaseIfModelChanges<Context>
    {
        protected override void Seed(Context context)
        {
            InitializerHelpers.FillDbUsers(context);

            InitializerHelpers.FillDbMkh(context);

            ChildrenCardsInitializerHelper.FillChildCardDb(context);
        }
       
    }
}
