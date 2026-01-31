---
title: Star Crescent Chatbot API
emoji: 💬
colorFrom: yellow
colorTo: yellow
sdk: docker
pinned: false
license: mit
app_port: 7860
---

# Star Crescent Marriage Lawn - Chatbot API

AI-powered chatbot backend for Star Crescent Marriage Lawn venue.

## Endpoints

- `GET /` - Health check
- `GET /health` - Health status
- `GET /api/chat/status` - Check if chatbot is configured
- `POST /api/chat` - Send message to chatbot

## Environment Variables

Set these in your Hugging Face Space secrets:
- `GEMINI_API_KEY` - Your Google Gemini API key
- `FRONTEND_URL` - Your frontend URL for CORS
