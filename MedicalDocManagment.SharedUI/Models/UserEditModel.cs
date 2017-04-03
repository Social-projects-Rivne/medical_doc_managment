﻿using FluentValidation.Attributes;
using MedicalDocManagment.UsersDAL.Entities;
using MedicalDocManagment.SharedUI.Models.Validators;

namespace MedicalDocManagment.SharedUI.Models
{
    [Validator(typeof(UserModelValidator))]
    public class UserEditModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        public int PositionId { get; set; }
        public bool IsActive { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}