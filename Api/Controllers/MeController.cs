using Api.Contracts;
using Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MeController : Controller
{
    public async Task<ActionResult<AppUserDto>> Index(UserManager<ApplicationUser> userManager)
    {
        var user = await userManager.GetUserAsync(User);

        if (user == null)
        {
            return StatusCode(StatusCodes.Status403Forbidden);
        }

        var userDto = AppUserDto.FromModel(user);

        return Ok(userDto);
    }
}