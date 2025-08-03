# Development Setup

This project is configured with comprehensive code quality checks including formatting, linting, type checking, and build validation.

## ESLint + Prettier + Husky + lint-staged

### Available Scripts

#### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

#### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are formatted
- `npm run type-check` - Run TypeScript type checking
- `npm run build:check` - Run build without linting (fast build check)
- `npm run validate` - Run comprehensive validation (format, lint, type-check, build)

### Git Hooks

#### Pre-commit Hook

Runs automatically on `git commit` and performs:

1. **Prettier formatting** - Auto-formats staged files
2. **ESLint** - Lints and auto-fixes staged files
3. **ESLint strict** - Ensures no warnings remain
4. **Build check** - Verifies code compiles successfully

#### Pre-push Hook

Runs automatically on `git push` and performs:

1. **Format check** - Ensures all files are properly formatted
2. **ESLint** - Full project linting
3. **Type check** - TypeScript validation
4. **Production build** - Full build test

### Manual Validation

Run comprehensive checks manually:

```bash
npm run validate
```

This runs all quality checks in sequence:

- Format checking
- Linting
- Type checking
- Build verification

### Configuration Files

- `.prettierrc` - Prettier configuration
- `.prettierignore` - Files to ignore when formatting
- `eslint.config.mjs` - ESLint configuration with Next.js and Prettier integration
- `.husky/pre-commit` - Pre-commit hook with comprehensive checks
- `.husky/pre-push` - Pre-push hook with full validation
- `.vscode/settings.json` - VSCode settings for automatic formatting and linting
- `scripts/validate.bat` - Comprehensive validation script

### Recommended VSCode Extensions

- ESLint
- Prettier - Code formatter
- TypeScript Importer

### Code Style

- Single quotes for strings
- Semicolons required
- 2 spaces for indentation
- Trailing commas in ES5 contexts
- Line width of 80 characters

### Quality Gates

The project enforces quality through multiple gates:

1. **Save-time** - VSCode auto-formats and fixes issues
2. **Commit-time** - Pre-commit hook ensures staged files are clean
3. **Push-time** - Pre-push hook validates entire project
4. **Manual** - `npm run validate` for comprehensive checking
