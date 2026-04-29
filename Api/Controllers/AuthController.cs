using Api.Contracts;
using Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
public class AuthController : Controller
{
    [Route("api/logout")]
    public async Task<ActionResult> Logout(SignInManager<ApplicationUser> signInManager)
    {
        await signInManager.SignOutAsync();

        return Ok();
    }
}