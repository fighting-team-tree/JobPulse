---
trigger: always_on
---

# Workflows & Security Protocols

## 1. Feature Development Flow (The "Planner" Agent)
When asked to build a complex feature:
1. **Analyze**: Identify necessary Graph Nodes and UI Components.
2. **Plan**: Output a bulleted list of files to be created/modified.
3. **Execute**: Write code following specific Tech Stack rules.

## 2. TDD (Test Driven Development)
- For critical Logic (especially LangGraph Nodes), write the test case *first*.
- Use `pytest` for Python backend logic.
- Use `Jest` or `Vitest` for React utility functions.

## 3. Security Hooks (Simulated)
- **Pre-Commit Check**:
  - NEVER output API Keys (starts with `sk-`, `g-`, etc.). Use `process.env` or `os.environ`.
  - Validate all user inputs in the Backend (Pydantic models).