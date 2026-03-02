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
        var demoPassword = "dev";

        if (string.IsNullOrWhiteSpace(demoUsername) || string.IsNullOrWhiteSpace(demoPassword))
        {
            return;
        }

        var dbContext = services.GetRequiredService<AppDbContext>();
        var passwordHasher = services.GetRequiredService<IPasswordHasher<AppUser>>();

        var normalizedUsername = demoUsername.Trim().ToUpperInvariant();
        var existingUser = await dbContext.Users.FirstOrDefaultAsync(user => user.NormalizedUsername == normalizedUsername);

        if (existingUser is not null)
        {
            return;
        }

        var user = new AppUser
        {
            Username = demoUsername.Trim(),
            NormalizedUsername = normalizedUsername,
            PasswordHash = string.Empty,
            Role = "Admin"
        };

        user.PasswordHash = passwordHasher.HashPassword(user, demoPassword);

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();
    }
}
