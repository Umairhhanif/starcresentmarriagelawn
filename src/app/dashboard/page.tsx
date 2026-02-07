'use client';

import { useEffect, useState } from 'react';
import { Trash2, Check, X, Clock, Calendar, Users, Mail, Phone, Package, FileText } from 'lucide-react';

interface Booking {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  event_type: string;
  event_date: string;
  guest_count: number | null;
  package_type: string | null;
  special_requests: string | null;
  status: string;
  created_at: string;
  updated_at: string | null;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  confirmed: 'bg-green-100 text-green-800 border-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
  rejected: 'bg-gray-100 text-gray-800 border-gray-300',
};

const statusIcons = {
  pending: Clock,
  confirmed: Check,
  cancelled: X,
  rejected: X,
};

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = statusFilter
        ? `${BACKEND_URL}/api/bookings/?status=${statusFilter}`
        : `${BACKEND_URL}/api/bookings/`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data.bookings || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: number, newStatus: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking');
      }

      await fetchBookings();
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(null);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update booking');
    }
  };

  const deleteBooking = async (bookingId: number) => {
    if (!confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      await fetchBookings();
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(null);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete booking');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Dashboard</h1>
          <p className="text-gray-600">Manage bookings from Star Crescent Marriage Lawn</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-1">Total Bookings</div>
            <div className="text-3xl font-bold text-gray-900">{total}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">
              {bookings.filter((b) => b.status === 'pending').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="text-sm text-gray-600 mb-1">Confirmed</div>
            <div className="text-3xl font-bold text-green-600">
              {bookings.filter((b) => b.status === 'confirmed').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
            <div className="text-sm text-gray-600 mb-1">Cancelled</div>
            <div className="text-3xl font-bold text-red-600">
              {bookings.filter((b) => b.status === 'cancelled').length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              onClick={fetchBookings}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        )}

        {/* Bookings Table */}
        {!loading && bookings.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => {
                    const StatusIcon = statusIcons[booking.status as keyof typeof statusIcons] || Clock;
                    return (
                      <tr
                        key={booking.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{booking.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.customer_name}</div>
                          <div className="text-sm text-gray-500">{booking.customer_phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.event_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(booking.event_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
                              statusColors[booking.status as keyof typeof statusColors] || statusColors.pending
                            }`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            {booking.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                  className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                                  title="Confirm"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => updateBookingStatus(booking.id, 'rejected')}
                                  className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                                  title="Reject"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteBooking(booking.id)}
                              className="text-gray-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">
              {statusFilter
                ? `No bookings with status "${statusFilter}"`
                : 'No bookings have been created yet'}
            </p>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                  <p className="text-sm text-gray-500">ID: #{selectedBooking.id}</p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <Users className="w-4 h-4" />
                      Customer Name
                    </div>
                    <div className="text-gray-900 font-medium">{selectedBooking.customer_name}</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <Phone className="w-4 h-4" />
                      Phone
                    </div>
                    <div className="text-gray-900 font-medium">{selectedBooking.customer_phone}</div>
                  </div>

                  {selectedBooking.customer_email && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Mail className="w-4 h-4" />
                        Email
                      </div>
                      <div className="text-gray-900 font-medium">{selectedBooking.customer_email}</div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <Calendar className="w-4 h-4" />
                      Event Date
                    </div>
                    <div className="text-gray-900 font-medium">{formatDate(selectedBooking.event_date)}</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <FileText className="w-4 h-4" />
                      Event Type
                    </div>
                    <div className="text-gray-900 font-medium">{selectedBooking.event_type}</div>
                  </div>

                  {selectedBooking.guest_count && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Users className="w-4 h-4" />
                        Guest Count
                      </div>
                      <div className="text-gray-900 font-medium">{selectedBooking.guest_count}</div>
                    </div>
                  )}

                  {selectedBooking.package_type && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Package className="w-4 h-4" />
                        Package Type
                      </div>
                      <div className="text-gray-900 font-medium">{selectedBooking.package_type}</div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <Clock className="w-4 h-4" />
                      Status
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
                        statusColors[selectedBooking.status as keyof typeof statusColors] || statusColors.pending
                      }`}
                    >
                      {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                    </span>
                  </div>
                </div>

                {selectedBooking.special_requests && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Special Requests</div>
                    <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedBooking.special_requests}</div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 mb-1">Created At</div>
                    <div className="text-gray-900">{formatDateTime(selectedBooking.created_at)}</div>
                  </div>
                  {selectedBooking.updated_at && (
                    <div>
                      <div className="text-gray-500 mb-1">Updated At</div>
                      <div className="text-gray-900">{formatDateTime(selectedBooking.updated_at)}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-3 justify-end">
                {selectedBooking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Confirm
                    </button>
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'rejected')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel Booking
                  </button>
                )}
                <button
                  onClick={() => deleteBooking(selectedBooking.id)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
