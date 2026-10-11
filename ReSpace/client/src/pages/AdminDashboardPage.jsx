import React, { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import { spaceService } from '../services/spaceService';
import { bookingService } from '../services/bookingService';
import { useToast } from '../context/ToastContext';
import { 
  ShieldAlert, 
  Users, 
  Building2, 
  CalendarCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Trash2, 
  Edit, 
  ShieldCheck, 
  User,
  AlertTriangle,
  RefreshCw,
  Search,
  Sparkles
} from 'lucide-react';
import AdminSpaceModal from '../components/AdminSpaceModal';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboardPage = () => {
  const { showSuccess, showError } = useToast();

  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'spaces' | 'users'
  const [bookingFilter, setBookingFilter] = useState('All');

  // Space Modal State
  const [selectedSpaceForEdit, setSelectedSpaceForEdit] = useState(null);
  const [spaceModalOpen, setSpaceModalOpen] = useState(false);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes, spacesRes, usersRes] = await Promise.all([
        adminService.getStats(),
        adminService.getAllBookings(),
        spaceService.getSpaces(),
        adminService.getUsers()
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (bookingsRes.success) setBookings(bookingsRes.data);
      if (spacesRes.success) setSpaces(spacesRes.data);
      if (usersRes.success) setUsers(usersRes.data);
    } catch (error) {
      console.error('Admin Data Load Error:', error);
      showError('Failed to fetch admin dashboard telemetry from MongoDB.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Booking Actions
  const handleApproveBooking = async (id) => {
    try {
      const res = await bookingService.updateBookingStatus(id, {
        status: 'approved',
        adminNotes: 'Approved by Administrator.'
      });
      if (res.success) {
        showSuccess('Booking request APPROVED and updated in MongoDB!');
        loadAdminData();
      }
    } catch (error) {
      console.error('Approval Error:', error);
      showError(error.message || 'Failed to approve booking due to conflict.');
    }
  };

  const handleRejectBooking = async (id) => {
    const reason = window.prompt('Provide rejection reason for user:', 'Space unavailable during requested slot');
    if (reason === null) return;

    try {
      const res = await bookingService.updateBookingStatus(id, {
        status: 'rejected',
        adminNotes: reason || 'Rejected by Admin'
      });
      if (res.success) {
        showSuccess('Booking request REJECTED.');
        loadAdminData();
      }
    } catch (error) {
      console.error('Rejection Error:', error);
      showError(error.message || 'Failed to reject booking.');
    }
  };

  // Space Actions
  const handleDeleteSpace = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete space "${name}" from MongoDB?`)) return;

    try {
      const res = await spaceService.deleteSpace(id);
      if (res.success) {
        showSuccess('Space deleted from database!');
        loadAdminData();
      }
    } catch (error) {
      console.error('Delete Space Error:', error);
      showError(error.message || 'Failed to delete space.');
    }
  };

  // User Actions
  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Change user role to "${newRole}"?`)) return;

    try {
      const res = await adminService.updateUserRole(userId, newRole);
      if (res.success) {
        showSuccess(`User role updated to ${newRole}!`);
        loadAdminData();
      }
    } catch (error) {
      console.error('Role Change Error:', error);
      showError(error.message || 'Failed to update user role.');
    }
  };

  const handleDeleteUser = async (userId, name) => {
    if (!window.confirm(`Delete user "${name}" from MongoDB?`)) return;

    try {
      const res = await adminService.deleteUser(userId);
      if (res.success) {
        showSuccess('User account removed!');
        loadAdminData();
      }
    } catch (error) {
      console.error('Delete User Error:', error);
      showError(error.message || 'Failed to delete user.');
    }
  };

  const filteredBookings = bookingFilter === 'All'
    ? bookings
    : bookings.filter(b => b.status === bookingFilter);

  if (loading) {
    return <LoadingSpinner fullScreen text="LOADING ADMINISTRATOR CONSOLE FROM MONGODB..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#17352F] bg-[#F7F4EA]">
      {/* Admin Banner */}
      <div className="organic-card p-8 sm:p-10 text-left space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-[#123C36] text-[#32C6BE] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 rounded-full">
              <ShieldAlert className="w-3.5 h-3.5 text-[#32C6BE]" />
              ADMINISTRATOR PORTAL
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display uppercase tracking-tight text-[#123C36]">SYSTEM ANALYTICS & CONTROLS</h1>
            <p className="text-xs sm:text-sm text-[#4D6B63] font-mono">Review pending booking requests, manage public spaces, and oversee user roles</p>
          </div>

          <button
            onClick={loadAdminData}
            className="px-5 py-3 bg-[#FFFDF7] border-2 border-[#123C36] text-xs font-extrabold uppercase text-[#123C36] hover:bg-[#32C6BE] rounded-full flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#32C6BE]" /> SYNC DATABASE
          </button>
        </div>
      </div>

      {/* Stats Counters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-left">
        <div className="organic-card p-5 space-y-1">
          <span className="block text-[10px] font-extrabold text-[#4D6B63] uppercase tracking-wider font-mono">TOTAL USERS</span>
          <span className="text-3xl font-extrabold font-display text-[#123C36]">{stats?.totalUsers || 0}</span>
        </div>
        <div className="organic-card p-5 space-y-1">
          <span className="block text-[10px] font-extrabold text-[#123C36] uppercase tracking-wider font-mono">PUBLIC SPACES</span>
          <span className="text-3xl font-extrabold font-display text-[#32C6BE]">{stats?.totalSpaces || 0}</span>
        </div>
        <div className="organic-card p-5 space-y-1">
          <span className="block text-[10px] font-extrabold text-[#4D6B63] uppercase tracking-wider font-mono">TOTAL REQUESTS</span>
          <span className="text-3xl font-extrabold font-display text-[#123C36]">{stats?.totalBookings || 0}</span>
        </div>
        <div className="organic-card p-5 space-y-1">
          <span className="block text-[10px] font-extrabold text-amber-700 uppercase tracking-wider font-mono">PENDING</span>
          <span className="text-3xl font-extrabold font-display text-amber-700">{stats?.pendingBookings || 0}</span>
        </div>
        <div className="organic-card p-5 space-y-1">
          <span className="block text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider font-mono">APPROVED</span>
          <span className="text-3xl font-extrabold font-display text-emerald-700">{stats?.approvedBookings || 0}</span>
        </div>
        <div className="organic-card p-5 space-y-1">
          <span className="block text-[10px] font-extrabold text-[#123C36] uppercase tracking-wider font-mono">ACTIVITIES</span>
          <span className="text-3xl font-extrabold font-display text-[#32C6BE]">{stats?.totalActivities || 0}</span>
        </div>
      </div>

      {/* Main Admin Tab Switcher */}
      <div className="flex border-b-2 border-[#123C36]/10 space-x-2">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 rounded-t-xl border-2 border-b-0 ${
            activeTab === 'bookings'
              ? 'bg-[#32C6BE] text-[#123C36] border-[#123C36]'
              : 'bg-[#FFFDF7] text-[#17352F] border-[#123C36]/20 hover:border-[#32C6BE]'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          Booking Requests ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('spaces')}
          className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 rounded-t-xl border-2 border-b-0 ${
            activeTab === 'spaces'
              ? 'bg-[#32C6BE] text-[#123C36] border-[#123C36]'
              : 'bg-[#FFFDF7] text-[#17352F] border-[#123C36]/20 hover:border-[#32C6BE]'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Space Inventory ({spaces.length})
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 rounded-t-xl border-2 border-b-0 ${
            activeTab === 'users'
              ? 'bg-[#32C6BE] text-[#123C36] border-[#123C36]'
              : 'bg-[#FFFDF7] text-[#17352F] border-[#123C36]/20 hover:border-[#32C6BE]'
          }`}
        >
          <Users className="w-4 h-4" />
          User Roster ({users.length})
        </button>
      </div>

      {/* TAB 1: BOOKING MANAGEMENT */}
      {activeTab === 'bookings' && (
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {['All', 'pending', 'approved', 'rejected', 'cancelled'].map(st => (
                <button
                  key={st}
                  onClick={() => setBookingFilter(st)}
                  className={`px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-all rounded-full border-2 ${
                    bookingFilter === st ? 'bg-[#32C6BE] text-[#123C36] border-[#123C36]' : 'bg-[#FFFDF7] text-[#17352F] border-[#123C36]/20 hover:border-[#32C6BE]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="organic-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#17352F] font-mono">
                <thead className="bg-[#C9E9EA] text-[#123C36] uppercase tracking-wider font-extrabold border-b-2 border-[#123C36]">
                  <tr>
                    <th className="p-4">USER</th>
                    <th className="p-4">REQUESTED SPACE</th>
                    <th className="p-4">DATE & TIME</th>
                    <th className="p-4">PURPOSE / GUESTS</th>
                    <th className="p-4">STATUS</th>
                    <th className="p-4 text-right">ADMIN ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#123C36]/10">
                  {filteredBookings.map((b) => (
                    <tr key={b._id} className="hover:bg-[#C9E9EA]/30 transition-colors">
                      <td className="p-4">
                        <span className="font-extrabold text-[#123C36] block uppercase">{b.user?.name || 'USER'}</span>
                        <span className="text-[10px] text-[#4D6B63]">{b.user?.email}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-[#123C36] block uppercase">{b.space?.name || 'SPACE'}</span>
                        <span className="text-[10px] text-[#4D6B63]">{b.space?.location?.city}</span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="block font-bold text-[#123C36]">{new Date(b.requestedDate).toLocaleDateString()}</span>
                        <span className="text-[10px] text-[#4D6B63]">{b.startTime} - {b.endTime}</span>
                      </td>
                      <td className="p-4 max-w-xs">
                        <p className="line-clamp-2 text-[#4D6B63]">{b.purpose}</p>
                        <span className="text-[10px] font-bold text-[#123C36]">{b.expectedParticipants} GUESTS</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-[10px] font-extrabold uppercase rounded-full border ${
                          b.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-500' :
                          b.status === 'pending' ? 'bg-amber-100 text-amber-800 border-amber-500' :
                          b.status === 'rejected' ? 'bg-rose-100 text-rose-800 border-rose-500' :
                          'bg-gray-100 text-gray-700 border-gray-300'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        {b.status === 'pending' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleApproveBooking(b._id)}
                              className="px-3.5 py-1.5 text-xs font-extrabold uppercase bg-[#123C36] text-[#FFFDF7] hover:bg-[#32C6BE] hover:text-[#123C36] rounded-xl border border-[#123C36]"
                            >
                              APPROVE
                            </button>
                            <button
                              onClick={() => handleRejectBooking(b._id)}
                              className="px-3.5 py-1.5 text-xs font-extrabold uppercase bg-rose-100 text-rose-800 border border-rose-400 hover:bg-rose-200 rounded-xl"
                            >
                              REJECT
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-[#4D6B63] italic">PROCESSED</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SPACE MANAGEMENT */}
      {activeTab === 'spaces' && (
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-[#123C36] uppercase tracking-wider">PUBLIC SPACE INVENTORY</h3>
            <button
              onClick={() => {
                setSelectedSpaceForEdit(null);
                setSpaceModalOpen(true);
              }}
              className="px-5 py-3 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] transition-colors rounded-full border-2 border-[#123C36] flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#32C6BE]" /> ADD NEW SPACE
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((sp) => (
              <div key={sp._id} className="organic-card p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <img src={sp.image} alt={sp.name} className="w-full h-36 object-cover rounded-xl border border-[#123C36]/20" />
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-[#32C6BE] uppercase bg-[#123C36] px-2 py-0.5 rounded-full">{sp.category}</span>
                      <span className={`text-[10px] font-extrabold ${sp.isAvailable ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {sp.isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}
                      </span>
                    </div>
                    <h4 className="text-base font-extrabold text-[#123C36] uppercase mt-1">{sp.name}</h4>
                    <p className="text-xs text-[#4D6B63] font-mono">{sp.location?.address}, {sp.location?.city}</p>
                  </div>
                  <div className="text-xs text-[#123C36] font-mono">
                    CAPACITY: <strong>{sp.capacity}</strong> • RATE: <strong>${sp.hourlyRate}/HR</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#123C36]/10 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedSpaceForEdit(sp);
                      setSpaceModalOpen(true);
                    }}
                    className="p-2 bg-[#FFFDF7] text-[#123C36] hover:bg-[#C9E9EA] border border-[#123C36] rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSpace(sp._id, sp.name)}
                    className="p-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-300 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="organic-card overflow-hidden text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#17352F] font-mono">
              <thead className="bg-[#C9E9EA] text-[#123C36] uppercase tracking-wider font-extrabold border-b-2 border-[#123C36]">
                <tr>
                  <th className="p-4">USER</th>
                  <th className="p-4">EMAIL</th>
                  <th className="p-4">ROLE</th>
                  <th className="p-4">ORGANIZATION</th>
                  <th className="p-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#123C36]/10">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-[#C9E9EA]/30 transition-colors">
                    <td className="p-4 font-bold text-[#123C36] flex items-center gap-2.5 uppercase">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border-2 border-[#32C6BE]" />
                      {u.name}
                    </td>
                    <td className="p-4 text-[#4D6B63]">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-[10px] font-extrabold uppercase rounded-full border ${
                        u.role === 'admin' ? 'bg-[#123C36] text-[#32C6BE] border-[#123C36]' : 'bg-emerald-100 text-emerald-800 border-emerald-400'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-[#4D6B63] uppercase">{u.organization || 'INDEPENDENT'}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleRoleToggle(u._id, u.role)}
                        className="px-3.5 py-1.5 bg-[#FFFDF7] text-[#123C36] text-[11px] font-extrabold uppercase border border-[#123C36] rounded-xl hover:bg-[#32C6BE]"
                      >
                        MAKE {u.role === 'admin' ? 'USER' : 'ADMIN'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id, u.name)}
                        className="p-1.5 text-rose-600 hover:bg-rose-100 border border-rose-300 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Space Modal */}
      <AdminSpaceModal
        space={selectedSpaceForEdit}
        isOpen={spaceModalOpen}
        onClose={() => setSpaceModalOpen(false)}
        onSuccess={loadAdminData}
      />
    </div>
  );
};

export default AdminDashboardPage;
