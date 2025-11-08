# Personal Website

Next.js portfolio website with interactive features including RAG-powered resume chatbot, project showcase, and visit tracking.

## What It Does

- Displays portfolio projects with descriptions and images
- Interactive resume chatbot using RAG (Retrieval Augmented Generation)
- Visit tracking and statistics
- Admin panel for conversation management
- Memory management for chat context

Controls:
- Navigate through sections using navigation menu
- Chat with resume using the chat interface
- Admin access for managing conversations and memory

## How It Works

1. **Frontend**: Next.js 14 with React and TypeScript
2. **RAG System**: Processes PDF resume, creates embeddings, stores in vector database
3. **Chat Interface**: Sends queries to Gemini AI with context from resume
4. **Memory Management**: Maintains conversation history and context
5. **API Routes**: Handles chat requests, memory operations, visit tracking

## Dependencies

- `next` - React framework
- `@google/generative-ai` - Gemini AI integration
- `pdf-parse` - PDF processing for resume
- `framer-motion` - Animations
- `tailwindcss` - Styling
- `typescript` - Type safety

## Technical Details

- Framework: Next.js 14 (App Router)
- AI Model: Google Gemini
- Vector Database: For RAG embeddings
- Deployment: Vercel or similar platform
- Features: RAG chatbot, visit tracking, admin panel, memory management
