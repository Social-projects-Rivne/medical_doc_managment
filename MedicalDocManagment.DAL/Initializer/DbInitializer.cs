﻿using System.Data.Entity;

namespace MedicalDocManagment.DAL.Initializer
{
    // TODO
    //public class DbInitializer : DropCreateDatabaseAlways<Context>
        public class DbInitializer : CreateDatabaseIfNotExists<Context>
    {
        protected override void Seed(Context context)
        {
            InitializerHelpers.FillDbUsers(context);

            InitializerHelpers.FillDbMkh(context);

            ChildrenCardsInitializerHelper.FillChildCardDb(context);
        }
       
    }
}
