using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Manager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalDocManagment.DAL.Repository.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IPositionRepository PositionRepository { get; }
        IClassMkhRepository ClassMkhRepository { get; }
        IBlockMkhRepository BlockMkhRepository { get; }
        INosologyMkhRepository NosologyMkhRepository { get; }
        IDiagnosisMkhRepository DiagnosisMkhRepository { get; }
        IChildrenCardsRepository ChildrenCardsRepository { get; }
        IParentRepository ParentRepository { get; }
        IParentChildCardRepository ParentChildCardRepository { get; }
        IImageRepository ImageRepository { get; }
        IPediatriciansExaminationsRepository PediatriciansExaminationsRepository { get; }
        ITherapeuticProceduresRepository TherapeuticProceduresRepository { get; }
        IRehabilitationsRepository RehabilitationsRepository { get; }
        UsersManager UsersManager { get; }

        bool Save();
    }
}
