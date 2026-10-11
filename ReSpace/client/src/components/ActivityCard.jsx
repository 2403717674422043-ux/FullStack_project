import React from 'react';
import { Calendar, Clock, MapPin, Users, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ActivityCard = ({ activity, onJoin, onLeave }) => {
  const { user } = useAuth();
  const {
    _id,
    title,
    description,
    category,
    organizer,
    space,
    date,
    startTime,
    endTime,
    participants = [],
    image
  } = activity;

  const isParticipant = user && participants.some(p => (p._id || p) === user._id);
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD';

  return (
    <div 
      className="organic-card overflow-hidden flex flex-col group text-left relative"
      data-cursor="EVENT"
    >
      {/* Header Image */}
      <div className="relative h-44 w-full overflow-hidden bg-[#C9E9EA]">
        <img
          src={image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1000'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#123C36]/50 via-transparent to-transparent"></div>

        <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-[#FFFDF7] text-[#123C36] border-2 border-[#123C36] rounded-full shadow-sm">
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-[#123C36] font-display uppercase group-hover:text-[#32C6BE] transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-[#4D6B63] mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Date, Time & Space */}
        <div className="space-y-2 text-xs text-[#123C36] bg-[#C9E9EA]/50 p-3.5 border border-[#123C36]/20 rounded-xl font-mono">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#123C36] shrink-0" />
            <span className="font-bold">{formattedDate}</span>
            <Clock className="w-3.5 h-3.5 text-[#123C36] shrink-0 ml-2" />
            <span className="font-bold">{startTime} - {endTime}</span>
          </div>

          <div className="flex items-center gap-2 text-[#4D6B63]">
            <MapPin className="w-3.5 h-3.5 text-[#32C6BE] shrink-0" />
            <span className="truncate font-medium">{space?.name || 'Public Venue'}</span>
          </div>
        </div>

        {/* Organizer & Join Action */}
        <div className="pt-2 flex items-center justify-between border-t border-[#123C36]/10">
          <div className="flex items-center gap-2">
            <img
              src={organizer?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
              alt={organizer?.name}
              className="w-7 h-7 rounded-full object-cover border-2 border-[#32C6BE]"
            />
            <div className="text-[10px] leading-tight">
              <span className="block text-[#4D6B63]">HOST</span>
              <span className="font-bold text-[#123C36] uppercase truncate max-w-[100px]">{organizer?.name || 'Leader'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-[#123C36] font-mono font-bold">
              <Users className="w-3.5 h-3.5 text-[#32C6BE]" />
              {participants.length}
            </span>

            {isParticipant ? (
              <button
                onClick={() => onLeave && onLeave(_id)}
                className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-extrabold uppercase bg-emerald-100 text-emerald-800 border-2 border-emerald-600 rounded-xl hover:bg-rose-100 hover:text-rose-800 hover:border-rose-600 transition-colors"
                data-cursor="LEAVE"
              >
                <UserCheck className="w-3.5 h-3.5" />
                JOINED
              </button>
            ) : (
              <button
                onClick={() => onJoin && onJoin(_id)}
                className="px-4 py-1.5 text-xs font-extrabold uppercase text-[#FFFDF7] bg-[#123C36] hover:bg-[#32C6BE] hover:text-[#123C36] border-2 border-[#123C36] rounded-xl transition-all"
                data-cursor="JOIN"
              >
                JOIN
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
