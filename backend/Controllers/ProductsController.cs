using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Products
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            var products = await _context.Products
                                         .Skip((pageNumber - 1) * pageSize)
                                         .Take(pageSize)
                                         .ToListAsync();
            return Ok(products);
        }
        catch (Exception ex)
        {
            // Log the exception (ex) as needed
            return StatusCode(500, "Internal server error");
        }
    }
    
    [HttpGet("search")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Product>>> SearchProducts([FromQuery] string name)
    {
        if (string.IsNullOrEmpty(name))
        {
            return BadRequest("El parámetro de búsqueda no puede estar vacío.");
        }

        var products = await _context.Products
            .Where(p => p.Name.Contains(name))
            .ToListAsync();

        return Ok(products);
    }

    // GET: api/Products/5
    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        try
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }
        catch (Exception ex)
        {
            // Log the exception (ex) as needed
            return StatusCode(500, "Internal server error");
        }
    }

    // POST: api/Products
    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<Product>> PostProduct(Product product)
    {
        try
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }
        catch (Exception ex)
        {
            // Log the exception (ex) as needed
            return StatusCode(500, "Internal server error");
        }
    }

    // PUT: api/Products/5
    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> UpdateProduct(int id, Product updatedProduct)
    {
        try
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            product.Name = updatedProduct.Name;
            product.Description = updatedProduct.Description;
            product.Price = updatedProduct.Price;
            product.Stock = updatedProduct.Stock;
            product.UpdatedAt = DateTime.Now;

            _context.Products.Update(product);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            // Log the exception (ex) as needed
            return StatusCode(500, "Internal server error");
        }
    }

    // DELETE: api/Products/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        try
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            // Log the exception (ex) as needed
            return StatusCode(500, "Internal server error");
        }
    }

    private bool ProductExists(int id)
    {
        return _context.Products.Any(e => e.Id == id);
    }
}
