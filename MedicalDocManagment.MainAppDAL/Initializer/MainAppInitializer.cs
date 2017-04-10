using MedicalDocManagment.MainAppDAL.Entities;
using Ploeh.AutoFixture;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace MedicalDocManagment.MainAppDAL.Initializer
{
    // TODO in production change inherited class to CreateDatabaseIfNotExists
    class MainAppInitializer : DropCreateDatabaseIfModelChanges<MainAppContext>
    {
        protected override void Seed(MainAppContext context)
        {
            Fixture fixture = new Fixture();

            IEnumerable<ChildCard> childrenCards = fixture.Build<ChildCard>()
                                                   .Without(childCard => childCard.Parents)
                                                   .CreateMany(30);

            int parentsCount = 0;
            // special variable using which we can guarantee that ID strings will contain unique
            // values.
            int id = 1;
            foreach (ChildCard childCard in childrenCards)
            {
                childCard.Id = id++;
                childCard.Diagnosis.Id = id++;

                childCard.Parents = fixture.Build<Parent>()
                                           .Without(parent => parent.ChildrenCards)
                                           .CreateMany(parentsCount).ToList();

                foreach (Parent parent in childCard.Parents)
                {
                    parent.Id = id++;
                }

                parentsCount = (++parentsCount) % 3;

                context.ChildrenCards.Add(childCard);
            }
            context.SaveChanges();
        }
    }
}
