﻿using MedicalDocManagment.DAL.Enities;
using MedicalDocManagment.DAL.Initializer;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace MedicalDocManagment.DAL
{
    public class Context : IdentityDbContext<User>
    {
        public DbSet<Position> Positions { get; set; }
        public DbSet<ClassMkh> ClassesMkh { get; set; }
        public DbSet<BlockMkh> BlocksMkh { get; set; }
        public DbSet<NosologyMkh> NosologiesMkh { get; set; }
        public DbSet<DiagnosisMkh> DiagnosesMkh { get; set; }

        static Context()
        {
            Database.SetInitializer(new DbInitializer());
        }

        public Context() : base("MedicalDocumentationDb") { }

        public static Context Create()
        {
            return new Context();
        }
    }
}
