using E_Commerce_API.DTOs;

namespace E_Commerce_API.Repositories;

public interface IFavoriteService
{
    Task<IEnumerable<ProductDto>> GetFavoritesAsync(string userId);
    Task AddToFavoritesAsync(string userId, int productId);
    Task RemoveFromFavoritesAsync(string userId, int productId);
}
