using E_Commerce_API.Data;
using E_Commerce_API.DTOs;
using E_Commerce_API.Models;
using System;

namespace E_Commerce_API.Services;

public class ContactService : IContactService
{
    private readonly ApplicationDbContext _context;

    public ContactService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task SaveMessageAsync(ContactMessageDto messageDto)
    {
        var message = new ContactMessage
        {
            Name = messageDto.Name,
            Email = messageDto.Email,
            Subject = messageDto.Subject,
            Message = messageDto.Message,
            CreatedAt = DateTime.UtcNow
        };

        _context.ContactMessages.Add(message);
        await _context.SaveChangesAsync();
    }
}

