"""
Chatbot Service with RAG and Booking Function Calling
"""
import json
from datetime import datetime, date
from openai import OpenAI
from typing import List, Optional, Dict, Any
from config import GEMINI_API_KEY, GEMINI_API_BASE_URL, MAX_CONVERSATION_HISTORY
from models.schemas import ChatMessage

# Import RAG and booking services
from services.embeddings import search_knowledge, is_configured as embeddings_configured
from services.booking import (
    create_booking, get_booking_by_phone, update_booking, 
    check_availability, cancel_booking
)
from database import is_configured as db_configured

# System prompt with venue knowledge
SYSTEM_PROMPT = """You are a friendly and helpful AI assistant for Star Crescent Marriage Lawn, a premier wedding and event venue located in Karachi, Pakistan. Your role is to assist visitors with booking inquiries, answer questions about our services, and help with booking management.

## Venue Information

**Location:** Jinnah Avenue, Model Colony, Alamgir Society B Area, Karachi, Pakistan

**Contact:**
- Phone: +92 300 1609087
- WhatsApp: +92 300 1609087 (Quick response guaranteed)

**Working Hours:** Daily 4:00 PM - 12:00 AM
- Site visits available by appointment

## Our Services

1. **Wedding Ceremonies** - Nikkah Setup, Baraat Stage, Floral Décor
2. **Reception & Walima** - Gourmet Catering, Stage Design, Sound System
3. **Corporate Events** - AV Equipment, Seating Layouts, Professional Catering
4. **Birthday Parties** - Theme Décor, Entertainment, Custom Cakes
5. **Mehndi & Sangeet** - Vibrant Décor, DJ & Music, Colorful Lighting
6. **Photography Setup** - Photo Booths, Backdrops, Drone Shots

## Booking Capabilities

You can help customers with:
1. **Create Bookings** - Collect customer name, phone, event type, date, and guest count
2. **Check Bookings** - Look up bookings by phone number
3. **Check Availability** - Check if a specific date is available
4. **Modify Bookings** - Update date, guest count, or special requests

When a customer wants to book:
1. Ask for their name
2. Ask for their phone number
3. Ask for the event type (wedding, reception, corporate, birthday, mehndi)
4. Ask for the preferred date
5. Ask for estimated guest count (optional)

## Behavior Guidelines

1. Be warm, professional, and helpful
2. Use the available functions to manage bookings
3. Confirm all booking details before creating
4. Use emojis sparingly to keep conversations friendly 🎉
5. For complex inquiries, provide the contact: +92 300 1609087

Remember: You represent Star Crescent Marriage Lawn - help make every customer feel welcomed!"""

