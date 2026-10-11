import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, CheckCircle2, ArrowRight, Heart } from 'lucide-react';

const SpaceCard = ({ space, onBookClick, featured = false }) => {
  const {
    _id,
    name,
    description,
    location,
    category,
    capacity,
    facilities = [],
    image,
    isAvailable,
    hourlyRate
  } = space;

  return (
    <div 
      className={`organic-card overflow-hidden flex flex-col group text-left relative ${
        featured ? 'md:col-span-2 md:flex-row' : ''
      }`}
      data-cursor="VIEW SPACE"
    >
      {/* Space Image Header */}
      <div className={`relative overflow-hidden bg-[#C9E9EA] ${
        featured ? 'h-64 md:h-auto md:w-1/2' : 'h-52 w-full'
      }`}>
        <img
          src={image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000'}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#123C36]/60 via-transparent to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-[#FFFDF7] text-[#123C36] border-2 border-[#123C36] rounded-full shadow-sm">
            {category}
          </span>
          <span
            className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full border-2 ${
              isAvailable
                ? 'bg-[#32C6BE] text-[#123C36] border-[#123C36] font-bold'
                : 'bg-rose-100 text-rose-800 border-rose-300'
            }`}
          >
            {isAvailable ? '✓ AVAILABLE' : 'BOOKED'}
          </span>
        </div>

        {/* Bottom price tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-extrabold text-[#123C36] bg-[#FFFDF7] px-3 py-1 border-2 border-[#123C36] rounded-full font-mono shadow-sm">
          {hourlyRate > 0 ? (
            <span>\${hourlyRate}<span className="text-[#4D6B63] font-normal">/HR</span></span>
          ) : (
            <span className="text-[#123C36] font-extrabold">FREE CIVIC ACCESS</span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className={`p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 ${
        featured ? 'md:w-1/2' : ''
      }`}>
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#4D6B63] mb-1 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#32C6BE] shrink-0" />
            <span className="truncate">{location?.address || 'Address'}, {location?.city || 'City'}</span>
          </div>

          <h3 className="text-xl font-extrabold text-[#123C36] font-display group-hover:text-[#32C6BE] transition-colors line-clamp-1 uppercase">
            {name}
          </h3>

          <p className="text-xs text-[#4D6B63] mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Capacity & Facilities */}
        <div className="space-y-2.5 pt-3 border-t-2 border-[#123C36]/10">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold text-[#123C36] uppercase">
              <Users className="w-3.5 h-3.5 text-[#32C6BE]" />
              CAPACITY:
            </span>
            <span className="font-extrabold text-[#123C36] bg-[#C9E9EA] px-2.5 py-0.5 border border-[#123C36] rounded-full font-mono">
              UP TO {capacity} GUESTS
            </span>
          </div>

          {/* Facilities pills */}
          {facilities.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {facilities.slice(0, 3).map((facility, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-extrabold uppercase bg-[#FFFDF7] text-[#123C36] border border-[#123C36] rounded-full"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-[#32C6BE]" />
                  {facility}
                </span>
              ))}
              {facilities.length > 3 && (
                <span className="text-[9px] font-mono text-[#4D6B63] self-center">
                  +{facilities.length - 3} MORE
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <Link
            to={`/spaces/${_id}`}
            className="flex items-center justify-center gap-1 py-2.5 px-3 text-xs font-extrabold uppercase text-[#123C36] bg-[#F7F4EA] border-2 border-[#123C36] rounded-xl hover:bg-[#C9E9EA] transition-colors"
            data-cursor="DETAILS"
          >
            DETAILS
          </Link>

          <button
            onClick={() => onBookClick && onBookClick(space)}
            disabled={!isAvailable}
            className={`flex items-center justify-center gap-1 py-2.5 px-3 text-xs font-extrabold uppercase transition-all rounded-xl border-2 border-[#123C36] ${
              isAvailable
                ? 'bg-[#123C36] text-[#FFFDF7] hover:bg-[#32C6BE] hover:text-[#123C36] shadow-sm font-extrabold'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
            }`}
            data-cursor="BOOK SPACE"
          >
            RESERVE
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
