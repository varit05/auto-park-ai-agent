# Project Rules & Guidelines

## 📁 Folder Structure
- `/app` - Main application source code
- `/app/gemini` - Gemini Express server
- `/app/gemini/router` - Express route definitions
- `/dist` - Compiled output (git ignored)
- `/node_modules` - Dependencies (git ignored)

## 🚦 File Naming Conventions
- Use **kebab-case** for file names: `healthCheck.router.ts`, `healthcheck.ts`
- Router files end with `.router.ts` suffix
- Controller/handler files are lowercase
- Types use PascalCase: `HealthCheckResponse.ts`

## 🏗️ Architecture Rules
✅ Always separate routes from handlers
✅ Use Express Router for all endpoints
✅ One router per domain feature
✅ No business logic in main server file
✅ Keep main index.ts minimal (only setup)

## 🔧 Development
- Use `pnpm dev:gemini` for development with auto-restart
- Use `pnpm build` to compile TypeScript
- Use `pnpm start:gemini` for production
- Never commit `dist` or `node_modules`

## ✅ Code Quality
- Always add proper TypeScript type annotations
- No implicit `any` types
- Error on TypeScript compilation errors
- All endpoints must return proper JSON responses

## 🛟 Health Check Standard
Endpoint: `GET /health`
Response format:
```json
{
  "status": "OK",
  "timestamp": "ISO Date String",
  "uptime": number,
  "message": "Server is running"
}