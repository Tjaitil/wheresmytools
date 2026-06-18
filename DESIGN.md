# Design

## Core concepts

- A **tool** belongs to a person permanently (John's drill, Sarah's hammer)
- A **toolbox** is a circle of trust — a sharing agreement between people, not a container for tools
- A **location** is a physical place (John's cabin, Sarah's garage, a shared cabin) — not tied to a specific toolbox
- A **Record** tracks the movement of a tool between members and locations

## Use cases

### I'm a user who wants to track my own tools

- A personal toolbox is created upon registration
- Add your tools with name and optional description
- Register your locations (cabin, garage, etc.)
- Move tools between your locations to track where they are

### I'm a user who wants to share my toolbox with others

- Invite people to become members of your toolbox
- Members can see all tools registered in the toolbox
- Full loan history is tracked — who has it, where it is, when it was borrowed

### I'm a user that has been invited to a shared toolbox

- Join via invite link
- See all tools available in the toolbox and their current locations
- Borrow a tool — register that you have it and where it is
- Return a tool — mark it as returned to its original location

## Data model principles

- `Tool.OwnerId` — permanent, the person who owns the tool
- `Tool.CurrentLocationId` — changes as the tool moves
- `ToolboxLocation.OwnerId` — who registered the location, not tied to a toolbox
- `ToolRecord` — records every borrow/return with full history






