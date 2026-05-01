---
name: dto-patterns
description: DTO and type sharing conventions between NestJS and Next.js via packages/types. Loaded when creating or modifying DTOs, validation schemas, or shared interfaces.
---

# DTO Patterns

## Validation split

- packages/types — interface ICreateUser { email: string; ... }
- packages/dtos — class CreateUserDto with @IsEmail(), imports ICreateUser
- packages/validators — createUserSchema = z.object({ email: z.string().email() })

## Rules

- DTO must implement the interface from packages/types
- Zod schema shape must match the interface from packages/types
- packages/types is the contract — if it changes, update both DTO and schema
- Never import @nestjs/\* in packages/dtos — keep it framework-agnostic

## Adding a new DTO

1. Create DTO class in packages/types/src/dtos/
2. Decorate with class-validator
3. Derive plain interface in packages/types/src/interfaces/
4. Export both from packages/types/src/index.ts
5. Import DTO in NestJS, interface in Next.js

## Example

- CreateUserDto — class with @IsEmail(), @IsString() decorators
- ICreateUser — plain interface derived from CreateUserDto for frontend

## Rules

- Never import class-validator in apps/web
- Never import class-transformer in apps/web
- Frontend always uses plain interfaces, never DTO classes
- DTO is the source of truth — interface must match it exactly
- Never define validation logic outside of packages/types
