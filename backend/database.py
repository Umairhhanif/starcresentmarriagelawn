"""
Neon Database Connection Module
PostgreSQL with pgvector for embeddings storage
"""
import asyncpg
from contextlib import asynccontextmanager
from config import DATABASE_URL

# Connection pool
_pool = None


async def init_db():
    """Initialize database connection pool and create tables."""
    global _pool
    
    if not DATABASE_URL:
        print("Warning: DATABASE_URL not configured")
        return False
    
    try:
        _pool = await asyncpg.create_pool(
            DATABASE_URL,
            min_size=1,
            max_size=10
        )
        
        # Initialize pgvector and create tables
        async with _pool.acquire() as conn:
            # Enable pgvector extension
            await conn.execute('CREATE EXTENSION IF NOT EXISTS vector')
            
            # Create bookings table
            await conn.execute('''
                CREATE TABLE IF NOT EXISTS bookings (
                    id SERIAL PRIMARY KEY,
                    customer_name VARCHAR(255) NOT NULL,
                    customer_phone VARCHAR(20) NOT NULL,
                    customer_email VARCHAR(255),
                    event_type VARCHAR(100) NOT NULL,
                    event_date DATE NOT NULL,
                    guest_count INTEGER,
                    package_type VARCHAR(100),
                    special_requests TEXT,
                    status VARCHAR(50) DEFAULT 'pending',
                    created_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW()
                )
            ''')
            
            # Create knowledge embeddings table
            await conn.execute('''
                CREATE TABLE IF NOT EXISTS knowledge_embeddings (
                    id SERIAL PRIMARY KEY,
                    content TEXT NOT NULL,
                    category VARCHAR(100),
                    embedding vector(1024),
                    created_at TIMESTAMP DEFAULT NOW()
                )
            ''')
            
            # Create index for vector similarity search
            await conn.execute('''
                CREATE INDEX IF NOT EXISTS knowledge_embedding_idx 
                ON knowledge_embeddings 
                USING ivfflat (embedding vector_cosine_ops)
                WITH (lists = 100)
            ''')
        
        print("Database initialized successfully")
        return True
        
    except Exception as e:
        print(f"Database initialization error: {e}")
        return False


async def close_db():
    """Close database connection pool."""
    global _pool
    if _pool:
        await _pool.close()
        _pool = None


@asynccontextmanager
async def get_connection():
    """Get a database connection from the pool."""
    if not _pool:
        raise Exception("Database not initialized. Call init_db() first.")
    
    async with _pool.acquire() as conn:
        yield conn


async def get_pool():
    """Get the connection pool."""
    return _pool


def is_configured():
    """Check if database is configured."""
    return bool(DATABASE_URL)
