---
trigger: always_on
---

# Coding Style & Quality Guidelines

## General Rules
- **Conciseness**: DO NOT summarize code changes. Output the full file content or complete function blocks.
- **No Console Logs**: Remove `console.log`, `print`, and debug statements before final output.
- **Error Handling**: Use `try/catch` (JS) or `try/except` (Py) blocks specifically for external API calls.

## TypeScript (Frontend)
- **Interfaces**: Explicitly define `interface` for all Props and State. Avoid `type` unless for unions.
- **Immutability**: Prefer `const` and spread operators (`...`) over mutation.
- **No `any`**: Strictly forbidden. Use `unknown` or specific types.

## Python (Backend)
- **Type Hints**: Use `Typing` module strictly.
  - Arguments and return types MUST be hinted.
  - Use `TypedDict` for LangGraph State definitions.
- **Docstrings**: Only for complex algorithmic nodes or public API endpoints.
- **Async**: Prefer `async def` for all I/O bound operations (DB, LLM calls).