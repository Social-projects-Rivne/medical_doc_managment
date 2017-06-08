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

            var sidorenkosCards = fixture.Build<ChildCard>()
                                         .With(childCard => childCard.LastName, "Сидоренко")
                                         .With(childCard => childCard.FirstName, "Сидор")
                                         .With(childCard => childCard.SecondName, "Сидорович")
                                         .With(childCard => childCard.Date, new DateTime(2007, 07, 07))
                                         .With(childCard => childCard.DiagnosisId, "V80.4")
                                         .Without(childCard => childCard.ParentsChildren)
                                         .Without(childCard => childCard.DiagnosisId)
                                         .Without(childCard => childCard.Diagnosis)
                                         .Without(childCard => childCard.PsychiatristsConclusion)
                                         .Without(childCard => childCard.PediatriciansExaminationId)
                                         .Without(childCard => childCard.PediatriciansExamination)
                                         .Without(childCard => childCard.NeurologistsExaminationId)
                                         .Without(childCard => childCard.NeurologistsExamination)
                                         .Without(childCard => childCard.SpeechTherapistsExaminationId)
                                         .Without(childCard => childCard.SpeechTherapistsExamination)
                                         .Without(childCard => childCard.Visits)
                                         .CreateMany(30);

            var ivanenkosCards = fixture.Build<ChildCard>()
                                        .With(childCard => childCard.LastName, "Іваненко")
                                        .With(childCard => childCard.FirstName, "Іван")
                                        .With(childCard => childCard.SecondName, "Іванович")
                                        .With(childCard => childCard.Date, new DateTime(2004, 04, 04))
                                        .With(childCard => childCard.DiagnosisId, "A03.2")
                                        .Without(childCard => childCard.CheckOut)
                                        .Without(childCard => childCard.ParentsChildren)
                                        .Without(childCard => childCard.Diagnosis)
                                        .Without(childCard => childCard.DiagnosisId)
                                        .Without(childCard => childCard.PediatriciansExaminationId)
                                        .Without(childCard => childCard.PediatriciansExamination)
                                        .Without(childCard => childCard.NeurologistsExaminationId)
                                        .Without(childCard => childCard.NeurologistsExamination)
                                        .Without(childCard => childCard.SpeechTherapistsExaminationId)
                                        .Without(childCard => childCard.SpeechTherapistsExamination)
                                        .Without(childCard => childCard.Visits)
                                        .CreateMany(6);

            var petrenkosCards = fixture.Build<ChildCard>()
                                        .With(childCard => childCard.LastName, "Петренко")
                                        .With(childCard => childCard.FirstName, "Петро")
                                        .With(childCard => childCard.SecondName, "Петрович")
                                        .With(childCard => childCard.Date, new DateTime(2001, 01, 01))
                                        .With(childCard => childCard.DiagnosisId, "A00.0")
                                        .Without(childCard => childCard.ParentsChildren)
                                        .Without(childCard => childCard.Diagnosis)
                                        .Without(childCard => childCard.PediatriciansExaminationId)
                                        .Without(childCard => childCard.PediatriciansExamination)
                                        .Without(childCard => childCard.NeurologistsExaminationId)
                                        .Without(childCard => childCard.NeurologistsExamination)
                                        .Without(childCard => childCard.SpeechTherapistsExaminationId)
                                        .Without(childCard => childCard.SpeechTherapistsExamination)
                                        .Without(childCard => childCard.Visits)
                                        .CreateMany(5);

            return sidorenkosCards.Concat(ivanenkosCards).Concat(petrenkosCards);
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
