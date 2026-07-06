# FORGE — Autonomous Venture Swarm

A multi-agent SaaS platform that researches trends, analyzes business cases, and builds digital products autonomously.

## Architecture

```
                    +---------------------+
                    |   Next.js Client UI  |
                    +----------+----------+
                               |
                    +----------v----------+
                    |  FastAPI Orchestrator |
                    +----------+----------+
                               |
        +----------------------+----------------------+
        |                      |                      |
   +----v----+          +------v------+       +------v------+
   |Trend    |          | Business    |       | Builder     |
   |Scout    +--------->| Analyst     +-------> Guild       |
   +---------+          +------+------+       +------+------+
                               |                      |
                          +----v----+           +-----v-----+
                          |Orchestrator        |   QA /    |
                          |  (PM)    |          |  Deploy   |
                          +---------+           +-----------+
```

## Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion
- **Design**: Dark mode (Linear/Vercel inspired), glassmorphism, Space Grotesk + Inter fonts

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page (marketing) |
| `/login` | Authentication |
| `/dashboard` | Command center with agent feed |
| `/projects` | Project list with filters |
| `/projects/:id/case` | Business case review |
| `/projects/:id/build` | Build progress tracking |
| `/settings` | Account, billing, API keys |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT
