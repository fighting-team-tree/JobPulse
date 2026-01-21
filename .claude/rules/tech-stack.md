---
trigger: always_on
---

# Antigravity Tech Stack & Architecture

## Frontend: Next.js (App Router)
- **Framework**: Next.js 14+ with App Router (`app/` dir).
- **Language**: TypeScript (Strict mode).
- **Styling**: Tailwind CSS (Utility-first).
- **Data Fetching**:
  - Prefer Server Components for initial data fetch.
  - Use `SWR` or `TanStack Query` for client-side polling/mutations if needed.
  - **Streaming**: Handle AI streaming responses via `ai` SDK or raw `ReadableStream`.

## Backend: Python & AI
- **Core**: Python 3.11+.
- **Agent Framework**: LangGraph (Stateful Multi-Actor Orchestration).
- **Orchestration**: LangChain.
- **API**: FastAPI (for serving the graph).
- **Environment**: Managed via `python-dotenv`.

## Interface Protocol
- Frontend and Backend communicate via strictly typed JSON.
- For streaming, use Server-Sent Events (SSE) or HTTP streaming compatible with Vercel AI SDK.