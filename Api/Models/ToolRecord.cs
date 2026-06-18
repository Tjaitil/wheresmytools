namespace Api.Models;

public enum ToolRecordType
{
    Moved,
    CheckedOut,
    Returned
}

public sealed class ToolRecord
{
    public Guid Id { get; init; }
    public Guid ToolId { get; init; }
    public Guid UserId { get; init; }
    public Guid? FromLocationId { get; init; }
    public Guid? ToLocationId { get; init; }
    public ToolRecordType Type { get; init; }
    public string? Note { get; init; }
    public DateTime CreatedAt { get; init; }
    public Tool Tool { get; init; } = null!;
    public ApplicationUser User { get; init; } = null!;
    public ToolboxLocation? FromLocation { get; init; }
    public ToolboxLocation? ToLocation { get; init; }
}
