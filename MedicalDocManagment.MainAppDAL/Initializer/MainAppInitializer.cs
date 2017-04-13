using System.Data.Entity;

namespace MedicalDocManagment.MainAppDAL.Initializer
{
    // TODO in production change inherited class to CreateDatabaseIfNotExists
    class MainAppInitializer : DropCreateDatabaseIfModelChanges<MainAppContext>
    {
        protected override void Seed(MainAppContext context)
        {
            MainAppDbFiller.FillMainAppDb(context);
        }
    }
}
