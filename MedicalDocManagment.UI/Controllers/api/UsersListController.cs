using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MedicalDocManagment.UI.Controllers.api
{
    public class UsersListController : ApiController
    {
        public IHttpActionResult GetAll()
        {
            var list = new List<Object>();

            list.Add(new { id = 1, name = "Test User 1" });
            list.Add(new { id = 2, name = "Test User 2" });
            list.Add(new { id = 3, name = "Test User 3" });
            list.Add(new { id = 4, name = "Test User 4" });

            return Ok(list);
        }

    }
}
