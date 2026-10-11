import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Users, SlidersHorizontal, RefreshCw, Sparkles, ArrowUpRight } from 'lucide-react';
import { spaceService } from '../services/spaceService';
import SpaceCard from '../components/SpaceCard';
import BookingModal from '../components/BookingModal';
import LoadingSpinner from '../components/LoadingSpinner';

const ExploreSpacesPage = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [minCapacity, setMinCapacity] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);

  const [selectedSpace, setSelectedSpace] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const categories = [
    'All',
    'Park',
    'Community Hall',
    'Library',
    'Sports Ground',
    'Auditorium',
    'Rooftop',
    'Courtyard',
    'Co-working'
  ];

  const fetchSpaces = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category && category !== 'All') params.category = category;
      if (minCapacity) params.capacity = minCapacity;
      if (availableOnly) params.isAvailable = 'true';

      const response = await spaceService.getSpaces(params);
      if (response.success) {
        setSpaces(response.data);
      }
    } catch (error) {
      console.error('Error fetching spaces:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, [category, availableOnly]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSpaces();
  };

  const handleBookClick = (space) => {
    setSelectedSpace(space);
    setBookingModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-[#17352F] bg-[#F7F4EA]">
      {/* Header */}
      <div className="space-y-3 max-w-3xl text-left">
        <span className="px-3.5 py-1 text-xs font-extrabold bg-[#32C6BE] text-[#123C36] uppercase tracking-wider inline-block rounded-full border border-[#123C36]">
          PUBLIC SPACE CATALOG
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-display uppercase tracking-tight leading-none text-[#123C36]">
          EXPLORE <span className="text-[#32C6BE]">PUBLIC SPACES</span>
        </h1>
        <p className="text-sm text-[#4D6B63] leading-relaxed font-medium">
          Discover and reserve underutilized civic halls, parks, rooftops, and auditoriums across your city in real time.
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="organic-card p-6 space-y-5 text-left">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#4D6B63] absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH BY SPACE NAME, CITY, ADDRESS, OR FACILITIES..."
              className="organic-input w-full pl-11 pr-4 py-3 text-xs font-mono text-[#17352F] placeholder-[#4D6B63]"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              value={minCapacity}
              onChange={(e) => setMinCapacity(e.target.value)}
              placeholder="MIN CAPACITY"
              className="organic-input w-36 px-4 py-3 text-xs font-mono text-[#17352F] placeholder-[#4D6B63]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] transition-colors rounded-xl border-2 border-[#123C36]"
            >
              SEARCH
            </button>
          </div>
        </form>

        {/* Category Chips & Availability Filter */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-3 border-t border-[#123C36]/10">
          <div className="flex flex-wrap gap-2">
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

          <label className="flex items-center gap-2 cursor-pointer text-xs font-extrabold uppercase text-[#123C36] shrink-0 bg-[#C9E9EA] px-4 py-2 rounded-full border border-[#123C36]">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="w-4 h-4 rounded text-[#123C36] focus:ring-0"
            />
            SHOW AVAILABLE ONLY
          </label>
        </div>
      </div>

      {/* Results Section */}
      {loading ? (
        <LoadingSpinner text="FETCHING SPACES FROM MONGODB..." />
      ) : spaces.length > 0 ? (
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between text-xs text-[#4D6B63] font-mono">
            <span>SHOWING <strong className="text-[#123C36]">{spaces.length}</strong> PUBLIC SPACES</span>
            <button onClick={fetchSpaces} className="flex items-center gap-1.5 hover:text-[#32C6BE] font-extrabold uppercase">
              <RefreshCw className="w-3.5 h-3.5" /> RELOAD CATALOG
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spaces.map((space, idx) => (
              <SpaceCard key={space._id} space={space} onBookClick={handleBookClick} featured={idx === 0} />
            ))}
          </div>
        </div>
      ) : (
        <div className="organic-card p-12 text-center space-y-4">
          <p className="text-[#123C36] text-base font-extrabold uppercase font-display">NO MATCHING PUBLIC SPACES FOUND</p>
          <p className="text-xs text-[#4D6B63] max-w-sm mx-auto font-mono">
            TRY ADJUSTING YOUR SEARCH QUERY, CAPACITY MINIMUM, OR CATEGORY FILTERS.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('All');
              setMinCapacity('');
              setAvailableOnly(false);
              fetchSpaces();
            }}
            className="px-6 py-3 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] transition-colors rounded-full border-2 border-[#123C36]"
          >
            RESET ALL FILTERS
          </button>
        </div>
      )}

      {/* Booking Modal */}
      {selectedSpace && (
        <BookingModal
          space={selectedSpace}
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ExploreSpacesPage;
