using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MedicalDocManagment.SharedUI.Helpers
{
    public class PagingInfo
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int PageCount { get; set; }
        public long TotalRecordCount { get; set; }
    }
}