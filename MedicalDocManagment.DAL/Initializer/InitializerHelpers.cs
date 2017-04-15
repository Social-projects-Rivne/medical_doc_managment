using MedicalDocManagment.DAL.Entities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Ploeh.AutoFixture;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace MedicalDocManagment.DAL.Initializer
{
    internal static class InitializerHelpers
    {
        static readonly string ProjectPath = AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
        static readonly string MappedFolder = ProjectPath + @"\src\";

        public static string GenerateUserName(int userCounter)
        {
            return $"username{userCounter}";
        }

        public static string GenerateEmail(int userCounter)
        {
            return GenerateUserName(userCounter) + "@email.com";
        }

        public static string GeneratePositionName(int positionCounter)
        {
            return $"Position{positionCounter}";
        }

        public static void FillDbUsers(Context context)
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
                user.Position = new Position { Name = GeneratePositionName(positionCounter) };
                user.UserName = GenerateUserName(userCounter);
                user.Email = GenerateEmail(userCounter);

                context.Users.Add(user);

                userCounter++;
                positionCounter++;
            }
        }

        public static void FillDbMkh(Context context)
        {
            var listClassesMkh = GetListClassesMkh();
            var listBlocksMkh = GetListBlocksMkh();
            var listNosologiesMkh = GetListNosologiesMkh();
            var listDiagnosesMkh = GetListDiagnosesMkh();

            listClassesMkh = FillClassesOfOtherMkhsModels(listClassesMkh, listBlocksMkh, listNosologiesMkh, listDiagnosesMkh);

            context.ClassesMkh.AddRange(listClassesMkh);
        }

        #region MKH's function

        public static List<ClassMkh> FillClassesOfOtherMkhsModels(List<ClassMkh> listClasses,
            List<BlockMkh> listBlocks,
            List<NosologyMkh> listNosologies,
            List<DiagnosisMkh> listDiagnoses)
        {
            foreach (var classMkh in listClasses)
            {
                classMkh.BlocksMkh = GetListBlocksOfClass(classMkh, listBlocks);
                classMkh.BlocksMkh = FillBlocksOFNosologies(classMkh.BlocksMkh.ToList(), listNosologies, listDiagnoses);
            }

            return listClasses;
        }

        public static List<BlockMkh> FillBlocksOFNosologies(List<BlockMkh> listBlocks,
                                                            List<NosologyMkh> listNosologies,
                                                            List<DiagnosisMkh> listDiagnoses)
        {
            foreach (var block in listBlocks)
            {
                block.NosologiesMkh = GetListNosologiesOfBlock(block, listNosologies);
                block.NosologiesMkh = FillNosologiesOfDiagnoses(block.NosologiesMkh.ToList(), listDiagnoses);
            }

            return listBlocks;
        }

        public static List<NosologyMkh> FillNosologiesOfDiagnoses(List<NosologyMkh> listNosologies,
                                                                  List<DiagnosisMkh> listDiagnoses)
        {
            foreach (var nosology in listNosologies)
            {
                nosology.DiagnosesMkh = GetListDiagnosesOfNosology(nosology, listDiagnoses);
            }

            return listNosologies;
        }

        public static List<DiagnosisMkh> GetListDiagnosesMkh()
        {
            var diagnosesJson = ReadFileAsJArray("diagnoses.json");
            var listDiagnoses = diagnosesJson.Select(diagnosis => new DiagnosisMkh
            {
                Id = GetIdForDiagnosis(diagnosis),
                Name = (string)diagnosis["label"],
            })
                                                                  .ToList();
            return listDiagnoses;
        }

        public static List<NosologyMkh> GetListNosologiesMkh()
        {
            var nosologiesJson = ReadFileAsJArray("nosologies.json");
            var listNosologies = nosologiesJson.Select(nosology => new NosologyMkh
            {
                Id = nosology["l"].ToString() + nosology["n1"].ToString(),
                Name = nosology["label"].ToString(),
            })
                                                          .ToList();
            return listNosologies;
        }

        public static List<BlockMkh> GetListBlocksMkh()
        {
            var blocksJson = ReadFileAsJArray("blocks.json");
            var listBlocks = blocksJson.Select(block => new BlockMkh
            {
                Id = GetIdClassAndBlockMkh(block),
                Name = (string)block["label"],
            })
                                                       .ToList();
            return listBlocks;
        }

        public static List<ClassMkh> GetListClassesMkh()
        {
            var classesJson = ReadFileAsJArray("classes.json");
            var listClasses = classesJson.Select(classMkh => new ClassMkh
            {
                Id = GetIdClassAndBlockMkh(classMkh),
                Name = (string)classMkh["label"]
            })
                                                             .ToList();
            return listClasses;
        }

        private static JArray ReadFileAsJArray(string fileName)
        {
            var jsonText = File.ReadAllText(MappedFolder + fileName);
            var jArrayObj = JArray.Parse(jsonText);

            return jArrayObj;
        }

        public static bool IsDiagnosisInNosologyRange(string nosologyId, string diagnosisId)
        {
            var diagnosisRegex = Regex.Matches(diagnosisId, @"[A-Z]\d{2}");
            var diagnosisStart = diagnosisRegex[0].Value;

            return String.Compare(nosologyId, diagnosisStart) == 0;
        }

        public static bool IsNosologyInBlockRange(string blockId, string nosologyId)
        {
            var blockRegex = Regex.Matches(blockId, @"[A-Z]\d{2}");
            var blockStart = blockRegex[0].Value;
            var blockEnd = blockRegex[1].Value;
            var nosologySection = nosologyId;

            return String.Compare(nosologySection, blockStart) >= 0 &&
                   String.Compare(nosologySection, blockEnd) <= 0;
        }

        public static bool IsBlockInClassRange(string classId, string blockId)
        {
            var classRegex = Regex.Matches(classId, @"[A-Z]\d{2}");
            var blockRegex = Regex.Matches(blockId, @"[A-Z]\d{2}");
            var classStart = classRegex[0].Value;
            var classEnd = classRegex[1].Value;
            var blockStart = blockRegex[0].Value;
            var blockEnd = blockRegex[1].Value;

            return String.Compare(blockStart, classStart) >= 0 && String.Compare(blockEnd, classEnd) <= 0;
        }

        public static string GetIdClassAndBlockMkh(JToken classOrBlock)
        {
            return (string)classOrBlock["l1"] + (string)classOrBlock["n1"] + "-" + (string)classOrBlock["l2"] + (string)classOrBlock["n2"];
        }

        private static string GetIdForDiagnosis(JToken diagnosis)
        {
            return (string)diagnosis["l"] + (string)diagnosis["n1"] + "." + (string)diagnosis["n2"];
        }

        public static List<BlockMkh> GetListBlocksOfClass(ClassMkh classMkh, List<BlockMkh> listBlocksMkh)
        {
            var filteredList = listBlocksMkh.Where(block => IsBlockInClassRange(classMkh.Id, block.Id))
                                            .ToList();
            return filteredList;
        }

        public static List<NosologyMkh> GetListNosologiesOfBlock(BlockMkh block, List<NosologyMkh> listNosologiesMkh)
        {
            var filteredList = listNosologiesMkh.Where(nosology => IsNosologyInBlockRange(block.Id, nosology.Id)).ToList();

            return filteredList;
        }

        public static List<DiagnosisMkh> GetListDiagnosesOfNosology(NosologyMkh nosology, List<DiagnosisMkh> listDiagnosesMkh)
        {
            var filteredList = listDiagnosesMkh.Where(diagnosis => IsDiagnosisInNosologyRange(nosology.Id, diagnosis.Id)).ToList();

            return filteredList;
        }
        #endregion

        #region Children cards
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

            var childCards = fixture.Build<ChildCard>()
                                  .Without(childCard => childCard.ParentsChildren)
                                  .Without(childCard => childCard.Diagnosis)
                                  .CreateMany(30);

            foreach (var childCard in childCards)
            {
                childCard.DiagnosisId = "A00.0";
            }

            return childCards;
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

        #endregion
    }
}
