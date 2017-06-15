using System;
using System.IO;
using System.Web;
using System.Drawing;

namespace MedicalDocManagment.WebUI.Helpers
{
    
    public static class ImageHelper
    {
        public static bool IsImageValid(string imagePath, int imageSizeBytes)
        {
            var imageMappedPath = HttpContext.Current.Server.MapPath(imagePath);
            using (var image = Image.FromFile(imageMappedPath))
            {
                decimal size = Math.Round(((decimal)imageSizeBytes / (decimal)1024), 2);
                if (image.Height > 150 || image.Width > 150 || size > 300)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }   
        }
        public static bool IsImage(MultipartDataMediaFormatter.Infrastructure.HttpFile postedFile)
        {
            if (postedFile.MediaType.ToLower() != "image/jpg" &&
                postedFile.MediaType.ToLower() != "image/jpeg" &&
                postedFile.MediaType.ToLower() != "image/pjpeg" &&
                postedFile.MediaType.ToLower() != "image/gif" &&
                postedFile.MediaType.ToLower() != "image/x-png" &&
                postedFile.MediaType.ToLower() != "image/png")
            {
                return false;
            }
            if (Path.GetExtension(postedFile.FileName).ToLower() != ".jpg"
                && Path.GetExtension(postedFile.FileName).ToLower() != ".png"
                && Path.GetExtension(postedFile.FileName).ToLower() != ".gif"
                && Path.GetExtension(postedFile.FileName).ToLower() != ".jpeg")
            {
                return false;
            }

            return true;
        }
    } 
}