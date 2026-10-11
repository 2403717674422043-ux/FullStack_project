import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/bookingService';
import { activityService } from '../services/activityService';
import { 
  CalendarCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Users, 
  Plus, 
  Search, 
  Sparkles, 
  Building2,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const UserDashboardPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const [bookingsRes, activitiesRes] = await Promise.all([
          bookingService.getMyBookings(),
          activityService.getActivities()
        ]);

        if (bookingsRes.success) {
          setBookings(bookingsRes.data);
        }

        if (activitiesRes.success && user) {
          const myActs = activitiesRes.data.filter(
            a => (a.organizer?._id || a.organizer) === user._id
          );
          setActivities(myActs);
        }
      } catch (error) {
        console.error('Dashboard Data Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Dynamically calculated stats from real MongoDB documents
  const totalBookings = bookings.length;
  const pendingRequests = bookings.filter(b => b.status === 'pending').length;
  const approvedRequests = bookings.filter(b => b.status === 'approved').length;
  const activitiesCreated = activities.length;

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'GOOD MORNING' : currentHour < 18 ? 'GOOD AFTERNOON' : 'GOOD EVENING';

  if (loading) {
    return <LoadingSpinner fullScreen text="CALCULATING REAL-TIME DATABASE METRICS..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#17352F] bg-[#F7F4EA]">
      {/* Welcome Banner */}
      <div className="organic-card p-8 sm:p-10 text-left space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-[#32C6BE] text-[#123C36] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider inline-block rounded-full border border-[#123C36]">
              USER CONTROL CENTER
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display uppercase tracking-tight text-[#123C36]">
              {greeting}, <span className="text-[#32C6BE]">{user?.name}</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#4D6B63] font-mono">
              ORGANIZATION: <strong className="text-[#123C36]">{user?.organization || 'INDEPENDENT MEMBER'}</strong> • ROLE: <span className="uppercase text-[#123C36] font-extrabold">{user?.role}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link
              to="/spaces"
              className="px-6 py-3 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] transition-all rounded-full border-2 border-[#123C36] flex items-center gap-1.5 shadow-sm"
            >
              <Search className="w-4 h-4 text-[#32C6BE]" /> BOOK SPACE
            </Link>
            <Link
              to="/activities"
              className="px-6 py-3 bg-[#FFFDF7] text-[#123C36] font-extrabold text-xs uppercase tracking-wider hover:bg-[#C9E9EA] transition-all rounded-full border-2 border-[#123C36] flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-[#32C6BE]" /> HOST ACTIVITY
            </Link>
          </div>
        </div>
      </div>

      {/* Dynamic Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="organic-card p-6 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-[#4D6B63]">TOTAL BOOKINGS</span>
            <CalendarCheck className="w-4 h-4 text-[#32C6BE]" />
          </div>
          <div className="text-4xl font-extrabold font-display text-[#123C36]">{totalBookings}</div>
          <span className="text-[9px] font-mono text-[#4D6B63] block">FETCHED FROM MONGODB</span>
        </div>

        <div className="organic-card p-6 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-amber-700">PENDING REVIEW</span>
            <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
          </div>
          <div className="text-4xl font-extrabold font-display text-amber-700">{pendingRequests}</div>
          <span className="text-[9px] font-mono text-[#4D6B63] block">AWAITING ADMIN REVIEW</span>
        </div>

        <div className="organic-card p-6 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-emerald-700">APPROVED BOOKINGS</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-4xl font-extrabold font-display text-emerald-700">{approvedRequests}</div>
          <span className="text-[9px] font-mono text-[#4D6B63] block">CONFIRMED RESERVATIONS</span>
        </div>

        <div className="organic-card p-6 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-[#123C36]">ACTIVITIES CREATED</span>
            <Users className="w-4 h-4 text-[#32C6BE]" />
          </div>
          <div className="text-4xl font-extrabold font-display text-[#123C36]">{activitiesCreated}</div>
          <span className="text-[9px] font-mono text-[#4D6B63] block">COMMUNITY EVENTS HOSTED</span>
        </div>
      </div>

      {/* Recent Bookings Stream */}
      <div className="space-y-4 text-left">
        <div className="flex items-center justify-between border-b-2 border-[#123C36]/20 pb-3">
          <h2 className="text-2xl font-extrabold font-display uppercase tracking-tight text-[#123C36]">YOUR RECENT BOOKING REQUESTS</h2>
          <Link to="/my-requests" className="text-xs font-extrabold uppercase text-[#123C36] hover:text-[#32C6BE] flex items-center gap-1">
            VIEW ALL REQUESTS <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {bookings.length > 0 ? (
          <div className="organic-card divide-y divide-[#123C36]/10 overflow-hidden">
            {bookings.slice(0, 4).map((b) => (
              <div key={b._id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#C9E9EA]/30 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#32C6BE]" />
                    <h4 className="text-base font-extrabold text-[#123C36] uppercase">{b.space?.name || 'PUBLIC SPACE'}</h4>
                  </div>
                  <p className="text-xs text-[#4D6B63] font-mono">
                    DATE: <strong className="text-[#123C36]">{new Date(b.requestedDate).toLocaleDateString()}</strong> • SLOT: <strong className="text-[#123C36]">{b.startTime} - {b.endTime}</strong> • PURPOSE: {b.purpose}
                  </p>
                </div>

                <span className={`px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider rounded-full border ${
                  b.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-500' :
                  b.status === 'pending' ? 'bg-amber-100 text-amber-800 border-amber-500' :
                  b.status === 'rejected' ? 'bg-rose-100 text-rose-800 border-rose-500' :
                  'bg-gray-100 text-gray-700 border-gray-300'
                }`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="organic-card p-8 text-center text-[#4D6B63] text-xs font-mono space-y-3">
            <p>YOU HAVE NOT PLACED ANY SPACE BOOKING REQUESTS YET.</p>
            <Link to="/spaces" className="inline-block px-6 py-2.5 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider rounded-full">
              DISCOVER & RESERVE SPACES →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPage;
