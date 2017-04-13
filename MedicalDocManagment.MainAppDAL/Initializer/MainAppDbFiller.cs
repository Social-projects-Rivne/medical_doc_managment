using Ploeh.AutoFixture;
using System.Collections.Generic;
using System.Linq;

using MedicalDocManagment.MainAppDAL.Entities;

namespace MedicalDocManagment.MainAppDAL.Initializer
{
    // Class contains methods for filling main-app part of database with some values
    public static class MainAppDbFiller
    {
        public static void FillMainAppDb(MainAppContext mainAppContext)
        {
            var childrenCards = CreateChildCards();
            CreateDiagnosesForChildCards(childrenCards);
            CreateParentsForSomeChildren(mainAppContext, childrenCards);

            mainAppContext.ChildrenCards.AddRange(childrenCards);
            mainAppContext.SaveChanges();
        }

        private static IEnumerable<ChildCard> CreateChildCards()
        {
            Fixture fixture = new Fixture();

            return fixture.Build<ChildCard>()
                          .Without(childCard => childCard.ParentsChildren)
                          .CreateMany(30);
        }

        private static void CreateDiagnosesForChildCards(IEnumerable<ChildCard> childrenCards)
        {
            var diagnosisId = 1;
            foreach (ChildCard childCard in childrenCards)
            {
                childCard.Diagnosis.Id = "A" + (diagnosisId++).ToString();
            }
        }

        private static void CreateParentsForSomeChildren(
            MainAppContext mainAppContext,
            IEnumerable<ChildCard> childrenCards
            )
        {
            var fixture = new Fixture();
            // special variable for variating number of parents from 0 to 2
            var parentsCount = 0;

            foreach (ChildCard childCard in childrenCards)
            {
                IEnumerable<Parent> parents = fixture.Build<Parent>()
                                                     .Without(parent => parent.ParentsChildren)
                                                     .CreateMany(parentsCount).ToList();
                foreach (Parent parent in parents)
                {
                    mainAppContext.Parents.Add(parent);

                    ParentChildCard parentChildCard = new ParentChildCard
                    {
                        ChildCard = childCard,
                        Parent = parent
                    };
                    mainAppContext.ParentsChildrenCards.Add(parentChildCard);
                }
                parentsCount = (++parentsCount) % 3;
            }
        }
    }
}
