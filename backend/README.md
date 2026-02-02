---
title: Star Crescent Chatbot API
emoji: 🌙
colorFrom: yellow
colorTo: black
sdk: docker
pinned: false
---

# Star Crescent Marriage Lawn Chatbot API

AI-powered chatbot for Star Crescent Marriage Lawn wedding venue in Karachi, Pakistan.

## Features

- 🤖 AI Chatbot powered by Google Gemini 2.5 Flash
- 📅 Booking management with function calling
- 🔍 RAG (Retrieval Augmented Generation) for venue knowledge
- 🗄️ PostgreSQL database with pgvector for embeddings

## API Endpoints

- `GET /` - Health check
- `GET /health` - Detailed health status
- `GET /api/status` - Feature availability status
- `POST /api/chat` - Chat with the AI assistant

## Environment Variables

Required environment variables:
- `GEMINI_API_KEY` - Google Gemini API key
- `COHERE_API_KEY` - Cohere API key for embeddings
- `DATABASE_URL` - PostgreSQL database URL
- `FRONTEND_URL` - Frontend URL for CORS
