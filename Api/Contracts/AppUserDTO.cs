namespace Api.Contracts;

using Api.Models;

public sealed record AppUserDto(
    Guid Id,
    string Username,
    string Role,
    DateTime CreatedAtUtc)
{
    public static AppUserDto FromModel(AppUser user) =>
        new(user.Id, user.Username, user.Role, user.CreatedAtUtc);
}
