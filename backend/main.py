from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from config import FRONTEND_URL
from routers.chat import router as chat_router
from models.schemas import HealthResponse
from database import init_db, close_db, is_configured as db_configured
from services.embeddings import is_configured as embeddings_configured


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan - initialize and cleanup resources."""
    # Startup
    print("Starting Star Crescent Chatbot API...")
    
    if db_configured():
        db_init = await init_db()
        if db_init:
            print("✓ Database connected and initialized")
        else:
            print("✗ Database initialization failed")
    else:
        print("⚠ Database not configured (booking features disabled)")
    
    if embeddings_configured():
        print("✓ Cohere embeddings configured")
    else:
        print("⚠ Cohere not configured (RAG features disabled)")
    
    yield
    
    # Shutdown
    print("Shutting down...")
    await close_db()


app = FastAPI(
    title="Star Crescent Chatbot API",
    description="AI-powered chatbot for Star Crescent Marriage Lawn with RAG and booking management",
    version="2.0.0",
    lifespan=lifespan
)

# CORS Configuration - Allow production and development origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://*.vercel.app",
        "https://*.netlify.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app|https://.*\.netlify\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router)


@app.get("/", response_model=HealthResponse)
async def root():
    """Root endpoint - health check."""
    return HealthResponse(
        status="ok",
        timestamp=datetime.now().isoformat()
    )


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now().isoformat()
    )


@app.get("/api/status")
async def api_status():
    """Detailed API status with feature availability."""
    return {
        "status": "running",
        "features": {
            "chatbot": True,
            "database": db_configured(),
            "rag": embeddings_configured() and db_configured(),
            "bookings": db_configured()
        },
        "timestamp": datetime.now().isoformat()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
