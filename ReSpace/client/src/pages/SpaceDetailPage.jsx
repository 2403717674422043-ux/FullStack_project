import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowLeft, 
  Clock, 
  Building2, 
  FileText,
  DollarSign,
  UserCheck,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { spaceService } from '../services/spaceService';
import { activityService } from '../services/activityService';
import BookingModal from '../components/BookingModal';
import ActivityCard from '../components/ActivityCard';
import LoadingSpinner from '../components/LoadingSpinner';

const SpaceDetailPage = () => {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchSpaceDetails = async () => {
      setLoading(true);
      try {
        const [spaceRes, activitiesRes] = await Promise.all([
          spaceService.getSpaceById(id),
          activityService.getActivities({ spaceId: id })
        ]);

        if (spaceRes.success) {
          setSpace(spaceRes.data);
        }
        if (activitiesRes.success) {
          setActivities(activitiesRes.data);
        }
      } catch (error) {
        console.error('Error fetching space details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSpaceDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner fullScreen text="LOADING SPACE SPECS FROM MONGODB..." />;
  }

  if (!space) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 text-[#17352F] bg-[#F7F4EA]">
        <h2 className="text-3xl font-extrabold font-display uppercase text-[#123C36]">SPACE NOT FOUND</h2>
        <p className="text-sm text-[#4D6B63] font-mono">The requested public space document does not exist in MongoDB.</p>
        <Link to="/spaces" className="inline-block px-6 py-3 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider rounded-full">
          BACK TO EXPLORE SPACES →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#17352F] bg-[#F7F4EA]">
      {/* Back Button */}
      <Link to="/spaces" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-[#4D6B63] hover:text-[#123C36] transition-colors">
        <ArrowLeft className="w-4 h-4 text-[#32C6BE]" />
        BACK TO SPACE CATALOG
      </Link>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Gallery & Details */}
        <div className="lg:col-span-2 space-y-6 text-left">
          <div className="organic-card overflow-hidden">
            <div className="relative h-80 sm:h-96 w-full bg-[#C9E9EA]">
              <img
                src={space.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000'}
                alt={space.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#123C36]/50 via-transparent to-transparent"></div>

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider bg-[#FFFDF7] text-[#123C36] border-2 border-[#123C36] rounded-full shadow-sm">
                  {space.category}
                </span>
                <span className={`px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider rounded-full border-2 ${
                  space.isAvailable ? 'bg-[#32C6BE] text-[#123C36] border-[#123C36] font-bold' : 'bg-rose-100 text-rose-800 border-rose-300'
                }`}>
                  {space.isAvailable ? '✓ AVAILABLE' : 'UNAVAILABLE'}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-display uppercase tracking-tight text-[#123C36]">{space.name}</h1>
                <p className="flex items-center gap-2 text-xs text-[#4D6B63] font-mono mt-2">
                  <MapPin className="w-4 h-4 text-[#32C6BE] shrink-0" />
                  {space.location?.address}, {space.location?.city}, {space.location?.state} {space.location?.zipCode}
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold text-[#123C36] uppercase tracking-wider">ABOUT THIS SPACE</h3>
                <p className="text-sm text-[#4D6B63] leading-relaxed font-normal">{space.description}</p>
              </div>

              {/* Facilities Chips */}
              {space.facilities?.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[#123C36]/10">
                  <h3 className="text-xs font-extrabold text-[#123C36] uppercase tracking-wider">AVAILABLE FACILITIES</h3>
                  <div className="flex flex-wrap gap-2">
                    {space.facilities.map((fac, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold uppercase bg-[#F7F4EA] text-[#123C36] border border-[#123C36] rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#32C6BE]" />
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Guidelines & Rules */}
              {space.rules?.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[#123C36]/10">
                  <h3 className="text-xs font-extrabold text-[#123C36] uppercase tracking-wider">GUIDELINES & RULES</h3>
                  <ul className="space-y-2 text-xs text-[#4D6B63] font-mono">
                    {space.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#32C6BE] mt-1.5 shrink-0 rounded-full"></span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Activities Hosted Here */}
          <div className="space-y-4 pt-4">
            <h2 className="text-2xl font-extrabold font-display uppercase tracking-tight text-[#123C36]">ACTIVITIES HOSTED AT THIS VENUE</h2>
            {activities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activities.map((act) => (
                  <ActivityCard key={act._id} activity={act} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#4D6B63] organic-card p-5 font-mono">
                NO ACTIVE COMMUNITY EVENTS CURRENTLY SCHEDULED FOR THIS SPACE.
              </p>
            )}
          </div>
        </div>

        {/* Right Sidebar: Booking Action Box */}
        <div className="space-y-6 text-left">
          <div className="organic-card p-6 sm:p-8 space-y-6 sticky top-24">
            <div className="space-y-1 border-b border-[#123C36]/10 pb-4">
              <span className="text-xs font-extrabold text-[#32C6BE] uppercase tracking-wider block">ACCESS FEE</span>
              <div className="text-4xl font-extrabold font-display text-[#123C36] flex items-baseline gap-1">
                {space.hourlyRate > 0 ? (
                  <>
                    <span>\${space.hourlyRate}</span>
                    <span className="text-xs text-[#4D6B63] font-mono">/ HOUR</span>
                  </>
                ) : (
                  <span className="text-[#123C36]">FREE ACCESS</span>
                )}
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#17352F]">
              <div className="flex items-center justify-between py-1.5 border-b border-[#123C36]/10">
                <span className="text-[#4D6B63] font-bold uppercase flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#32C6BE]" /> MAX CAPACITY
                </span>
                <span className="font-extrabold font-mono text-[#123C36]">{space.capacity} GUESTS</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[#123C36]/10">
                <span className="text-[#4D6B63] font-bold uppercase flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#32C6BE]" /> CATEGORY
                </span>
                <span className="font-bold text-[#123C36] uppercase">{space.category}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[#123C36]/10">
                <span className="text-[#4D6B63] font-bold uppercase flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#32C6BE]" /> MANAGED BY
                </span>
                <span className="font-bold text-[#123C36] uppercase">{space.managedBy?.name || 'ReSpace Platform'}</span>
              </div>
            </div>

            <button
              onClick={() => setBookingModalOpen(true)}
              disabled={!space.isAvailable}
              className={`w-full py-4 text-xs font-extrabold uppercase tracking-wider transition-all rounded-full border-2 border-[#123C36] flex items-center justify-center gap-2 ${
                space.isAvailable
                  ? 'bg-[#123C36] text-[#FFFDF7] hover:bg-[#32C6BE] hover:text-[#123C36] shadow-organic font-extrabold'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
              }`}
            >
              {space.isAvailable ? 'REQUEST SPACE BOOKING →' : 'SPACE CURRENTLY UNAVAILABLE'}
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {space && (
        <BookingModal
          space={space}
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SpaceDetailPage;
