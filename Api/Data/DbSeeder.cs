using Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public static class DbSeeder
{
    /// <summary>
    ///  Seeds the database with initial data
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    /// <returns></returns>
    public static async Task seedAsync(IServiceProvider services, IConfiguration configuration)
    {
        var demoUsername = "test";
        var demoEmail = "test@example.com";
        var demoPassword = "Wertyd456!";

        if (string.IsNullOrWhiteSpace(demoUsername) || string.IsNullOrWhiteSpace(demoPassword))
        {
            return;
        }

        var dbContext = services.GetRequiredService<AppDbContext>();
        var passwordHasher = services.GetRequiredService<IPasswordHasher<ApplicationUser>>();

        var normalizedUsername = demoUsername.Trim().ToUpperInvariant();
        var existingUser =
            await dbContext.Users.FirstOrDefaultAsync(user => user.NormalizedUserName == normalizedUsername);

        if (existingUser is not null)
        {
            return;
        }

        var user = new ApplicationUser
        {
            UserName = demoUsername.Trim(),
            NormalizedUserName = normalizedUsername,
            Email = demoEmail,
            NormalizedEmail = demoEmail.Trim().ToUpperInvariant(),
            PasswordHash = string.Empty,
            Role = "Admin"
        };

        user.PasswordHash = passwordHasher.HashPassword(user, demoPassword);

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();
    }
}