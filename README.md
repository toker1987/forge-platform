# FORGE — Autonomous Product Development Platform

> Your Ideas. Built Autonomously.

FORGE is a full-stack SaaS platform that deploys autonomous AI agents to research trends, validate business cases, and build production-ready products from concept to deployment.

**Live Demo:** https://oadoi3sqhll5k.kimi.page

---

## Features

### What It Does
1. **Create a Project** — Enter your product idea (e.g., "AI Code Review Agent")
2. **Trend Scout** — Automatically researches market trends and signals
3. **Business Analyst** — Validates with TAM/SAM/SOM analysis, pain scoring, and competitive scanning
4. **Case Review** — You review the business case and approve/reject
5. **Build Pipeline** — Approved projects trigger the autonomous build:
   - **Architect** — System design and database schema
   - **Frontend** — UI/UX implementation
   - **Backend** — API and infrastructure
   - **QA** — Testing and deployment
6. **Monitor** — Watch build progress in real-time with live agent activity feeds

### Pages
| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Marketing homepage with animated hero, agent swarm, pricing |
| Login | `/login` | OAuth 2.0 authentication (Kimi) |
| Dashboard | `/dashboard` | Command center with real project stats, agent activity feed |
| Projects | `/projects` | Full project directory with search, filters, create new |
| Business Case | `/projects/:id/case` | Review TAM/SAM/SOM, pain score, approve/reject |
| Build Progress | `/projects/:id/build` | Live build pipeline with polling, QA metrics |
| Settings | `/settings` | Account, notifications, security, API keys |

---

## Tech Stack

### Frontend
- React 19 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Framer Motion animations
- Canvas 2D particle swarm
- Lucide React icons
- tRPC client (type-safe API)

### Backend
- Hono (HTTP server)
- tRPC 11.x (type-safe API)
- Drizzle ORM (type-safe SQL)
- MySQL (database)
- OAuth 2.0 (Kimi auth)
- Zod validation

---

## Database Schema

```
users            — OAuth users (id, unionId, name, email, avatar, role)
projects         — Core project entity with status, market sizing, scores
builds           — Build pipeline stages (ARCHITECT, FRONTEND, BACKEND, QA)
build_steps      — Individual tasks within a build stage
agent_logs       — Agent activity stream (TrendScout, BusinessAnalyst, etc.)
```

### Project Status Flow
```
IDEA_SCOUTED → CASE_BUILT → IN_BUILD → QA_REVIEW → LIVE
                                    └→ REJECTED
```

---

## API Endpoints (tRPC)

| Router | Endpoint | Description |
|--------|----------|-------------|
| `project` | `list` | List projects with optional status filter |
| `project` | `getById` | Get single project with builds |
| `project` | `create` | Create project + seed agent logs |
| `project` | `updateStatus` | Update project status |
| `project` | `approveCase` | Approve → creates build pipeline |
| `project` | `rejectCase` | Reject project |
| `build` | `getByProject` | Get build stages + steps for project |
| `build` | `updateStep` | Update build step status |
| `agentLog` | `list` | Get agent logs for project |
| `auth` | `me` | Get current user |
| `auth` | `logout` | Clear session |

---

## Quick Start

### Prerequisites
- Node.js 20+
- MySQL database

### 1. Clone & Install
```bash
git clone https://github.com/toker1987/forge-platform.git
cd forge-platform
npm install
```

### 2. Environment Variables
```bash
# .env
DATABASE_URL=mysql://user:pass@host:3306/forge
APP_ID=your-kimi-app-id
APP_SECRET=your-kimi-app-secret
KIMI_AUTH_URL=https://your-auth-url
KIMI_OPEN_URL=https://your-open-url
OWNER_UNION_ID=your-union-id
```

### 3. Database Setup
```bash
npm run db:push       # Sync schema
npx tsx db/seed.ts    # Seed sample data
```

### 4. Run
```bash
npm run dev           # Starts at http://localhost:3000
```

### 5. Build
```bash
npm run build         # Frontend + backend build
```

---

## Project Structure

```
├── api/                    # Backend API
│   ├── router.ts           # tRPC router registry
│   ├── project-router.ts   # Project CRUD + pipeline
│   ├── build-router.ts     # Build pipeline queries
│   ├── agent-log-router.ts # Agent activity logs
│   ├── queries/            # Drizzle query functions
│   ├── kimi/               # OAuth authentication
│   └── lib/                # Framework internals
├── contracts/              # Shared types (frontend ↔ backend)
├── db/
│   ├── schema.ts           # Database tables
│   └── seed.ts             # Sample data
├── src/
│   ├── pages/              # Route-level pages
│   ├── components/         # Shared components
│   ├── providers/trpc.tsx  # tRPC client setup
│   ├── hooks/useAuth.ts    # Authentication hook
│   └── sections/           # Landing page sections
└── public/                 # Static assets
```

---

## Responsive Design

Fully mobile-responsive with:
- Desktop sidebar navigation (260px)
- Mobile hamburger drawer with overlay
- Card layout on mobile / Table on desktop
- Mobile-first Tailwind breakpoints: `xs:475px sm:640px md:768px lg:1024px`

---

## License

MIT — Built with the FORGE agent swarm.
