using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MedicalDocManagment.WebUI.Helpers
{
    public class PagedResultHelper<T>
    {
        public List<T> Data { get; private set; }
        public PagingInfo Paging { get; private set; }

        public PagedResultHelper(IEnumerable<T> items, int pageNumber, int pageSize, long totalRecordCount)
        {
            Data = new List<T>(items);
            Paging = new PagingInfo
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalRecordCount = totalRecordCount,
                PageCount = totalRecordCount > 0
                                             ? (int)Math.Ceiling(totalRecordCount / (double)pageSize)
                                             : 0
            };
        }
    }
}