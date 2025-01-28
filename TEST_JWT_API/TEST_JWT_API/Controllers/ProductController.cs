using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using TEST_JWT_API.Models;

namespace TEST_JWT_API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;
        //Variables para gestion de acceso
        private readonly DbTestContext _dbTestContext;

        public ProductController(ILogger<ProductController> logger, DbTestContext dbTestContext)
        {
            _logger = logger;
            _dbTestContext = dbTestContext;
        }

        //------------------------------------
        //Obtener productos
        //------------------------------------
        [HttpGet]
        [Route("List")]
        public async Task<IActionResult> Lista()
        {
            var listProduct = await _dbTestContext.Productos.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, obj = listProduct });
        }
    }
}
