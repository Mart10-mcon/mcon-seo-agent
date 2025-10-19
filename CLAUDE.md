# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is an N8N SEO Workflow Dashboard - a React-based web application for managing and triggering n8n SEO automation workflows. The dashboard features a split-view layout with SEO research tools and an interactive chat interface for workflow execution.

## Development Setup

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
npm install
```

### Configuration
1. Copy `.env.example` to `.env`
2. Update `VITE_N8N_WEBHOOK_URL` with your n8n webhook endpoint

### Running the Development Server
```bash
npm run dev
```
Opens at http://localhost:3000

### Building for Production
```bash
npm run build
```

## Architecture

### Tech Stack
- **React 18**: Component-based UI framework
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Axios**: HTTP client for n8n webhook calls

### Project Structure
- `src/components/`: Reusable React components
  - `Sidebar.jsx`: Left navigation with tool categories
  - `Header.jsx`: Top branding and user info
  - `Layout.jsx`: Main content area with tool cards
  - `ToolCard.jsx`: Reusable card component
  - `ChatWindow.jsx`: Interactive chat for n8n workflows
- `src/App.jsx`: Main application container
- `src/main.jsx`: Application entry point
- `src/index.css`: Global styles and Tailwind configuration

### Key Features
- Split-view layout (60% tools, 40% chat)
- Real-time chat interface for workflow commands
- N8N webhook integration for automation
- 10 SEO research tools (keyword research, competitor analysis)
- Responsive design with Tailwind CSS

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## N8N Integration

The chat window sends POST requests to the configured webhook URL with:
```json
{
  "message": "user command",
  "tool": "selected-tool-id",
  "timestamp": "ISO timestamp"
}
```

Demo mode is active if `VITE_N8N_WEBHOOK_URL` is not configured.
