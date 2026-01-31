"""
Booking Service for Star Crescent Marriage Lawn
Handles booking creation, retrieval, and management
"""
from datetime import date, datetime
from typing import Optional, List, Dict, Any
from database import get_connection, is_configured


async def create_booking(
    customer_name: str,
    customer_phone: str,
    event_type: str,
    event_date: date,
    customer_email: Optional[str] = None,
    guest_count: Optional[int] = None,
    package_type: Optional[str] = None,
    special_requests: Optional[str] = None
) -> Dict[str, Any]:
    """
    Create a new booking.
    Returns the created booking with its ID.
    """
    if not is_configured():
        return {"success": False, "error": "Database not configured"}
    
    try:
        async with get_connection() as conn:
            result = await conn.fetchrow('''
                INSERT INTO bookings 
                (customer_name, customer_phone, customer_email, event_type, 
                 event_date, guest_count, package_type, special_requests, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
                RETURNING id, customer_name, customer_phone, event_type, 
                          event_date, guest_count, status, created_at
            ''', customer_name, customer_phone, customer_email, event_type,
                event_date, guest_count, package_type, special_requests)
            
            return {
                "success": True,
                "booking": {
                    "id": result["id"],
                    "customer_name": result["customer_name"],
                    "customer_phone": result["customer_phone"],
                    "event_type": result["event_type"],
                    "event_date": result["event_date"].isoformat(),
                    "guest_count": result["guest_count"],
                    "status": result["status"],
                    "created_at": result["created_at"].isoformat()
                }
            }
    except Exception as e:
        print(f"Create booking error: {e}")
        return {"success": False, "error": str(e)}


async def get_booking_by_phone(phone: str) -> Dict[str, Any]:
    """
    Retrieve bookings by customer phone number.
    Returns list of bookings for this phone number.
    """
    if not is_configured():
        return {"success": False, "error": "Database not configured"}
    
    try:
        async with get_connection() as conn:
            results = await conn.fetch('''
                SELECT id, customer_name, customer_phone, customer_email,
                       event_type, event_date, guest_count, package_type,
                       special_requests, status, created_at
                FROM bookings
                WHERE customer_phone = $1
                ORDER BY event_date DESC
            ''', phone)
            
            bookings = [
                {
                    "id": row["id"],
                    "customer_name": row["customer_name"],
                    "customer_phone": row["customer_phone"],
                    "customer_email": row["customer_email"],
                    "event_type": row["event_type"],
                    "event_date": row["event_date"].isoformat(),
                    "guest_count": row["guest_count"],
                    "package_type": row["package_type"],
                    "special_requests": row["special_requests"],
                    "status": row["status"],
                    "created_at": row["created_at"].isoformat()
                }
                for row in results
            ]
            
            return {"success": True, "bookings": bookings}
    except Exception as e:
        print(f"Get booking error: {e}")
        return {"success": False, "error": str(e)}


async def get_booking_by_id(booking_id: int) -> Dict[str, Any]:
    """Retrieve a specific booking by ID."""
    if not is_configured():
        return {"success": False, "error": "Database not configured"}
    
    try:
        async with get_connection() as conn:
            row = await conn.fetchrow('''
                SELECT id, customer_name, customer_phone, customer_email,
                       event_type, event_date, guest_count, package_type,
                       special_requests, status, created_at
                FROM bookings
                WHERE id = $1
            ''', booking_id)
            
            if not row:
                return {"success": False, "error": "Booking not found"}
            
            return {
                "success": True,
                "booking": {
                    "id": row["id"],
                    "customer_name": row["customer_name"],
                    "customer_phone": row["customer_phone"],
                    "customer_email": row["customer_email"],
                    "event_type": row["event_type"],
                    "event_date": row["event_date"].isoformat(),
                    "guest_count": row["guest_count"],
                    "package_type": row["package_type"],
                    "special_requests": row["special_requests"],
                    "status": row["status"],
                    "created_at": row["created_at"].isoformat()
                }
            }
    except Exception as e:
        print(f"Get booking by ID error: {e}")
        return {"success": False, "error": str(e)}


async def update_booking(
    booking_id: int,
    event_date: Optional[date] = None,
    guest_count: Optional[int] = None,
    special_requests: Optional[str] = None,
    status: Optional[str] = None
) -> Dict[str, Any]:
    """
    Update an existing booking.
    Only provided fields will be updated.
    """
    if not is_configured():
        return {"success": False, "error": "Database not configured"}
    
    # Build dynamic update query
    updates = []
    values = []
    param_count = 1
    
    if event_date is not None:
        updates.append(f"event_date = ${param_count}")
        values.append(event_date)
        param_count += 1
    
    if guest_count is not None:
        updates.append(f"guest_count = ${param_count}")
        values.append(guest_count)
        param_count += 1
    
    if special_requests is not None:
        updates.append(f"special_requests = ${param_count}")
        values.append(special_requests)
        param_count += 1
    
    if status is not None:
        updates.append(f"status = ${param_count}")
        values.append(status)
        param_count += 1
    
    if not updates:
        return {"success": False, "error": "No fields to update"}
    
    updates.append(f"updated_at = ${param_count}")
    values.append(datetime.now())
    param_count += 1
    
    values.append(booking_id)
    
    try:
        async with get_connection() as conn:
            query = f'''
                UPDATE bookings 
                SET {", ".join(updates)}
                WHERE id = ${param_count}
                RETURNING id, customer_name, event_type, event_date, 
                          guest_count, status, updated_at
            '''
            result = await conn.fetchrow(query, *values)
            
            if not result:
                return {"success": False, "error": "Booking not found"}
            
            return {
                "success": True,
                "booking": {
                    "id": result["id"],
                    "customer_name": result["customer_name"],
                    "event_type": result["event_type"],
                    "event_date": result["event_date"].isoformat(),
                    "guest_count": result["guest_count"],
                    "status": result["status"],
                    "updated_at": result["updated_at"].isoformat()
                }
            }
    except Exception as e:
        print(f"Update booking error: {e}")
        return {"success": False, "error": str(e)}


async def check_availability(check_date: date) -> Dict[str, Any]:
    """
    Check if a date is available for booking.
    Returns availability status and existing bookings count.
    """
    if not is_configured():
        return {"success": False, "error": "Database not configured"}
    
    try:
        async with get_connection() as conn:
            # Count confirmed bookings on this date
            count = await conn.fetchval('''
                SELECT COUNT(*) FROM bookings
                WHERE event_date = $1 
                AND status NOT IN ('cancelled', 'rejected')
            ''', check_date)
            
            # Assuming max 2 events per day (morning/evening)
            MAX_EVENTS_PER_DAY = 2
            is_available = count < MAX_EVENTS_PER_DAY
            
            return {
                "success": True,
                "date": check_date.isoformat(),
                "available": is_available,
                "existing_bookings": count,
                "max_bookings": MAX_EVENTS_PER_DAY,
                "message": "Date is available!" if is_available else "This date is fully booked. Please try another date."
            }
    except Exception as e:
        print(f"Check availability error: {e}")
        return {"success": False, "error": str(e)}


async def cancel_booking(booking_id: int) -> Dict[str, Any]:
    """Cancel a booking by setting its status to 'cancelled'."""
    return await update_booking(booking_id, status="cancelled")
