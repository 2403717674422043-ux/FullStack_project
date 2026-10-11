import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { bookingService } from '../services/bookingService';
import { useToast } from '../context/ToastContext';
import { 
  CalendarCheck, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Trash2,
  RefreshCw,
  Building2,
  Sparkles
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const MyRequestsPage = () => {
  const { showSuccess, showError } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'pending', 'approved', 'rejected', 'cancelled'];

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingService.getMyBookings();
      if (res.success) {
        setBookings(res.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      showError('Failed to load your booking requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking request?')) return;

    try {
      const res = await bookingService.updateBookingStatus(id, { status: 'cancelled' });
      if (res.success) {
        showSuccess('Booking request cancelled successfully.');
        fetchBookings();
      }
    } catch (error) {
      console.error('Cancel Error:', error);
      showError(error.message || 'Failed to cancel booking.');
    }
  };

  const filteredBookings = activeTab === 'All'
    ? bookings
    : bookings.filter(b => b.status === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#17352F] bg-[#F7F4EA]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 text-left">
          <span className="px-3.5 py-1 text-xs font-extrabold bg-[#32C6BE] text-[#123C36] uppercase tracking-wider inline-block rounded-full border border-[#123C36]">
            RESERVATION STATUS
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display uppercase tracking-tight text-[#123C36]">MY BOOKING REQUESTS</h1>
          <p className="text-xs sm:text-sm text-[#4D6B63] font-mono">Track and manage space reservations submitted to administrators</p>
        </div>

        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 px-5 py-3 bg-[#FFFDF7] border-2 border-[#123C36] rounded-full text-xs font-extrabold uppercase text-[#123C36] hover:bg-[#32C6BE]"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#32C6BE]" /> RELOAD LIST
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b-2 border-[#123C36]/10 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-all rounded-full border-2 ${
              activeTab === tab
                ? 'bg-[#32C6BE] text-[#123C36] border-[#123C36]'
                : 'bg-[#FFFDF7] text-[#17352F] border-[#123C36]/20 hover:border-[#32C6BE]'
            }`}
          >
            {tab} {tab !== 'All' && `(${bookings.filter(b => b.status === tab).length})`}
          </button>
        ))}
      </div>

      {/* Request Cards Stream */}
      {loading ? (
        <LoadingSpinner text="FETCHING RESERVATION STATUSES..." />
      ) : filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 text-left">
          {filteredBookings.map((b) => (
            <div key={b._id} className="organic-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full border ${
                    b.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-500' :
                    b.status === 'pending' ? 'bg-amber-100 text-amber-800 border-amber-500' :
                    b.status === 'rejected' ? 'bg-rose-100 text-rose-800 border-rose-500' :
                    'bg-gray-100 text-gray-700 border-gray-300'
                  }`}>
                    STATUS: {b.status}
                  </span>
                  <span className="text-xs font-mono text-[#4D6B63]">
                    REF: #{b._id.slice(-6).toUpperCase()}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold font-display text-[#123C36] uppercase">{b.space?.name || 'PUBLIC SPACE'}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-[#4D6B63] pt-1">
                  <div>
                    <span className="block text-[10px] text-[#123C36] uppercase font-bold">DATE & TIME</span>
                    {new Date(b.requestedDate).toLocaleDateString()} • {b.startTime} - {b.endTime}
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#123C36] uppercase font-bold">PARTICIPANTS</span>
                    {b.expectedParticipants} Guests
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#123C36] uppercase font-bold">PURPOSE</span>
                    <span className="truncate block max-w-xs">{b.purpose}</span>
                  </div>
                </div>

                {b.adminNotes && (
                  <div className="p-3 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono rounded-xl mt-2">
                    <strong>ADMIN NOTES:</strong> {b.adminNotes}
                  </div>
                )}
              </div>

              {/* Action Button */}
              {b.status === 'pending' && (
                <button
                  onClick={() => handleCancelBooking(b._id)}
                  className="px-4 py-2 text-xs font-extrabold text-rose-700 hover:bg-rose-100 border border-rose-400 rounded-xl transition-colors uppercase self-start md:self-center"
                >
                  CANCEL REQUEST
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="organic-card p-12 text-center text-[#4D6B63] text-xs font-mono">
          NO BOOKING REQUESTS FOUND FOR THIS CATEGORY.
        </div>
      )}
    </div>
  );
};

export default MyRequestsPage;
