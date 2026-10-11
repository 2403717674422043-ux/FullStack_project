import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { activityService } from '../services/activityService';
import { spaceService } from '../services/spaceService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  Users, 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  X,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import LoadingSpinner from '../components/LoadingSpinner';

const ActivitiesPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [activities, setActivities] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Workshop',
    spaceId: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    startTime: '14:00',
    endTime: '16:00',
    expectedParticipants: 25,
    image: ''
  });

  const categories = [
    'All',
    'Workshop',
    'Sports',
    'Cultural',
    'Education',
    'Meeting',
    'Social Cause',
    'Fitness'
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category && category !== 'All') params.category = category;

      const [actRes, spacesRes] = await Promise.all([
        activityService.getActivities(params),
        spaceService.getSpaces({ isAvailable: true })
      ]);

      if (actRes.success) setActivities(actRes.data);
      if (spacesRes.success) {
        setSpaces(spacesRes.data);
        if (spacesRes.data.length > 0 && !formData.spaceId) {
          setFormData(prev => ({ ...prev, spaceId: spacesRes.data[0]._id }));
        }
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleJoin = async (activityId) => {
    if (!user) {
      showError('Please log in to join community activities.');
      return;
    }

    try {
      const res = await activityService.joinActivity(activityId);
      if (res.success) {
        showSuccess('Successfully joined activity!');
        fetchData();
      }
    } catch (error) {
      console.error('Join Error:', error);
      showError(error.message || 'Failed to join activity.');
    }
  };

  const handleLeave = async (activityId) => {
    try {
      const res = await activityService.leaveActivity(activityId);
      if (res.success) {
        showSuccess('Left activity.');
        fetchData();
      }
    } catch (error) {
      console.error('Leave Error:', error);
      showError(error.message || 'Failed to leave activity.');
    }
  };

  const handleCreateActivity = async (e) => {
    e.preventDefault();
    if (!user) {
      showError('Please log in to create an activity.');
      return;
    }

    if (!formData.title || !formData.description || !formData.spaceId) {
      showError('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await activityService.createActivity(formData);
      if (res.success) {
        showSuccess('Community Activity hosted and saved in MongoDB!');
        setModalOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error('Create Activity Error:', error);
      showError(error.message || 'Failed to create activity.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-[#17352F] bg-[#F7F4EA]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-3 max-w-2xl text-left">
          <span className="px-3.5 py-1 text-xs font-extrabold bg-[#32C6BE] text-[#123C36] uppercase tracking-wider inline-block rounded-full border border-[#123C36]">
            COMMUNITY EVENTS
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display uppercase tracking-tight leading-none text-[#123C36]">
            COMMUNITY <span className="text-[#32C6BE]">ACTIVITIES</span>
          </h1>
          <p className="text-sm text-[#4D6B63] leading-relaxed font-medium">
            Join workshops, sports meetups, art labs, and social gatherings hosted inside reclaimed public spaces.
          </p>
        </div>

        <button
          onClick={() => {
            if (!user) {
              showError('Please log in to host a community activity.');
              return;
            }
            setModalOpen(true);
          }}
          className="px-6 py-3.5 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] transition-all rounded-full border-2 border-[#123C36] flex items-center gap-2 shadow-organic shrink-0"
          data-cursor="HOST EVENT"
        >
          <Plus className="w-4 h-4 text-[#32C6BE]" />
          HOST AN ACTIVITY
        </button>
      </div>

      {/* Toolbar */}
      <div className="organic-card p-6 text-left space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#4D6B63] absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH ACTIVITIES BY TITLE, KEYWORD, OR DESCRIPTION..."
              className="organic-input w-full pl-11 pr-4 py-3 text-xs font-mono text-[#17352F]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] transition-colors rounded-xl border-2 border-[#123C36]"
          >
            FILTER ACTIVITIES
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#123C36]/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-all rounded-full border-2 ${
                category === cat
                  ? 'bg-[#32C6BE] text-[#123C36] border-[#123C36]'
                  : 'bg-[#FFFDF7] text-[#17352F] border-[#123C36]/20 hover:border-[#32C6BE]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Grid */}
      {loading ? (
        <LoadingSpinner text="FETCHING COMMUNITY ACTIVITIES FROM DATABASE..." />
      ) : activities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.map((act) => (
            <ActivityCard
              key={act._id}
              activity={act}
              onJoin={handleJoin}
              onLeave={handleLeave}
            />
          ))}
        </div>
      ) : (
        <div className="organic-card p-12 text-center text-[#4D6B63] text-xs font-mono">
          NO COMMUNITY ACTIVITIES FOUND MATCHING YOUR CRITERIA.
        </div>
      )}

      {/* Host Activity Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123C36]/80 backdrop-blur-md overflow-y-auto">
          <div className="organic-card w-full max-w-xl p-6 sm:p-8 text-left relative my-8 text-[#17352F]">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#4D6B63] hover:text-[#123C36]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <span className="bg-[#32C6BE] text-[#123C36] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider inline-block rounded-full border border-[#123C36]">
                COMMUNITY ACTIVATION
              </span>
              <h2 className="text-2xl font-extrabold font-display uppercase tracking-tight text-[#123C36] mt-2">HOST COMMUNITY ACTIVITY</h2>
            </div>

            <form onSubmit={handleCreateActivity} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">ACTIVITY TITLE *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="E.G. WEEKEND OPEN SOURCE HACKATHON"
                  className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">CATEGORY *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
                  >
                    {['Workshop', 'Sports', 'Cultural', 'Education', 'Meeting', 'Social Cause', 'Fitness', 'Other'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">SELECT PUBLIC VENUE *</label>
                  <select
                    value={formData.spaceId}
                    onChange={(e) => setFormData({ ...formData, spaceId: e.target.value })}
                    className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
                    required
                  >
                    {spaces.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} (CAP: {s.capacity})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">DATE *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="organic-input w-full px-3 py-2 text-xs font-mono text-[#17352F]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">START TIME *</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="organic-input w-full px-3 py-2 text-xs font-mono text-[#17352F]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">END TIME *</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="organic-input w-full px-3 py-2 text-xs font-mono text-[#17352F]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">COVER IMAGE URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">DESCRIPTION *</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="DESCRIBE THE ACTIVITY PURPOSE AND SCHEDULE..."
                  className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F] resize-none"
                  required
                ></textarea>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#123C36]/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-extrabold text-[#4D6B63] hover:text-[#123C36] uppercase"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] border-2 border-[#123C36] rounded-xl transition-all disabled:opacity-50"
                >
                  {submitting ? 'PERSISTING IN MONGODB...' : 'HOST ACTIVITY →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesPage;
