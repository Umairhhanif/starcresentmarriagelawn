# Booking Dashboard

A comprehensive dashboard to manage bookings from the Star Crescent Marriage Lawn chatbot.

## Features

- **View All Bookings**: See all bookings created through the chatbot in a clean table format
- **Real-time Statistics**: View total, pending, confirmed, and cancelled bookings at a glance
- **Filter Bookings**: Filter by status (pending, confirmed, cancelled, rejected)
- **Update Status**: Confirm or reject pending bookings, cancel confirmed bookings
- **Delete Bookings**: Permanently remove bookings (with confirmation)
- **Detailed View**: Click on any booking to see full details including special requests
- **Responsive Design**: Works on desktop and mobile devices

## Access the Dashboard

Navigate to: `http://localhost:3000/dashboard`

## Backend API Endpoints

The dashboard uses the following API endpoints:

### Get All Bookings
```
GET /api/bookings/?status={status}&limit={limit}&offset={offset}
```
- **Query Parameters**:
  - `status` (optional): Filter by status (pending, confirmed, cancelled, rejected)
  - `limit` (optional): Number of results per page (default: 100)
  - `offset` (optional): Pagination offset (default: 0)

### Get Single Booking
```
GET /api/bookings/{booking_id}
```

### Update Booking
```
PUT /api/bookings/{booking_id}
```
- **Body**:
```json
{
  "status": "confirmed",
  "event_date": "2024-06-15",
  "guest_count": 200,
  "special_requests": "Updated requests"
}
```

### Delete Booking
```
DELETE /api/bookings/{booking_id}
```

### Cancel Booking
```
POST /api/bookings/{booking_id}/cancel
```

### Check Availability
```
GET /api/bookings/availability/{date}
```

### Get Bookings by Phone
```
GET /api/bookings/phone/{phone_number}
```

## Status Values

- **pending**: Newly created booking awaiting review
- **confirmed**: Booking has been approved
- **cancelled**: Booking was cancelled after confirmation
- **rejected**: Booking was rejected during review

## Database Schema

The bookings are stored in PostgreSQL (Neon) with the following schema:

```sql
CREATE TABLE bookings (
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
```

## Setup Instructions

### 1. Backend Setup

The backend API endpoints are already configured in `backend/main.py`. Make sure your backend is running:

```bash
cd backend
python -m uvicorn main:app --reload
```

### 2. Frontend Setup

Make sure the environment variable is set in `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

For production, update this to your production backend URL.

### 3. Run the Dashboard

```bash
npm run dev
```

Visit `http://localhost:3000/dashboard`

## Dashboard Actions

### Confirm a Booking
1. Click the green check icon next to a pending booking
2. Or click the booking row to open details and click "Confirm"

### Reject a Booking
1. Click the red X icon next to a pending booking
2. Or click the booking row to open details and click "Reject"

### Cancel a Confirmed Booking
1. Click the red X icon next to a confirmed booking
2. Or click the booking row to open details and click "Cancel Booking"

### Delete a Booking
1. Click the trash icon next to any booking
2. Confirm the deletion in the popup
3. **Warning**: This permanently removes the booking from the database

## Customization

### Change Status Colors

Edit the `statusColors` object in `src/app/dashboard/page.tsx`:

```typescript
const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  confirmed: 'bg-green-100 text-green-800 border-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
  rejected: 'bg-gray-100 text-gray-800 border-gray-300',
};
```

### Add More Filters

You can extend the filter options by adding more select dropdowns or search inputs in the Filters section.

### Modify Table Columns

Edit the table headers and rows in the JSX to add or remove columns as needed.

## Troubleshooting

### Dashboard shows "Failed to fetch bookings"
- Check if the backend is running on the correct port
- Verify CORS is properly configured in `backend/main.py`
- Check the `NEXT_PUBLIC_BACKEND_URL` in `.env.local`

### Bookings not appearing
- Verify bookings exist in the database
- Check the backend logs for any errors
- Ensure the database connection is working

### Actions not working
- Open browser console to see error messages
- Verify the backend API endpoints are accessible
- Check authentication if you've added it

## Security Considerations

Currently, the dashboard has no authentication. For production:

1. **Add Authentication**: Implement user login with JWT or session-based auth
2. **Role-Based Access**: Restrict dashboard access to admin users only
3. **Rate Limiting**: Add rate limiting to prevent abuse
4. **Input Validation**: Validate all user inputs on both frontend and backend
5. **HTTPS**: Always use HTTPS in production

## Future Enhancements

- [ ] Add authentication and user management
- [ ] Export bookings to CSV/Excel
- [ ] Email notifications for status changes
- [ ] Calendar view of bookings
- [ ] Booking analytics and reports
- [ ] Search functionality (by name, phone, date range)
- [ ] Bulk operations (confirm/cancel multiple bookings)
- [ ] Booking notes and internal comments
- [ ] Audit log for tracking changes
