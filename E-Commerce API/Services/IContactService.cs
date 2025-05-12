using E_Commerce_API.DTOs;

namespace E_Commerce_API.Services;

public interface IContactService
{
    Task SaveMessageAsync(ContactMessageDto messageDto);
}
