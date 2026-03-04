# AGENTS.md - Portfolio Project

## Stack

- Astro 5.x (static, SSG)
- TailwindCSS v4 (`@theme` directive)
- Bun runtime
- TypeScript (`@ts-check`)
- Spanish content (`lang="es"`)

---

## Commands

```bash
bun run dev          # Dev server
bun run build        # Production build
bun run preview      # Preview build
bunx astro sync      # Generate TypeScript types
bunx prettier --write .   # Format
```

---

## Core Principles

- **Static-first**: Prefer static generation over SSR. Only use SSR if absolutely required.
- **Minimal JS**: Ship zero JavaScript to the client unless necessary.
- **Accessibility-first**: WCAG AA compliance mandatory. No exceptions.
- **Performance-first**: Target Lighthouse 95+ on all metrics.

---

## Architectural Philosophy (SOLID + KISS)

### SOLID Enforced

| Principle                 | Rule                                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| **S**ingle Responsibility | One component = one purpose. Split components that render, fetch, or transform data simultaneously. |
| **O**pen/Closed           | Extend via props/slots, not by modifying existing code.                                             |
| **L**iskov Substitution   | Components must accept the same props and render identically regardless of where they are used.     |
| **I**nterface Segregation | Define explicit `interface Props` for each component. Never use catch-all patterns.                 |
| **D**ependency Inversion  | Depend on TypeScript types/interfaces, not concrete implementations.                                |

### KISS Enforced

- Prefer simple solutions over abstractions.
- No premature generalization.
- No over-engineering.
- No unnecessary layers.
- Avoid configuration unless required.
- No "smart" abstractions without proven reuse (3+ use cases minimum).
- No utility dumping: utils must be domain-focused.
- No overuse of generics: only when type safety requires it.

### Structural Rules

- **No mega-components**: Maximum 150 lines per component. Split at logical boundaries.
- **No prop drilling beyond 2 levels**: Use context or hoist state to layout components.
- **Composition over inheritance**: Use slots, props, and fragment composition.
- **No hidden side effects**: Components must be deterministic. No random values, no implicit fetches, no mutation.
- **No implicit dependencies**: All imports must be explicit. No global state unless documented.

---

## Project Structure

```
src/
├── components/    # Reusable UI components (one purpose each)
├── layouts/       # Page layouts
├── pages/         # File-based routing
├── styles/       # Global CSS
└── utils/        # Domain-focused helpers only
public/
├── favicon.svg
└── images/
```

---

## Code Style

### Astro Components

- Use `---` frontmatter fence
- Destructure props in frontmatter
- Imports order: external > internal > styles
- Use `<slot />` for content projection

```astro
---
import Layout from "../layouts/Layout.astro";
const { title } = Astro.props;
---

<Layout><h1>{title}</h1></Layout>
```

### TailwindCSS v4

- Define theme in `src/styles/global.css` using `@theme`
- Mobile-first: `md:`, `lg:` prefixes
- Custom colors: `--color-{name}-{shade}`

```css
@theme {
  --color-primary: #3b82f6;
  --font-sans: "Manrope Variable", sans-serif;
}
```

### File Naming

- **Language**: All file names must be in English (PascalCase for components, kebab-case for pages/utils)
- Components: PascalCase (`Header.astro`)
- Utils: camelCase (`formatDate.ts`)
- Styles: kebab-case (`global.css`)
- Pages: kebab-case (`about.astro`, `index.astro`)

### HTML Conventions

- Self-closing tags for void elements
- Prefer shorthand attributes (`disabled` not `disabled={true}`)
- Group related Tailwind classes

---

## Client Directive Policy

| Directive        | When to Use                                                       |
| ---------------- | ----------------------------------------------------------------- |
| `client:load`    | Critical interactive components (navigation, mobile menu)         |
| `client:visible` | Below-fold components that need interactivity (modals, carousels) |
| `client:idle`    | Non-critical components that can wait (analytics, secondary UI)   |
| `client:media`   | Components dependent on viewport size                             |
| No directive     | Static content, SEO-critical pages                                |

