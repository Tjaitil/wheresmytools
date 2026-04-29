namespace Api.Contracts;

using Api.Models;

public sealed record AppUserDto(
    Guid Id,
    string Username,
    string Role,
    DateTime CreatedAtUtc)
{
    public static AppUserDto FromModel(ApplicationUser user) =>
        new(user.Id, user.UserName ?? string.Empty, user.Role, user.CreatedAtUtc);
}