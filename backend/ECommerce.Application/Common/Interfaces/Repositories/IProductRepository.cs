using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ECommerce.Domain.Entities;

namespace ECommerce.Application.Common.Interfaces.Repositories
{
    public interface IProductRepository : IRepository<ECommerce.Domain.Entities.Product>
    {
        
    }
}