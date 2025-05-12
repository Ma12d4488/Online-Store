namespace E_Commerce_API.Models;

public class Favorite
{
    public string UserId { get; set; }
    public int ProductId { get; set; }

    public User User { get; set; }
    public Product Product { get; set; }
}
