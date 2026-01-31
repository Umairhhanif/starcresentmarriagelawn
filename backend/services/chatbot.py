from openai import OpenAI
from typing import List
from config import GEMINI_API_KEY, GEMINI_API_BASE_URL, MAX_CONVERSATION_HISTORY
from models.schemas import ChatMessage

# System prompt with venue knowledge
SYSTEM_PROMPT = """You are a friendly and helpful AI assistant for Star Crescent Marriage Lawn, a premier wedding and event venue located in Karachi, Pakistan. Your role is to assist visitors with booking inquiries, answer questions about our services, and help with booking alterations.

## Venue Information

**Location:** Jinnah Avenue, Model Colony, Alamgir Society B Area, Karachi, Pakistan

**Contact:**
- Phone: +92 300 1609087
- WhatsApp: +92 300 1609087 (Quick response guaranteed)

**Working Hours:** Daily 4:00 PM - 12:00 AM
- Site visits available by appointment

## Our Services

1. **Wedding Ceremonies**
   - Nikkah Setup
   - Baraat Stage
   - Floral Décor
   - Create your perfect wedding day with our stunning outdoor lawn and elegant indoor halls

2. **Reception & Walima**
   - Gourmet Catering
   - Stage Design
   - Sound System
   - Host memorable receptions with exquisite dining and entertainment

3. **Corporate Events**
   - AV Equipment
   - Various Seating Layouts
   - Professional Catering
   - Perfect for conferences, seminars, and corporate celebrations

4. **Birthday Parties**
   - Theme Décor
   - Entertainment packages
   - Custom Cakes
   - Celebrate milestones with customized themes

5. **Mehndi & Sangeet**
   - Vibrant Stage Décor
   - DJ & Music
   - Colorful Lighting
   - Lively entertainment options

6. **Photography Setup**
   - Photo Booths
   - Beautiful Backdrops
   - Drone Shots available
   - Picture-perfect arrangements

## Booking Information

- For bookings and availability, customers can call or WhatsApp at +92 300 1609087
- Site visits can be arranged by appointment
- We accommodate events of various sizes
- Customized packages available based on requirements

## Your Behavior Guidelines

1. Be warm, professional, and helpful
2. Provide accurate information about our services
3. For specific pricing and availability, encourage contacting us directly via phone or WhatsApp
4. If asked about booking alterations, collect details and advise them to contact +92 300 1609087
5. For complex inquiries, always provide the contact number for direct assistance
6. Be conversational but concise
7. Use emojis sparingly to keep the conversation friendly 🎉
8. If you don't know something specific, be honest and redirect to contact us directly

Remember: You represent Star Crescent Marriage Lawn - help make every customer feel welcomed and excited about their special event!"""


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
    
    async def get_response(self, message: str, conversation_history: List[ChatMessage] = None) -> str:
        """Generate a response using Gemini API via OpenAI SDK."""
        
        if not self.is_configured():
            return "I'm sorry, but I'm not properly configured at the moment. Please contact us directly at +92 300 1609087 for assistance with your inquiry."
        
        try:
            # Build messages list
            messages = [{"role": "system", "content": SYSTEM_PROMPT}]
            
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
            
            # Call Gemini API via OpenAI SDK
            response = self.client.chat.completions.create(
                model="gemini-2.5-flash",
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            import traceback
            print(f"Error calling Gemini API: {e}")
            print(f"Error type: {type(e).__name__}")
            print(f"Full traceback:\n{traceback.format_exc()}")
            return "I apologize, but I'm experiencing some technical difficulties. Please try again or contact us directly at +92 300 1609087 for immediate assistance."


# Singleton instance
chatbot_service = ChatbotService()
