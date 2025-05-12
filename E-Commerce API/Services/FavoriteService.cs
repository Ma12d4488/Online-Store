using E_Commerce_API.DTOs;
using E_Commerce_API.Repositories;
using System;
using E_Commerce_API.Data;
using E_Commerce_API.Models;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce_API.Services;

public class FavoriteService : IFavoriteService
{
    private readonly ApplicationDbContext _context;

    public FavoriteService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProductDto>> GetFavoritesAsync(string userId)
    {
        // Fix: Explicitly cast the Product property to the Product type
        return await _context.Set<Favorite>()
            .Where(f => f.UserId == userId)
            .Include(f => f.Product)
            .Select(f => new ProductDto
            {
                Id = ((Product)f.Product).Id, // Explicit cast to Product
                Title = (string)((Product)f.Product).Title,
                Price = ((Product)f.Product).Price,
                ImageUrl = ((Product)f.Product).ImageUrl
            })
            .ToListAsync();
    }

    public async Task AddToFavoritesAsync(string userId, int productId)
    {
        var exists = await _context.Set<Favorite>()
            .AnyAsync(f => f.UserId == userId && f.ProductId == productId);

        if (!exists)
        {
            _context.Set<Favorite>().Add(new Favorite
            {
                UserId = userId,
                ProductId = productId
            });

            await _context.SaveChangesAsync();
        }
    }

    public async Task RemoveFromFavoritesAsync(string userId, int productId)
    {
        var favorite = await _context.Set<Favorite>()
            .FirstOrDefaultAsync(f => f.UserId == userId && f.ProductId == productId);

        if (favorite != null)
        {
            _context.Set<Favorite>().Remove(favorite);
            await _context.SaveChangesAsync();
        }
    }
}

