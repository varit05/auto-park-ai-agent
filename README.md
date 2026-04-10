# Auto Park AI Agent

Collection of Simple Agents using LangChain with Anthropic Claude and Google Gemini

## Overview

This project demonstrates basic agent implementations using the LangChain framework with two major LLM providers:
- **Anthropic Claude** (with tool calling capabilities)
- **Google Gemini**

## Features

✅ Anthropic Claude 3.5 Sonnet agent with function calling
✅ Custom weather tool implementation
✅ Google Gemini 2.5 Flash integration
✅ TypeScript support
✅ Built with official LangChain libraries

## Installation

```bash
# Install dependencies
pnpm install
```

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Add your API keys in the `.env` file:
```env
ANTHROPIC_API_KEY=your_anthropic_key_here
GOOGLE_API_KEY=your_google_api_key_here
```

## Usage

### Run Anthropic Claude Agent
```bash
# Production mode
pnpm start

# Development mode (with hot reload)
pnpm dev
```

### Run Google Gemini Agent
```bash
pnpm start:gemini
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm build` | Compile TypeScript to JavaScript |
| `pnpm start` | Build and run Anthropic agent |
| `pnpm start:gemini` | Build and run Gemini agent |
| `pnpm dev` | Run Anthropic agent in development mode |
| `pnpm type-check` | Validate TypeScript types |

## Project Structure

```
langchain_agents/
├── app/
│   ├── main.ts          # Anthropic Claude agent implementation
│   └── gemini/
│       └── index.ts     # Google Gemini implementation
├── dist/                # Compiled output (auto-generated)
├── .env.example         # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

- `@langchain/anthropic` - Anthropic integration
- `@langchain/google` - Google Gemini integration
- `langchain` - Core LangChain framework
- `zod` - Schema validation for tools
- `typescript` - TypeScript compiler
- `dotenv` - Environment variable loading