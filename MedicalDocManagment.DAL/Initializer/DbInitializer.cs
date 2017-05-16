using System.Data.Entity;

namespace MedicalDocManagment.DAL.Initializer
{    
    public class DbInitializer : DropCreateDatabaseAlways<Context>
    {
        protected override void Seed(Context context)
        {
            InitializerHelpers.FillDbUsers(context);

            InitializerHelpers.FillDbMkh(context);

            ChildrenCardsInitializerHelper.FillChildCardDb(context);
        }
       
    }
}
