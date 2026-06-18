namespace Api.Models;

public sealed class ToolboxMember
{
    public Guid Id { get; init; }
    public Guid ToolboxId { get; init; }
    public Guid UserId { get; init; }
    public DateTime JoinedAt { get; init; }
    public Toolbox Toolbox { get; init; } = null!;
    public ApplicationUser User { get; init; } = null!;
}
