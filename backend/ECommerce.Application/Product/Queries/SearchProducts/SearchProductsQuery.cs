using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ECommerce.Application.Common.Interfaces;
using ECommerce.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Application.Product.Queries.SearchProducts
{
    public class SearchProductsQuery
    {
        public class Query : IRequest<Result<List<SearchResultDto>>>
        {
            public string SearchQuery { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<SearchResultDto>>>
        {
            private readonly IUnitOfWork _uow;

            public Handler(IUnitOfWork uow)
            {
                _uow = uow;
            }

            public async Task<Result<List<SearchResultDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                if (string.IsNullOrWhiteSpace(request.SearchQuery)) 
                {
                    return Result<List<SearchResultDto>>.Success(new List<SearchResultDto>());
                }

                var searchQuery = request
                    .SearchQuery
                    .ToLower()
                    .Trim();

                var results = await _uow
                    .ProductRepository
                    .AsQueryable(x => x.Name.ToLower().Contains(searchQuery) || x.Branch.Name.ToLower().Contains(searchQuery))
                    .Include(x => x.Images)
                    .Select(x => new SearchResultDto {
                        Id = Guid.NewGuid(),
                        BrandName = x.Branch.Name,
                        PictureUrl = x.Images.FirstOrDefault(i => i.IsMain).Url,
                        ProductName = x.Name,
                        Url = $"/product/{x.Id}"
                    })
                    .Take(6)
                    .ToListAsync(cancellationToken: cancellationToken);

                return Result<List<SearchResultDto>>.Success(results);

            }
        }
    }
}