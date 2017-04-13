using MedicalDocManagment.DAL.Enities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace MedicalDocManagment.DAL.Initializer
{
    internal static class InitializerHelpers
    {
        static string projectPath = AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
        static string mappedFolder = projectPath + @"\src\";

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

        public static List<T> GetListMkhsObject<T>(List<T> list, string fileName)
        {
            using (StreamReader file = File.OpenText(mappedFolder + $"{fileName}.json"))
            {
                JsonSerializer serializer = new JsonSerializer();
                list = (List<T>)serializer.Deserialize(file, typeof(List<T>));
            }
            return list;
        }

        public static List<DiagnosisMkh> GetListDiagnosesMkh()
        {
            string jsonDiasnosesText = File.ReadAllText(mappedFolder + "diagnoses.json");
            var diagnosisJson = JArray.Parse(jsonDiasnosesText);
            var listDiagnoses = diagnosisJson.Select(i => new DiagnosisMkh
            {
                Id = (string)i["l"] + (string)i["n1"] + "." + (string)i["n2"],
                Name = (string)i["label"],
            })
            .ToList();
            return listDiagnoses;
        }

        public static List<NosologyMkh> GetListNosologiesMkh()
        {
            string jsonNosologyText = File.ReadAllText(mappedFolder + "nosologies.json");
            var nosologyJson = JArray.Parse(jsonNosologyText);
            var listNosologies = nosologyJson.Select(i => new NosologyMkh
            {
                Id = i["l"].ToString() + i["n1"].ToString(),
                Name = i["label"].ToString(),
            })
              .ToList();

            return listNosologies;
        }

        public static List<BlockMkh> GetListBlocksMkh()
        {
            string jsonBlockText = File.ReadAllText(mappedFolder + "blocks.json");
            var blockJson = JArray.Parse(jsonBlockText);
            var listBlocks = blockJson.Select(i => new BlockMkh
            {
                Id = GetIdByJsonClassAndBlockMkh(i),
                Name = (string)i["label"],
            })
            .ToList();
            return listBlocks;
        }

        public static List<ClassMkh> GetListClassesMkh()
        {
            string jsonText = File.ReadAllText(mappedFolder + "classes.json");
            var json = JArray.Parse(jsonText);
            var listClasses = json.Select(i => new ClassMkh
            {
                Id = GetIdByJsonClassAndBlockMkh(i),
                Name = (string)i["label"]
            })
            .ToList();

            return listClasses;
        }

        public static bool IsDiagnosisInNosologyRange(string nosologyId, string diagnosisId)
        {
            var diagnosisRegex = Regex.Matches(diagnosisId, @"[A-Z]\d{2}");
            string diagnosisStart = diagnosisRegex[0].Value;

            return String.Compare(nosologyId, diagnosisStart) == 0;
        }

        public static bool IsNosologyInBlockRange(string blockId, string nosologyId)
        {
            var blockRegex = Regex.Matches(blockId, @"[A-Z]\d{2}");

            string blockStart = blockRegex[0].Value;
            string blockEnd = blockRegex[1].Value;

            string nosologySection = nosologyId;

            //return nosologyId >= blockStart && nosologyId <= blockEnd
            return String.Compare(nosologySection, blockStart) >= 0 && String.Compare(nosologySection, blockEnd) <= 0;
        }

        public static bool IsBlockInClassRange(string classId, string blockId)
        {
            var classRegex = Regex.Matches(classId, @"[A-Z]\d{2}");
            var blockRegex = Regex.Matches(blockId, @"[A-Z]\d{2}");

            string classStart = classRegex[0].Value;
            string classEnd = classRegex[1].Value;

            string blockStart = blockRegex[0].Value;
            string blockEnd = blockRegex[1].Value;

            //return blockStart >= classStart && blockEnd <= classEnd;
            return String.Compare(blockStart, classStart) >= 0 && String.Compare(blockEnd, classEnd) <= 0;
        }

        public static string GetIdByJsonClassAndBlockMkh(JToken classMkh)
        {
            return (string)classMkh["l1"] + (string)classMkh["n1"] + "-" + (string)classMkh["l2"] + (string)classMkh["n2"];
        }

        public static List<BlockMkh> GetListBlocksOfClass(ClassMkh classMkh, List<BlockMkh> listBlocksMkh) {
            var filteredList = listBlocksMkh.Where(block => InitializerHelpers.IsBlockInClassRange(classMkh.Id, block.Id)).ToList();
            return filteredList;
        }

        public static List<NosologyMkh> GetListNosologiesOfBlock(BlockMkh block, List<NosologyMkh> listNosologiesMkh)
        {
            var filteredList = listNosologiesMkh.Where(nosology =>InitializerHelpers.IsNosologyInBlockRange(block.Id, nosology.Id)).ToList();
            return filteredList;
        }

        public static List<DiagnosisMkh> GetListDiagnosesOfNosology(NosologyMkh nosology, List<DiagnosisMkh> listDiagnosesMkh)
        {
            var filteredList = listDiagnosesMkh.Where(diagnosis => InitializerHelpers.IsDiagnosisInNosologyRange(nosology.Id, diagnosis.Id)).ToList();
            return filteredList;
        }

    }
}
