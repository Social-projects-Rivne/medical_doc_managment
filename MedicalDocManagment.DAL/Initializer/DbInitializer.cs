using System.Data.Entity;
using Ploeh.AutoFixture;
using System.Collections.Generic;
using MedicalDocManagment.DAL.Entities;

namespace MedicalDocManagment.DAL.Initializer
{
    public class DbInitializer : DropCreateDatabaseAlways<Context>
    {
        protected override void Seed(Context context)
        {
            var usersList = InitializerHelpers.FillingDbOfUsers();
            foreach (var user in usersList) {
                context.Users.Add(user);
            }

            #region Filling DB of MKH's data
            ICollection<ClassMkh> listClassesMkh = InitializerHelpers.GetListClassesMkh();
            ICollection<BlockMkh> listBlocksMkh = InitializerHelpers.GetListBlocksMkh();
            ICollection<NosologyMkh> listNosologiesMkh = InitializerHelpers.GetListNosologiesMkh();
            ICollection<DiagnosisMkh> listDiagnosesMkh = InitializerHelpers.GetListDiagnosesMkh();

            listClassesMkh = InitializerHelpers.FillClassesOfOtherMkhsModels(listClassesMkh, listBlocksMkh, listNosologiesMkh, listDiagnosesMkh);

            context.ClassesMkh.AddRange(listClassesMkh);
            #endregion 

            // Bug
            //InitializerHelpers.FillChildCardDb(context);
        }
       
    }
}
