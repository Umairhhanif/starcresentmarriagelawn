"""
Cohere Embeddings Service for RAG
"""
import cohere
from typing import List, Optional
from config import COHERE_API_KEY
from database import get_connection, is_configured as db_configured

# Cohere async client
_client = None


def get_client():
    """Get or create async Cohere client."""
    global _client
    if _client is None and COHERE_API_KEY:
        _client = cohere.AsyncClientV2(api_key=COHERE_API_KEY)
    return _client


def is_configured():
    """Check if embeddings service is configured."""
    return bool(COHERE_API_KEY)


async def embed_text(text: str) -> Optional[List[float]]:
    """
    Generate embedding for a single text using Cohere.
    Returns a 1024-dimensional vector.
    """
    client = get_client()
    if not client:
        return None
    
    try:
        response = await client.embed(
            texts=[text],
            model="embed-english-v3.0",
            input_type="search_document",
            embedding_types=["float"]
        )
        return response.embeddings.float_[0]
    except Exception as e:
        print(f"Embedding error: {e}")
        return None




async def embed_query(query: str) -> Optional[List[float]]:
    """
    Generate embedding for a search query.
    Uses 'search_query' input type for better retrieval.
    """
    client = get_client()
    if not client:
        return None
    
    try:
        response = await client.embed(
            texts=[query],
            model="embed-english-v3.0",
            input_type="search_query",
            embedding_types=["float"]
        )
        return response.embeddings.float_[0]
    except Exception as e:
        print(f"Query embedding error: {e}")
        return None


async def search_knowledge(query: str, top_k: int = 3) -> List[dict]:
    """
    Search the knowledge base using semantic similarity.
    Returns top_k most relevant knowledge chunks.
    """
    if not db_configured():
        return []
    
    # Get query embedding
    query_embedding = await embed_query(query)
    if not query_embedding:
        return []
    
    try:
        async with get_connection() as conn:
            # Vector similarity search using cosine distance
            results = await conn.fetch('''
                SELECT content, category, 
                       1 - (embedding <=> $1::vector) as similarity
                FROM knowledge_embeddings
                ORDER BY embedding <=> $1::vector
                LIMIT $2
            ''', str(query_embedding), top_k)
            
            return [
                {
                    "content": row["content"],
                    "category": row["category"],
                    "similarity": float(row["similarity"])
                }
                for row in results
            ]
    except Exception as e:
        print(f"Knowledge search error: {e}")
        return []


async def add_knowledge(content: str, category: str = "general") -> bool:
    """
    Add a knowledge chunk to the database with its embedding.
    """
    if not db_configured():
        return False
    
    embedding = await embed_text(content)
    if not embedding:
        return False
    
    try:
        async with get_connection() as conn:
            await conn.execute('''
                INSERT INTO knowledge_embeddings (content, category, embedding)
                VALUES ($1, $2, $3::vector)
            ''', content, category, str(embedding))
        return True
    except Exception as e:
        print(f"Add knowledge error: {e}")
        return False
