using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public sealed class Toolbox
{
    public Guid Id { get; init; }
    [MaxLength(100)] public required string Name { get; set; }
    [MaxLength(500)] public string? Description { get; set; }

    public Guid OwnerId { get; set; }
    public DateTime CreationDate { get; init; }
    public ApplicationUser Owner { get; set; } = null!;
    public ICollection<ToolboxLocation> ToolboxLocations { get; set; } = [];
    public ICollection<Tool> Tools { get; set; } = [];
    public ICollection<ToolboxMember> ToolboxMembers { get; set; } = [];
}