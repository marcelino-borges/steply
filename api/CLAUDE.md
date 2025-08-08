# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `npm run dev` - Start development server with watch mode
- `npm run build` - Build the application
- `npm run start:prod` - Start production server

### Testing
- `npm test` - Run all unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests
- Run single test file: `npm test -- path/to/test.spec.ts`
- Run tests for specific module: `npm test -- --testPathPattern=modules/genders`

### Code Quality
- `npm run lint` - Lint and fix TypeScript files
- `npm run format` - Format code with Prettier

### Database (Prisma)
- `npm run prisma:migrate` - Create and apply new migration
- `npm run prisma:generate` - Generate Prisma client after schema changes
- `npm run prisma:seed` - Seed database with initial data
- `npm run prisma:studio` - Open Prisma Studio for database inspection
- `npm run psql:local` - Start local PostgreSQL with Docker Compose

### Required Commands After Schema Changes
Always run these commands in sequence after modifying `prisma/schema.prisma`:
1. `npm run prisma:migrate` - Creates migration and updates database
2. `npm run prisma:generate` - Regenerates Prisma client with new types
3. Run tests to verify TypeScript compilation

## Architecture

This is a NestJS API following **Clean Architecture** principles with strict dependency direction rules.

### Project Structure
```
src/
├── core/           # Shared functionality across all modules
│   ├── application/ # Core DTOs, schemas, use-cases, utils
│   ├── domain/     # Core entities, interfaces, constants
│   └── infra/      # Core controllers, decorators, services
└── modules/        # Domain-specific modules
    └── {domain}/   # Each module follows clean architecture layers
        ├── __mocks__/      # Test mocks and fixtures
        ├── application/    # DTOs and use-cases
        ├── domain/        # Domain entities (rare, usually in core)
        └── infra/         # Controllers, repositories, abstractions
```

### Dependency Direction Rules
**CRITICAL**: Dependencies flow in one direction only:
- `infra` → `application` → `domain`
- Lower layers NEVER depend on higher layers
- All modules can depend on `core` layers
- Path aliases use `@/` prefix (e.g., `@/modules/genders/application/dtos/gender.dto`)

### Module Implementation Pattern

When creating new modules, follow this exact pattern established by `genders`, `user-goals`, and `user-main-goal-levels`:

#### 1. Repository Pattern with Symbol Tokens
```typescript
// infra/repositories/{entity}.repository.ts
export const ENTITY_REPOSITORY_TOKEN = Symbol("EntityRepository");

@Injectable()
export class EntityRepository implements EntityRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}
  
  async findAll(): Promise<EntityDto[]> {
    return await this.prismaService.entity.findMany({
      orderBy: { id: "asc" }
    });
  }
}
```

#### 2. Use Case Pattern
```typescript
// application/use-cases/find-all-entities.use-case.ts
@Injectable()
export class FindAllEntitiesUseCase {
  constructor(
    @Inject(ENTITY_REPOSITORY_TOKEN)
    private readonly entityRepository: EntityRepositoryInterface,
  ) {}

  async execute(): Promise<EntityDto[]> {
    return await this.entityRepository.findAll();
  }
}
```

#### 3. Controller Pattern with Swagger Documentation
```typescript
// infra/controllers/{entity}.controller.ts
@Controller("entities")
export class EntityController {
  constructor(private readonly findAllEntitiesUseCase: FindAllEntitiesUseCase) {}

  @Get()
  @EndpointDoc({
    operation: { summary: "Get all entities" },
    response: { status: HttpStatus.OK, type: [EntityDto] },
  })
  async findAll(): Promise<EntityDto[]> {
    return await this.findAllEntitiesUseCase.execute();
  }
}
```

#### 4. Module Registration
```typescript
// {entity}.module.ts
@Module({
  controllers: [EntityController],
  providers: [
    PrismaService,
    FindAllEntitiesUseCase,
    {
      provide: ENTITY_REPOSITORY_TOKEN,
      useClass: EntityRepository,
    },
  ],
})
export class EntityModule {}
```

### Testing Patterns

#### Test Structure
- All files have corresponding `.spec.ts` test files
- Tests use Jest with `@nestjs/testing` utilities
- Mocks are stored in `__mocks__/` directories
- Repository mocks use consistent naming: `{ENTITY}_REPOSITORY_MOCK`

#### Mock Pattern
```typescript
// __mocks__/{entity}.mock.ts
export const MOCK_ENTITIES: EntityDto[] = [
  // Test data with realistic Portuguese content
];

export const ENTITY_REPOSITORY_MOCK = {
  findAll: jest.fn(),
};
```

### Database Patterns

#### Prisma Schema Conventions
- Use `@map("table_name")` for table naming (snake_case)
- Include standard audit fields: `id`, `createdAt`, `updatedAt`
- Use descriptive field names and relationships
- Always include language field (`lang`) for localized content

#### Seeding Pattern
- Seeds are located in `prisma/seeds/`
- Use Portuguese content for user-facing data
- Include proper descriptions and categorization
- Follow established ID patterns (0 for "not informed" options)

### Import Conventions
- Use path aliases `@/` for all imports except same-folder imports
- Import from abstractions, not concrete implementations
- Use Symbol tokens for dependency injection
- Keep relative imports only for files in the same directory

### Swagger Documentation
- Use `@EndpointDoc` decorator for consistent API documentation
- Include operation summary and response types
- The decorator automatically adds standard error responses
- Follow the established pattern for response status codes