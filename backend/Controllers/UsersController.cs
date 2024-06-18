using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly PasswordHasher<User> _passwordHasher;

    public UsersController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
        _passwordHasher = new PasswordHasher<User>();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(User user)
    {
        try
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
            {
                return BadRequest("Username already exists");
            }

            user.PasswordHash = _passwordHasher.HashPassword(user, user.PasswordHash);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok("User registered successfully");
        }
        catch (Exception ex)
        {
            // Log the exception (ex) as needed
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User login)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == login.Username);
            if (user == null || _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, login.PasswordHash) != PasswordVerificationResult.Success)
            {
                return Unauthorized();
            }

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }
        catch (Exception ex)
        {
            // Log the exception (ex) as needed
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("profile")]
    [Authorize]
    public async Task<IActionResult> GetProfile()
    {
        try
        {
            var username = User.Identity.Name;
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        catch (Exception ex)
        {
            // Log the exception (ex) as needed
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("all")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult> GetAllUsers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            var totalUsers = await _context.Users.CountAsync();
            var users = await _context.Users
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var result = new
            {
                TotalCount = totalUsers,
                Users = users
            };

            return Ok(result);
        }
        catch (Exception ex)
        {
            // Log the exception (ex) as needed
            return StatusCode(500, "Internal server error");
        }
    }


    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> UpdateUserRole(int id, [FromBody] UserRoleUpdateRequest request)
    {
        try
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.Role = request.Role;

            _context.Entry(existingUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            // Log the exception (ex) as needed
            return StatusCode(500, "Internal server error");
        }
    }

    private bool UserExists(int id)
    {
        return _context.Users.Any(e => e.Id == id);
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Issuer"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
