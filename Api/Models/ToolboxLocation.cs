using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public sealed class ToolboxLocation
{
    public Guid Id { get; init; }
    [MaxLength(100)] public required string Name { get; set; }
    public Guid OwnerId { get; set; }
    public Guid ToolboxId { get; set; }
    public DateTime CreationDate { get; init; }
    public ApplicationUser Owner { get; set; } = null!;
    public Toolbox Toolbox { get; set; } = null!;
    public ICollection<ToolRecord> RecordsFrom { get; set; } = [];
    public ICollection<ToolRecord> RecordsTo { get; set; } = [];
}
