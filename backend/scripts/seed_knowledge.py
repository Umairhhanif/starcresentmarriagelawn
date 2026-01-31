"""
Knowledge Base Seeding Script
Populates the knowledge_embeddings table with venue information
"""
import asyncio
import sys
sys.path.insert(0, '..')

from database import init_db, close_db
from services.embeddings import add_knowledge, is_configured

# Knowledge chunks about Star Crescent Marriage Lawn
KNOWLEDGE_BASE = [
    # Services
    {
        "content": "Star Crescent Marriage Lawn offers complete Wedding Ceremony services including Nikkah Setup, Baraat Stage, Floral Décor, and professional coordination. Our stunning outdoor lawn and elegant indoor halls create the perfect setting for your special day. Capacity ranges from 600 to 1000 guests.",
        "category": "services"
    },
    {
        "content": "Reception and Walima packages include Gourmet Catering with customizable menus, elegant Stage Design, professional Sound System with DJ options, and beautiful lighting arrangements. We specialize in creating memorable dining experiences.",
        "category": "services"
    },
    {
        "content": "For Corporate Events, we provide state-of-the-art AV Equipment, flexible Seating Layouts (theater, classroom, banquet styles), and Professional Catering. Perfect for conferences, seminars, product launches, and corporate celebrations.",
        "category": "services"
    },
    {
        "content": "Birthday Party packages feature Theme Décor customization, Entertainment packages including games and activities, Custom Cakes from partner bakeries, and dedicated party coordinators. Suitable for all ages from kids to milestone celebrations.",
        "category": "services"
    },
    {
        "content": "Mehndi and Sangeet events include Vibrant Stage Décor with colorful themes, DJ and Live Music options, Colorful LED Lighting, and space for traditional activities. We create the perfect festive atmosphere for pre-wedding celebrations.",
        "category": "services"
    },
    {
        "content": "Photography Setup services include professional Photo Booths with props, Beautiful Backdrops for photo sessions, Drone Photography arrangements, and coordination with videographers. We ensure picture-perfect moments throughout your event.",
        "category": "services"
    },
    
    # Location and Contact
    {
        "content": "Star Crescent Marriage Lawn is located at Jinnah Avenue, Model Colony, Alamgir Society B Area, Karachi, Pakistan. The venue is easily accessible with ample parking space for guests.",
        "category": "location"
    },
    {
        "content": "Contact Star Crescent Marriage Lawn at +92 300 1609087. WhatsApp is available on the same number for quick responses. For bookings and site visits, contact us any time. Email correspondence is also available.",
        "category": "contact"
    },
    {
        "content": "Operating Hours: Star Crescent Marriage Lawn is open daily from 4:00 PM to 12:00 AM (Midnight). Site visits can be arranged by appointment during these hours or by special arrangement.",
        "category": "hours"
    },
    
    # Capacity and Amenities
    {
        "content": "Star Crescent can accommodate events ranging from 600 to 1000 guests. The venue features both spacious outdoor lawn areas and elegant indoor halls, allowing for flexible arrangements based on event size and weather conditions.",
        "category": "capacity"
    },
    {
        "content": "Venue amenities include: Ample parking space, Air-conditioned indoor halls, Beautifully landscaped outdoor lawns, Modern lighting systems, Professional sound equipment, Bridal rooms for preparation, and Guest waiting areas.",
        "category": "amenities"
    },
    
    # Booking Information
    {
        "content": "Booking Process: Contact us via phone or WhatsApp at +92 300 1609087 to check date availability. Site visits can be arranged before booking. We require an advance booking deposit to confirm your date. Customized packages are available based on your requirements and budget.",
        "category": "booking"
    },
    {
        "content": "Packages and Pricing: We offer customized packages based on guest count, services required, and event type. Basic packages include venue, basic décor, and catering. Premium packages add photography, entertainment, and enhanced décor. Contact us for a personalized quote.",
        "category": "pricing"
    },
    
    # Catering
    {
        "content": "Catering options include traditional Pakistani cuisine, Continental dishes, BBQ setups, and fusion menus. We work with top caterers in Karachi. Menu customization is available. Halal certification is standard for all food services.",
        "category": "catering"
    },
    {
        "content": "Special dietary requirements including vegetarian, vegan, and specific dietary restrictions can be accommodated with advance notice. Kids' menus and separate dessert stations are also available.",
        "category": "catering"
    }
]


async def seed_knowledge():
    """Seed the knowledge base with venue information."""
    print("Starting knowledge base seeding...")
    
    if not is_configured():
        print("Error: Cohere API key not configured")
        return False
    
    # Initialize database
    if not await init_db():
        print("Error: Could not initialize database")
        return False
    
    success_count = 0
    for item in KNOWLEDGE_BASE:
        print(f"Adding: {item['category']} - {item['content'][:50]}...")
        if await add_knowledge(item["content"], item["category"]):
            success_count += 1
        else:
            print(f"  Failed to add item")
    
    print(f"\nSeeding complete: {success_count}/{len(KNOWLEDGE_BASE)} items added")
    
    await close_db()
    return success_count == len(KNOWLEDGE_BASE)


if __name__ == "__main__":
    asyncio.run(seed_knowledge())
