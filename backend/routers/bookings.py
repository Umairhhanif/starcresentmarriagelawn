from fastapi import APIRouter, HTTPException, Query
from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel
from services import booking as booking_service

router = APIRouter(prefix="/api/bookings", tags=["bookings"])


class BookingCreate(BaseModel):
    customer_name: str
    customer_phone: str
    event_type: str
    event_date: date
    customer_email: Optional[str] = None
    guest_count: Optional[int] = None
    package_type: Optional[str] = None
    special_requests: Optional[str] = None


class BookingUpdate(BaseModel):
    event_date: Optional[date] = None
    guest_count: Optional[int] = None
    special_requests: Optional[str] = None
    status: Optional[str] = None


@router.get("/")
async def get_all_bookings(
    status: Optional[str] = Query(None, description="Filter by status"),
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0)
):
    """
    Get all bookings with optional filtering.
    """
    result = await booking_service.get_all_bookings(
        status_filter=status,
        limit=limit,
        offset=offset
    )

    if not result["success"]:
        raise HTTPException(status_code=500, detail=result.get("error", "Unknown error"))

    return result


@router.get("/{booking_id}")
async def get_booking(booking_id: int):
    """
    Get a specific booking by ID.
    """
    result = await booking_service.get_booking_by_id(booking_id)

    if not result["success"]:
        raise HTTPException(
            status_code=404 if "not found" in result.get("error", "").lower() else 500,
            detail=result.get("error", "Unknown error")
        )

    return result


@router.post("/")
async def create_booking(booking: BookingCreate):
    """
    Create a new booking.
    """
    result = await booking_service.create_booking(
        customer_name=booking.customer_name,
        customer_phone=booking.customer_phone,
        event_type=booking.event_type,
        event_date=booking.event_date,
        customer_email=booking.customer_email,
        guest_count=booking.guest_count,
        package_type=booking.package_type,
        special_requests=booking.special_requests
    )

    if not result["success"]:
        raise HTTPException(status_code=500, detail=result.get("error", "Unknown error"))

    return result


@router.put("/{booking_id}")
async def update_booking(booking_id: int, booking: BookingUpdate):
    """
    Update an existing booking.
    """
    result = await booking_service.update_booking(
        booking_id=booking_id,
        event_date=booking.event_date,
        guest_count=booking.guest_count,
        special_requests=booking.special_requests,
        status=booking.status
    )

    if not result["success"]:
        raise HTTPException(
            status_code=404 if "not found" in result.get("error", "").lower() else 500,
            detail=result.get("error", "Unknown error")
        )

    return result


@router.delete("/{booking_id}")
async def delete_booking(booking_id: int):
    """
    Delete a booking permanently.
    """
    result = await booking_service.delete_booking(booking_id)

    if not result["success"]:
        raise HTTPException(
            status_code=404 if "not found" in result.get("error", "").lower() else 500,
            detail=result.get("error", "Unknown error")
        )

    return result


@router.get("/phone/{phone}")
async def get_bookings_by_phone(phone: str):
    """
    Get all bookings for a specific phone number.
    """
    result = await booking_service.get_booking_by_phone(phone)

    if not result["success"]:
        raise HTTPException(status_code=500, detail=result.get("error", "Unknown error"))

    return result


@router.get("/availability/{check_date}")
async def check_availability(check_date: date):
    """
    Check if a specific date is available for booking.
    """
    result = await booking_service.check_availability(check_date)

    if not result["success"]:
        raise HTTPException(status_code=500, detail=result.get("error", "Unknown error"))

    return result


@router.post("/{booking_id}/cancel")
async def cancel_booking(booking_id: int):
    """
    Cancel a booking.
    """
    result = await booking_service.cancel_booking(booking_id)

    if not result["success"]:
        raise HTTPException(
            status_code=404 if "not found" in result.get("error", "").lower() else 500,
            detail=result.get("error", "Unknown error")
        )

    return result