**Rule**: Default to static. Add `client:*` only when the component requires user interaction.

---

## Accessibility Requirements

- All images require `alt` text (empty `alt=""` for decorative images)
- Use semantic HTML (`<main>`, `<nav>`, `<article>`, `<section>`, `<header>`, `<footer>`)
- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- All interactive elements must be keyboard accessible
- Use `<html lang="es">` for Spanish content
- Form labels associated with inputs
- ARIA attributes only when semantic HTML is insufficient

---

## Performance Standards

- Lazy load all images below the fold
- Preload critical fonts only
- No heavy dependencies (no jQuery, no moment.js, no Bootstrap)
- Keep bundle under 100KB gzipped
- Use Astro's built-in image optimization
- Avoid client-side state management libraries

**Lighthouse Targets**: Performance 95+, Accessibility 95+, Best Practices 95+, SEO 95+

---

## SEO Standards

### Required Meta Tags

```html
<!-- In Layout.astro -->
<title>{pageTitle} | Portfolio</title>
<meta name="description" content="{description}" />
<link rel="canonical" href="https://domain.com/{path}" />
```

### Open Graph

```html
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="https://domain.com{image}" />
<meta property="og:url" content="https://domain.com{path}" />
<meta property="og:type" content="website" />
```

### Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="https://domain.com{image}" />
```

### JSON-LD

- Add schema.org Person or ProfessionalService for portfolio
- Use structured data for projects/articles if applicable

---

## TypeScript Strict Rules

- Use `@ts-check` in all `.js` files
- Define explicit interfaces for all component props
- Never use `any`. Use `unknown` if type is truly unknown
- Enable `strict: true` in tsconfig
- Export types that are shared across components
- Keep interfaces focused: no unused properties

```typescript
interface Props {
  title: string;
  description?: string;
}
```

---

## Git Workflow

- Branch naming: `feature/{name}`, `fix/{name}`, `refactor/{name}`
- Commit messages: imperative mood, concise (`Add header component` not `Added header`)
- Never force push to main/master
- Run `bunx prettier --write .` before committing
- Verify build passes before pushing

### Conventional Commits

#### Formato

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types permitidos

| Type       | Descripción           |
| ---------- | --------------------- |
| `feat`     | Nueva funcionalidad   |
| `fix`      | Bug fix               |
| `docs`     | Documentación         |
| `style`    | Formato (no lógica)   |
| `refactor` | Refactorización       |
| `perf`     | Mejora de performance |
| `test`     | Tests                 |
| `build`    | Build system          |
| `ci`       | CI/CD                 |
| `chore`    | Mantenimiento         |

#### Reglas

- Usar `!` antes del `:` para breaking changes: `feat!: remove API`
- Scope opcional: `feat(auth): add login`
- Descripción en imperativo: "add" no "added"
- Cuerpo y footer opcionales
- Footer para breaking changes: `BREAKING CHANGE: description`

#### Ejemplos

```
feat: add view transitions
fix: resolve header alignment issue
docs: update README
refactor: simplify button component
feat(auth)!: change login API
```

---

## Non-Goals

This project is NOT:

- A dynamic web application
- An e-commerce platform
- A CMS-driven site
- A multi-language site (Spanish only)
- A blog with frequent updates (static portfolio)

---

## Dependencies

**Production**: astro, @fontsource-variable/manrope, @fontsource-variable/sora, @tailwindcss/vite, tailwindcss

**Development**: prettier, prettier-plugin-astro, prettier-plugin-tailwindcss

---

## Common Tasks

### Add Page

1. Create `src/pages/{name}.astro`
2. Import and extend `Layout`
3. Add page title and description props

### Add Color

1. Edit `src/styles/global.css`
2. Add under `@theme`: `--color-{name}-{shade}: #hexcode`

### Add Font

1. `bun add @fontsource/{font-name}`
2. Import in `Layout.astro` frontmatter
3. Add to `@theme` in `global.css`

---

## Error Handling

- Check console for Astro error line numbers
- Run `bun run build` for full error traces
- Use `bunx astro check` before committing
