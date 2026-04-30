---
name: dto-patterns
description: DTO and type sharing conventions between NestJS and Next.js via packages/types. Loaded when creating or modifying DTOs, validation schemas, or shared interfaces.
---

# DTO Patterns

## Structure

- packages/types/src/dtos/ — class-validator decorated classes (NestJS consumes)
- packages/types/src/interfaces/ — plain interfaces derived from DTOs (Next.js consumes)
- packages/types/src/index.ts — exports both surfaces separately

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
