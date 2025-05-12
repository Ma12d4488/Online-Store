using E_Commerce_API.DTOs;
using E_Commerce_API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace E_Commerce_API.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class FavoritesController(IFavoriteService favoriteService) : ControllerBase
{
    private readonly IFavoriteService _favoriteService = favoriteService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetFavorites()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var favorites = await _favoriteService.GetFavoritesAsync(userId);
        return Ok(favorites);
    }

    [HttpPost("{productId}")]
    public async Task<IActionResult> AddToFavorites(int productId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        await _favoriteService.AddToFavoritesAsync(userId, productId);
        return Ok();
    }

    [HttpDelete("{productId}")]
    public async Task<IActionResult> RemoveFromFavorites(int productId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        await _favoriteService.RemoveFromFavoritesAsync(userId, productId);
        return NoContent();
    }
}

