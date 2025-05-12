using E_Commerce_API.DTOs;
using E_Commerce_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce_API.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;

    public ContactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    [HttpPost]
    public async Task<IActionResult> SendMessage(ContactMessageDto message)
    {
        await _contactService.SaveMessageAsync(message);
        return Ok(new { message = "Message received. We'll contact you soon!" });
    }
}
