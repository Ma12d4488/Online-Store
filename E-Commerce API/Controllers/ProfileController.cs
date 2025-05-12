using E_Commerce_API.DTOs;
using E_Commerce_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce_API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    public ProfileController(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<UserProfileDto>> GetProfile()
    {
        var user = await _userManager.GetUserAsync(User);
        return Ok(new UserProfileDto
        {
            Email = user.Email,
            FullName = user.FullName,
            PhoneNumber = user.PhoneNumber
        });
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProfile(UserProfileDto profileDto)
    {
        var user = await _userManager.GetUserAsync(User);
        user.FullName = profileDto.FullName;
        user.PhoneNumber = profileDto.PhoneNumber;
        await _userManager.UpdateAsync(user);
        return NoContent();
    }
}
