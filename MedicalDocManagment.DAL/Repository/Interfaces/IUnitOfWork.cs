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
        IPediatriciansExaminationsRepository PediatriciansExaminationsRepository { get; }

        UsersManager UsersManager { get; }

        bool Save();
    }
}
