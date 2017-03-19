﻿using MedicalDocManagment.UsersDAL;
using MedicalDocManagment.WebUI.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MedicalDocManagment.WebUI.Controllers.api
{
    public class AdminController : ApiController
    {
        private UsersManager UsersManager = HttpContext.Current.GetOwinContext().GetUserManager<UsersManager>();

        [HttpGet]
        public IHttpActionResult GetUsers()
        {
            return Ok(UsersManager.Users.ToList());
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            var user = await UsersManager.FindByIdAsync(id.ToString());

            if (user == null)
                return NotFound();

             return Ok(user);
        }
        public async Task<IdentityResult> AddUser(UserViewModel userModel)
        {
            var user = new User
            {
                UserName = userModel.UserName,
                Email = userModel.Email,
                FirstName = userModel.FirstName,
                SecondName = userModel.SecondName,
                LastName = userModel.LastName,
                Position = userModel.Position,
                IsActive = true
            };
            var result = await UsersManager.CreateAsync(user, userModel.Password);
            return result;
        }

        [HttpPut]
        public async Task<IHttpActionResult> EditUser(UserEditViewModel userModel)
        {
            var userInDb = await UsersManager.FindByIdAsync(userModel.Id.ToString());

            if (userInDb == null)
                return NotFound();

            userInDb.FirstName = userModel.FirstName;
            userInDb.LastName = userModel.LastName;
            userInDb.SecondName = userModel.SecondName;
            userInDb.Position = userModel.Position;
            userInDb.IsActive = userModel.IsActive;

            var result = await UsersManager.UpdateAsync(userInDb);
            return Ok(result);
        }
        
    }
}
