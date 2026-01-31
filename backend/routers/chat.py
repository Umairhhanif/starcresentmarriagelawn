from fastapi import APIRouter, HTTPException
from datetime import datetime
from models.schemas import ChatRequest, ChatResponse
from services.chatbot import chatbot_service

router = APIRouter(prefix="/api", tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Handle chat messages and return AI-generated responses.
    """
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    # Get response from chatbot service
    response = await chatbot_service.get_response(
        message=request.message,
        conversation_history=request.conversation_history
    )
    
    return ChatResponse(
        response=response,
        timestamp=datetime.now().isoformat()
    )


@router.get("/chat/status")
async def chat_status():
    """
    Check if the chatbot is properly configured.
    """
    return {
        "configured": chatbot_service.is_configured(),
        "timestamp": datetime.now().isoformat()
    }