# Function definitions for Gemini
BOOKING_FUNCTIONS = [
    {
        "type": "function",
        "function": {
            "name": "create_booking",
            "description": "Create a new booking for an event at Star Crescent Marriage Lawn. Call this when the customer has provided their name, phone, event type, and date.",
            "parameters": {
                "type": "object",
                "properties": {
                    "customer_name": {
                        "type": "string",
                        "description": "Full name of the customer"
                    },
                    "customer_phone": {
                        "type": "string",
                        "description": "Phone number of the customer (Pakistani format)"
                    },
                    "event_type": {
                        "type": "string",
                        "enum": ["wedding", "reception", "walima", "corporate", "birthday", "mehndi", "sangeet", "other"],
                        "description": "Type of event"
                    },
                    "event_date": {
                        "type": "string",
                        "description": "Date of the event in YYYY-MM-DD format"
                    },
                    "guest_count": {
                        "type": "integer",
                        "description": "Estimated number of guests"
                    },
                    "special_requests": {
                        "type": "string",
                        "description": "Any special requests or notes"
                    }
                },
                "required": ["customer_name", "customer_phone", "event_type", "event_date"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "check_booking",
            "description": "Look up existing bookings for a customer by their phone number",
            "parameters": {
                "type": "object",
                "properties": {
                    "phone": {
                        "type": "string",
                        "description": "Customer's phone number"
                    }
                },
                "required": ["phone"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "check_availability",
            "description": "Check if a specific date is available for booking",
            "parameters": {
                "type": "object",
                "properties": {
                    "date": {
                        "type": "string",
                        "description": "Date to check in YYYY-MM-DD format"
                    }
                },
                "required": ["date"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "modify_booking",
            "description": "Modify an existing booking. Requires the booking ID.",
            "parameters": {
                "type": "object",
                "properties": {
                    "booking_id": {
                        "type": "integer",
                        "description": "ID of the booking to modify"
                    },
                    "new_date": {
                        "type": "string",
                        "description": "New date in YYYY-MM-DD format"
                    },
                    "new_guest_count": {
                        "type": "integer",
                        "description": "New guest count"
                    },
                    "special_requests": {
                        "type": "string",
                        "description": "Updated special requests"
                    }
                },
                "required": ["booking_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "cancel_booking",
            "description": "Cancel an existing booking",
            "parameters": {
                "type": "object",
                "properties": {
                    "booking_id": {
                        "type": "integer",
                        "description": "ID of the booking to cancel"
                    }
                },
                "required": ["booking_id"]
            }
        }
    }
]


async def execute_function(name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
    """Execute a booking function and return the result."""
    try:
        if name == "create_booking":
            event_date = datetime.strptime(arguments["event_date"], "%Y-%m-%d").date()
            return await create_booking(
                customer_name=arguments["customer_name"],
                customer_phone=arguments["customer_phone"],
                event_type=arguments["event_type"],
                event_date=event_date,
                guest_count=arguments.get("guest_count"),
                special_requests=arguments.get("special_requests")
            )
        
        elif name == "check_booking":
            return await get_booking_by_phone(arguments["phone"])
        
        elif name == "check_availability":
            check_date = datetime.strptime(arguments["date"], "%Y-%m-%d").date()
            return await check_availability(check_date)
        
        elif name == "modify_booking":
            new_date = None
            if "new_date" in arguments:
                new_date = datetime.strptime(arguments["new_date"], "%Y-%m-%d").date()
            return await update_booking(
                booking_id=arguments["booking_id"],
                event_date=new_date,
                guest_count=arguments.get("new_guest_count"),
                special_requests=arguments.get("special_requests")
            )
        
        elif name == "cancel_booking":
            return await cancel_booking(arguments["booking_id"])
        
        else:
            return {"error": f"Unknown function: {name}"}
    
    except Exception as e:
        return {"error": str(e)}


class ChatbotService:
    def __init__(self):
        self.client = None
        if GEMINI_API_KEY:
            self.client = OpenAI(
                api_key=GEMINI_API_KEY,
                base_url=GEMINI_API_BASE_URL
            )
    
    def is_configured(self) -> bool:
        """Check if the chatbot is properly configured with API key."""
        return self.client is not None and GEMINI_API_KEY != ""
    
    async def get_rag_context(self, query: str) -> str:
        """Retrieve relevant knowledge from the database using RAG."""
        if not embeddings_configured() or not db_configured():
            print("RAG skipped: embeddings or db not configured")
            return ""
        
        try:
            import asyncio
            print(f"Starting RAG query for: {query[:50]}...")
            # Add 10 second timeout to prevent blocking
            results = await asyncio.wait_for(
                search_knowledge(query, top_k=3),
                timeout=10.0
            )
            print(f"RAG query returned {len(results)} results")
            if results:
                context_parts = [
                    f"[{r['category']}]: {r['content']}" 
                    for r in results if r['similarity'] > 0.5
                ]
                if context_parts:
                    return "\n\n## Relevant Information:\n" + "\n".join(context_parts)
        except asyncio.TimeoutError:
            print("RAG query timeout - skipping context enrichment")
        except Exception as e:
            print(f"RAG context error: {e}")
        
        return ""
    
    async def get_response(self, message: str, conversation_history: List[ChatMessage] = None) -> str:
        """Generate a response using Gemini API with RAG and function calling."""
        
        if not self.is_configured():
            return "I'm sorry, but I'm not properly configured at the moment. Please contact us directly at +92 300 1609087 for assistance with your inquiry."
        
        try:
            # Get RAG context for enriched responses
            rag_context = await self.get_rag_context(message)
            
            # Build system prompt with RAG context
            enhanced_prompt = SYSTEM_PROMPT
            if rag_context:
                enhanced_prompt += rag_context
            
            # Build messages list
            messages = [{"role": "system", "content": enhanced_prompt}]
            
            # Add conversation history (limited to prevent token overflow)
            if conversation_history:
                history_to_include = conversation_history[-MAX_CONVERSATION_HISTORY:]
                for msg in history_to_include:
                    messages.append({
                        "role": msg.role,
                        "content": msg.content
                    })
            
            # Add current user message
            messages.append({"role": "user", "content": message})
            
            # Call Gemini API with function calling enabled (if DB is configured)
            call_params = {
                "model": "gemini-2.5-flash",
                "messages": messages,
                "max_tokens": 500,
                "temperature": 0.7
            }
            
            # Only enable function calling if database is configured
            if db_configured():
                call_params["tools"] = BOOKING_FUNCTIONS
                call_params["tool_choice"] = "auto"
            
            response = self.client.chat.completions.create(**call_params)
            
            response_message = response.choices[0].message
            
            # Check if the model wants to call a function
            if hasattr(response_message, 'tool_calls') and response_message.tool_calls:
                # Execute each function call
                tool_results = []
                for tool_call in response_message.tool_calls:
                    function_name = tool_call.function.name
                    function_args = json.loads(tool_call.function.arguments)
                    
                    print(f"Executing function: {function_name} with args: {function_args}")
                    
                    result = await execute_function(function_name, function_args)
                    tool_results.append({
                        "tool_call_id": tool_call.id,
                        "role": "tool",
                        "content": json.dumps(result)
                    })
                
                # Add the assistant message and tool results to get final response
                messages.append({
                    "role": "assistant",
                    "content": response_message.content or "",
                    "tool_calls": [
                        {
                            "id": tc.id,
                            "type": "function",
                            "function": {
                                "name": tc.function.name,
                                "arguments": tc.function.arguments
                            }
                        }
                        for tc in response_message.tool_calls
                    ]
                })
                messages.extend(tool_results)
                
                # Get final response after function execution
                final_response = self.client.chat.completions.create(
                    model="gemini-2.5-flash",
                    messages=messages,
                    max_tokens=500,
                    temperature=0.7
                )
                
                return final_response.choices[0].message.content
            
            return response_message.content
            
        except Exception as e:
            import traceback
            print(f"Error calling Gemini API: {e}")
            print(f"Error type: {type(e).__name__}")
            print(f"Full traceback:\n{traceback.format_exc()}")
            return "I apologize, but I'm experiencing some technical difficulties. Please try again or contact us directly at +92 300 1609087 for immediate assistance."


# Singleton instance
chatbot_service = ChatbotService()
