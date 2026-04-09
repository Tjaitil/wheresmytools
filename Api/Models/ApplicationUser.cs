using Microsoft.AspNetCore.Identity;

namespace Api.Models;

public sealed class ApplicationUser : IdentityUser<Guid>
{
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public string Role { get; set; } = "User";
}
