# AIWebStack Starter

[![GitHub stars](https://img.shields.io/github/stars/kingjly/aiwebstack-starter?style=social)](https://github.com/kingjly/aiwebstack-starter)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)

A modern full-stack web application starter optimized for AI-assisted development. Built with Next.js 16, tRPC, Prisma, and Tailwind CSS.

**[中文文档](./README_CN.md)**

## Features

- ⚡ **Next.js 16** - App Router with React 19
- 🔒 **Authentication** - Better Auth with email/password
- 🗄️ **Database** - PostgreSQL with Prisma ORM
- 🔌 **API** - End-to-end type safety with tRPC v11
- 🎨 **UI Components** - Base UI + Tailwind CSS 4
- 🌓 **Dark Mode** - Semantic color system with auto dark mode
- 📦 **Monorepo** - Turborepo + pnpm workspace
- 🃏 **DataTable** - Built-in table with search, sort, pagination

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | [Next.js](https://nextjs.org/) | 16.x |
| Runtime | [React](https://react.dev/) | 19.x |
| Language | [TypeScript](https://www.typescriptlang.org/) | 5.9+ |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | v4 |
| Components | [Base UI](https://base-ui.com/) | 1.0-rc |
| API | [tRPC](https://trpc.io/) | v11 |
| Database | [PostgreSQL](https://www.postgresql.org/) | - |
| ORM | [Prisma](https://www.prisma.io/) | 7.x |
| Auth | [Better Auth](https://better-auth.com/) | 1.4+ |
| Monorepo | [Turborepo](https://turbo.build/) | 2.8+ |

## Quick Start

### Use This Template

Click the **"Use this template"** button at the top of this page to create a new repository.

Or use GitHub CLI:

```bash
gh repo create my-app --template kingjly/aiwebstack-starter
```

### Installation

```bash
# Clone the repository
git clone https://github.com/kingjly/aiwebstack-starter.git
cd aiwebstack-starter

# Install dependencies
pnpm install

# Setup environment variables
cp apps/web/.env.example apps/web/.env
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-at-least-32-characters"
BETTER_AUTH_URL="http://localhost:3024"
```

### Database Setup

```bash
pnpm db:push
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3024](http://localhost:3024) in your browser.

## Project Structure

```
aiwebstack-starter/
├── apps/
│   └── web/                 # Next.js application
│       ├── app/             # App Router pages
│       ├── lib/             # Utilities
│       └── components/      # App components
├── packages/
│   ├── api/                 # tRPC routers
│   ├── db/                  # Prisma schema & client
│   ├── ui/                  # Shared UI components
│   ├── auth/                # Auth configuration
│   └── utils/               # Shared utilities
├── turbo.json
└── pnpm-workspace.yaml
```

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build all packages and apps
pnpm lint         # Run ESLint
pnpm typecheck    # Run TypeScript check

# Database
pnpm db:push      # Push schema to database
pnpm db:generate  # Generate Prisma client
pnpm db:studio    # Open Prisma Studio
```

## UI Components

Available components in `@repo/ui`:

| Category | Components |
|----------|------------|
| **Basic** | Button, Input, Label, Switch, Checkbox, Textarea |
| **Table** | Table, DataTable, TableHeader, TableBody, TableRow, TableCell |
| **Dialog** | Dialog, DialogTrigger, DialogPopup, DialogClose |
| **Navigation** | Menu, Tabs, Sidebar, Header |
| **Overlay** | Popover, Tooltip |
| **Layout** | Page, Card, Container, Section, DashboardLayout |
| **Form** | Form, FormField, FormInput, FormSelect |
| **Other** | Badge, Pagination, ErrorBoundary |

### DataTable Example

```tsx
import { DataTable, Column } from "@repo/ui";

const columns: Column<User>[] = [
  { key: "name", title: "Name", sortable: true },
  { key: "email", title: "Email", sortable: true },
  { key: "role", title: "Role", width: "100px", align: "center" },
];

<DataTable
  columns={columns}
  data={users}
  keyField="id"
  searchFields={["name", "email"]}
  searchPlaceholder="Search users..."
/>
```

## Semantic Color System

Use semantic colors for automatic dark mode support:

```tsx
// ✅ Recommended - Auto dark mode
<div className="bg-surface text-primary border-border">

// ❌ Avoid
<div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
```

| Variable | Usage |
|----------|-------|
| `bg-background` | Page background |
| `bg-surface` | Card/container background |
| `bg-muted` | Secondary background |
| `text-primary` | Primary text |
| `text-secondary` | Secondary text |
| `text-muted-foreground` | Helper text |
| `border-border` | Primary border |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](./LICENSE)

---

Built with ❤️ by [kingjly](https://github.com/kingjly)
