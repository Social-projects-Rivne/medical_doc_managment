using MedicalDocManagment.DAL.Entities;
using Ploeh.AutoFixture;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MedicalDocManagment.DAL.Initializer
{
    internal static class ChildrenCardsInitializerHelper
    {
        public static void FillChildCardDb(Context context)
        {
            var childrenCards = CreateChildCards();
            CreateParentsForSomeChildren(context, childrenCards);

            context.ChildrenCards.AddRange(childrenCards);
            context.SaveChanges();
        }

        private static IEnumerable<ChildCard> CreateChildCards()
        {
            var fixture = new Fixture();

            var randomCards = fixture.Build<ChildCard>()
                                    .Without(childCard => childCard.ParentsChildren)
                                    .Without(childCard => childCard.DiagnosisId)
                                    .Without(childCard => childCard.Diagnosis)
                                    .CreateMany(30);

            var petrenkosCards = fixture.Build<ChildCard>()
                                        .With(childCard => childCard.LastName, "Петренко")
                                        .With(childCard => childCard.FirstName, "Петро")
                                        .With(childCard => childCard.SecondName, "Петрович")
                                        .With(childCard => childCard.Date, new DateTime(2001, 01, 01))
                                        .With(childCard => childCard.DiagnosisId, "A00.0")
                                        .Without(childCard => childCard.ParentsChildren)
                                        .Without(childCard => childCard.Diagnosis)
                                        .CreateMany(3);

            return randomCards.Concat(petrenkosCards);
        }

        private static void CreateParentsForSomeChildren(
            Context context,
            IEnumerable<ChildCard> childrenCards
            )
        {
            var fixture = new Fixture();
            // special variable for variating number of parents from 0 to 2
            var parentsCount = 0;

            foreach (var childCard in childrenCards)
            {
                var parents = fixture.Build<Parent>()
                                                     .Without(parent => parent.ParentsChildren)
                                                     .CreateMany(parentsCount).ToList();
                foreach (var parent in parents)
                {
                    context.Parents.Add(parent);

                    var parentChildCard = new ParentChildCard
                    {
                        ChildCard = childCard,
                        Parent = parent
                    };
                    context.ParentsChildrenCards.Add(parentChildCard);
                }
                parentsCount = (++parentsCount) % 3;
            }
        }
    }
}
