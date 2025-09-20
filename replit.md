# AI Chatbot

## Overview

This is a modern AI chatbot application built with React, Express, and OpenAI's GPT-4.1 Mini model. The application provides a clean, responsive chat interface where users can have conversations with an AI assistant. The system features real-time messaging, message persistence, and a polished Material Design-inspired UI with both light and dark themes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system following Material Design principles
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Theme System**: Custom theme provider supporting light/dark modes with system preference detection

### Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database Integration**: Drizzle ORM configured for PostgreSQL with Neon serverless driver
- **Storage Strategy**: Dual storage implementation - in-memory storage for development and database storage for production
- **API Design**: RESTful endpoints for chat operations (send messages, retrieve history, clear chat)

### Chat System Design
- **Message Flow**: User messages are saved to storage, sent to OpenAI API, and AI responses are stored and returned
- **Real-time Updates**: Automatic message list updates using React Query's cache invalidation
- **Typing Indicators**: Visual feedback during AI response generation
- **Message Persistence**: All conversations are stored with timestamps and role identification

### Mobile Optimization
- **Responsive Design**: Mobile-first approach with adaptive layouts and touch-friendly interfaces
- **Input Handling**: Specialized mobile input component preventing zoom on focus and handling virtual keyboards
- **Performance**: Optimized bundle size and lazy loading for mobile devices

### Development Workflow
- **Build System**: Vite for frontend with hot reloading and fast builds
- **Deployment**: Vercel-ready configuration with serverless function support
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared schemas
- **Development Tools**: ESBuild for server bundling and development middleware integration

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4.1 Mini model for chat completions with system prompts for helpful assistant behavior

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL for message and user data persistence
- **Vercel**: Deployment platform with serverless functions and static hosting

### UI & Styling
- **Radix UI**: Accessible component primitives for dialogs, tooltips, and form controls
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Consistent icon library for UI elements
- **Google Fonts**: Inter font family for typography

### Development & Build Tools
- **Drizzle Kit**: Database schema management and migrations
- **TanStack Query**: Server state management with caching and synchronization
- **Wouter**: Lightweight routing library
- **TypeScript**: Type safety across the entire application stack