using System;
using System.Threading.Tasks;
using ECommerce.Application.Common.Caching;
using ECommerce.Application.Product.Commands.CreateProduct;
using ECommerce.Application.Product.Commands.DeleteProduct;
using ECommerce.Application.Product.Commands.UpdateProduct;
using ECommerce.Application.Product.Queries.GetProduct;
using ECommerce.Application.Product.Queries.GetProductImageList;
using ECommerce.Application.Product.Queries.GetProductList;
using ECommerce.Application.Product.Queries.SearchProducts;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Api.Controllers
{
    public class ProductController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] GetProductListQuery.Query query)
        {
            var products = await Mediator.Send(query);

            return HandleResult(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var product = await Mediator.Send(new GetProductQuery.Query { Id = id });

            return HandleResult(product);
        }

        [HttpPost]
        public async Task<IActionResult> Post(CreateProductDto product)
        {
            var result = await Mediator.Send(new CreateProductCommand.Command { Product = product });

            return HandleResult(result);
        }

        [HttpPut]
        public async Task<IActionResult> Put(UpdateProductDto product)
        {
            var result = await Mediator.Send(new UpdateProductCommand.Command { Product = product });

            return HandleResult(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var product = await Mediator.Send(new DeleteProductCommand.Command { Id = id });

            return HandleResult(product);
        }

        [HttpGet("search")]
        [Cache(120)]
        public async Task<IActionResult> Search(string query)
        {
            var results = await Mediator.Send(new SearchProductsQuery.Query { SearchQuery = query });

            return HandleResult(results);
        }

        [HttpGet("product-images/{productId}")]
        public async Task<IActionResult> GetProductImageList(Guid productId)
        {
            var result = await Mediator.Send(new GetProductImageListQuery.Query { ProductId = productId });

            return HandleResult(result);
        }
    }
}