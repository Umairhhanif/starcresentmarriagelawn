import os
from dotenv import load_dotenv

load_dotenv()

# Gemini API Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/"

# Cohere API Configuration
COHERE_API_KEY = os.getenv("COHERE_API_KEY", "")

# Neon Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "")

# CORS Configuration
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Chat Configuration
MAX_CONVERSATION_HISTORY = 20
