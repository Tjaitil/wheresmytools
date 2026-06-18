using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public sealed class Tool
{
    public Guid Id { get; init; }
    [MaxLength(100)] public required string Name { get; set; }
    [MaxLength(500)] public string? Description { get; set; }
    public DateTime CreationDate { get; init; }
    public Guid OwnerId { get; init; }
    public Guid ToolboxId { get; set; }
    public Guid? ToolboxLocationId { get; set; }
    public ApplicationUser Owner { get; init; } = null!;
    public Toolbox Toolbox { get; set; } = null!;
    public ToolboxLocation? ToolboxLocation { get; set; }
    public ICollection<ToolRecord> Records { get; set; } = [];
}
