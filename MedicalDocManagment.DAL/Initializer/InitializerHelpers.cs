using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;

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

        public static List<T> GetListMkhsObject <T> (List<T> list, string fileName)
        {
            using (StreamReader file = File.OpenText(mappedFolder + $"{fileName}.json"))
            {
                JsonSerializer serializer = new JsonSerializer();
                list = (List<T>)serializer.Deserialize(file, typeof(List<T>));
            }
            return list;
        }
    }
}
