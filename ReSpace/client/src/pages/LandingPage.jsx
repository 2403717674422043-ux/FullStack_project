import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  CheckCircle2,
  Search,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Compass,
  CornerDownRight,
  Target,
  Heart,
  Smile
} from 'lucide-react';
import { spaceService } from '../services/spaceService';
import { activityService } from '../services/activityService';
import SpaceCard from '../components/SpaceCard';
import ActivityCard from '../components/ActivityCard';
import BookingModal from '../components/BookingModal';
import LoadingSpinner from '../components/LoadingSpinner';

const LandingPage = () => {
  const [featuredSpaces, setFeaturedSpaces] = useState([]);
  const [communityActivities, setCommunityActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState({ spaces: 0, active: 0, activities: 0, capacity: 0 });

  // Mouse Parallax State
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spacesRes, activitiesRes] = await Promise.all([
          spaceService.getSpaces(),
          activityService.getActivities()
        ]);

        if (spacesRes.success) {
          const spaces = spacesRes.data;
          setFeaturedSpaces(spaces.slice(0, 3));
          const activeCount = spaces.filter(s => s.isAvailable).length;
          const totalCap = spaces.reduce((acc, curr) => acc + (curr.capacity || 0), 0);
          setTotalCount(prev => ({
            ...prev,
            spaces: spaces.length,
            active: activeCount,
            capacity: totalCap
          }));
        }

        if (activitiesRes.success) {
          const activities = activitiesRes.data;
          setCommunityActivities(activities.slice(0, 3));
          setTotalCount(prev => ({
            ...prev,
            activities: activities.length
          }));
        }
      } catch (error) {
        console.error('Landing Page Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBookClick = (space) => {
    setSelectedSpace(space);
    setBookingModalOpen(true);
  };

  return (
    <div className="w-full text-[#17352F] overflow-hidden font-sans bg-[#F7F4EA]">
      
      {/* 1. HERO SECTION — CREAM + TURQUOISE ORGANIC EDITORIAL */}
      <section className="relative min-h-[90vh] lg:min-h-[calc(100vh-65px)] lg:max-h-[calc(100vh-65px)] py-6 sm:py-8 flex flex-col justify-between bg-cream-texture border-b-2 border-[#123C36] overflow-hidden">
        
        {/* PARALLAX ORGANIC BLOBS & HAND-DRAWN MARKS */}
        <div 
          className="absolute -top-20 -left-20 w-96 h-96 bg-[#32C6BE]/20 rounded-full blur-3xl pointer-events-none transition-transform duration-500 ease-out"
          style={{ transform: `translate(${mouseOffset.x * 1.5}px, ${mouseOffset.y * 1.5}px)` }}
        />
        <div 
          className="absolute top-1/3 -right-20 w-80 h-80 bg-[#C9E9EA]/60 rounded-full blur-2xl pointer-events-none transition-transform duration-500 ease-out"
          style={{ transform: `translate(${mouseOffset.x * -1.2}px, ${mouseOffset.y * -1.2}px)` }}
        />

        {/* Hand-drawn decorative background elements */}
        <div 
          className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none"
          style={{ transform: `translate(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px)` }}
        >
          <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 100 C 120 20, 280 180, 380 100" stroke="#123C36" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="120" cy="50" r="16" fill="#32C6BE" opacity="0.3" />
            <circle cx="280" cy="150" r="24" fill="#C9E9EA" opacity="0.5" />
          </svg>
        </div>

        {/* CONTINUOUS DRIFTING EDITORIAL CARDS / STICKERS */}
        {/* Sticker 1 */}
        <div 
          className="hidden xl:flex absolute top-10 left-8 z-20 organic-card p-3.5 max-w-[210px] animate-float-1"
          style={{ transform: `translate(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px)` }}
        >
          <div className="space-y-1 text-left">
            <span className="bg-[#32C6BE] text-[#123C36] px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-full tracking-wider block w-fit">
              CIVIC SPOT
            </span>
            <h4 className="text-xs font-extrabold text-[#123C36] uppercase tracking-tight">Community Garden</h4>
            <p className="text-[10px] text-emerald-700 font-bold">✓ OPEN FOR ALL</p>
          </div>
        </div>

        {/* Sticker 2 */}
        <div 
          className="hidden xl:flex absolute top-52 left-16 z-20 bg-[#32C6BE] border-2 border-[#123C36] p-3.5 rounded-2xl shadow-organic max-w-[190px] animate-float-2 text-[#123C36]"
          style={{ transform: `translate(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px)` }}
        >
          <div className="space-y-1 text-left">
            <span className="text-3xl font-extrabold font-display block">78%</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider block">SPACE RECLAIMED</span>
            <span className="text-[9px] font-mono text-[#123C36]/80">NEIGHBORHOOD HUB</span>
          </div>
        </div>

        {/* Sticker 3 */}
        <div 
          className="hidden xl:flex absolute top-10 right-12 z-20 organic-card-forest p-3.5 max-w-[220px] animate-float-3"
          style={{ transform: `translate(${mouseOffset.x * -1.1}px, ${mouseOffset.y * -1.1}px)` }}
        >
          <div className="space-y-1 text-left">
            <span className="bg-[#32C6BE] text-[#123C36] px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-full tracking-wider block w-fit">
              UPCOMING LAB
            </span>
            <h4 className="text-xs font-extrabold text-[#FFFDF7] uppercase tracking-tight">CRAFT WORKSHOP</h4>
            <p className="text-[10px] text-[#A9E4E2] font-mono">32 PARTICIPANTS</p>
          </div>
        </div>

        {/* HERO MAIN EDITORIAL COMPOSITION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex-1 flex flex-col justify-center py-2 sm:py-4">
          <div className="flex flex-col text-left space-y-2">
            
            {/* Friendly Platform Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFDF7] border-2 border-[#123C36] text-[#123C36] text-[11px] font-extrabold uppercase tracking-widest w-fit rounded-full shadow-sm mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#32C6BE]" />
              <span>CIVIC SPACE RE-ACTIVATION</span>
            </div>

            {/* Headline with Hand-Drawn SVG Highlights */}
            <div className="font-display font-extrabold leading-[0.88] tracking-tight uppercase select-none relative space-y-0.5">
              
              {/* Line 1: RECLAIM */}
              <div className="text-[clamp(2.2rem,6vw,5.5rem)] text-[#123C36] hover:translate-x-1 transition-transform flex items-center gap-3">
                <span>RECLAIM</span>
                <span className="hidden sm:inline-block text-xs font-mono text-[#4D6B63] bg-[#C9E9EA] px-3 py-1 rounded-full border border-[#123C36] font-normal lowercase tracking-normal">
                  (public assets)
                </span>
              </div>

              {/* Line 2: SPACE. */}
              <div className="text-[clamp(2.5rem,6.8vw,6.2rem)] text-[#123C36] relative inline-block pl-2 sm:pl-10">
                <span className="relative z-10">SPACE.</span>
                {/* Hand-Drawn Turquoise Background Stroke */}
                <svg className="absolute left-0 bottom-1 sm:bottom-2 w-full h-4 sm:h-7 -z-10" viewBox="0 0 300 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 18 C 50 8, 150 20, 295 10" stroke="#32C6BE" strokeWidth="14" strokeLinecap="round" opacity="0.85" />
                </svg>
              </div>

              {/* Line 3: BUILD */}
              <div className="text-[clamp(2.2rem,6vw,5.5rem)] text-[#123C36] pl-4 sm:pl-20 hover:translate-x-1 transition-transform">
                BUILD
              </div>

              {/* Line 4: COMMUNITY. */}
              <div className="text-[clamp(2.2rem,6vw,5.5rem)] text-[#123C36] hover:translate-x-2 transition-transform flex items-center gap-3">
                <span className="relative">
                  COMMUNITY.
                  {/* Scribbled underline */}
                  <svg className="absolute left-0 -bottom-2 w-full h-3" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8 Q 50 2, 100 8 T 198 4" stroke="#123C36" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="hidden sm:inline-flex items-center justify-center w-8 h-8 bg-[#32C6BE] text-[#123C36] rounded-full font-bold text-sm border-2 border-[#123C36]">
                  ✦
                </span>
              </div>
            </div>

            {/* Sub-headline & Interactive Hub Card */}
            <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-sm sm:text-base text-[#17352F] font-medium leading-relaxed max-w-xl">
                  Discover, reserve, and bring to life underutilized civic halls, park pavilions, rooftops, and local spaces across your city. Turning vacant spots into thriving neighborhood hubs.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    to="/spaces"
                    className="px-7 py-3.5 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] transition-all rounded-full border-2 border-[#123C36] flex items-center gap-2 shadow-organic"
                    data-cursor="EXPLORE"
                  >
                    EXPLORE SPACES
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/register"
                    className="px-7 py-3.5 bg-[#FFFDF7] text-[#123C36] font-extrabold text-xs uppercase tracking-wider hover:bg-[#C9E9EA] transition-all rounded-full border-2 border-[#123C36] flex items-center gap-2"
                    data-cursor="JOIN"
                  >
                    GET STARTED
                    <CornerDownRight className="w-4 h-4 text-[#32C6BE]" />
                  </Link>
                </div>
              </div>

              {/* Ecosystem Node Card */}
              <div className="lg:col-span-5 pt-2 lg:pt-0">
                <div 
                  className="organic-card-forest p-4 space-y-3 text-left"
                  data-cursor="ECOSYSTEM"
                >
                  <div className="flex items-center justify-between border-b border-[#32C6BE]/30 pb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#32C6BE]">
                      CIVIC HUB NETWORK
                    </span>
                    <span className="bg-[#32C6BE] text-[#123C36] px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-full">
                      ACTIVE
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 bg-[#0C2B26] border border-[#32C6BE]/30 rounded-xl space-y-1">
                      <span className="text-[9px] font-mono text-[#32C6BE] block">FEATURED LOCATION</span>
                      <h4 className="text-xs font-extrabold text-white uppercase">AMPHITHEATER & PARK LAB</h4>
                      <p className="text-[11px] text-[#A9E4E2]">CAPACITY: 120 GUESTS • STAGE • ACCESSIBLE</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-extrabold uppercase">
                      <div className="p-2 bg-[#0C2B26] border border-[#32C6BE]/20 rounded-lg text-white">
                        <span className="text-[8px] text-[#A9E4E2] block">HOST</span>
                        CIVIC TECH LAB
                      </div>
                      <div className="p-2 bg-[#0C2B26] border border-[#32C6BE]/20 rounded-lg text-white">
                        <span className="text-[8px] text-[#32C6BE] block">SCHEDULED</span>
                        ART WORKSHOP
                      </div>
                    </div>
                  </div>

                  <div className="text-[9px] font-mono text-[#A9E4E2] text-center pt-1 border-t border-[#32C6BE]/20">
                    SPACES → PEOPLE → ACTIVITIES → COMMUNITY
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MOVING MARQUEE TICKER — SOFT LIGHT BLUE (Requirement #6 & #8) */}
      <section className="bg-[#C9E9EA] text-[#123C36] py-3.5 overflow-hidden border-b-2 border-[#123C36] select-none font-bold">
        <div className="animate-marquee font-display font-extrabold text-lg sm:text-2xl tracking-tight uppercase whitespace-nowrap flex items-center gap-8">
          <span>DISCOVER</span>
          <span className="text-[#32C6BE]">✦</span>
          <span>REQUEST</span>
          <span className="text-[#32C6BE]">✦</span>
          <span>CONNECT</span>
          <span className="text-[#32C6BE]">✦</span>
          <span className="bg-[#123C36] text-[#32C6BE] px-3.5 py-0.5 rounded-full">ACTIVATE</span>
          <span className="text-[#32C6BE]">✦</span>
          <span>SPACES</span>
          <span className="text-[#32C6BE]">✦</span>
          <span>PEOPLE</span>
          <span className="text-[#32C6BE]">✦</span>
          <span>ACTIVITIES</span>
          <span className="text-[#32C6BE]">✦</span>
          <span>COMMUNITY</span>
          <span className="text-[#32C6BE]">✦</span>
          <span>DISCOVER</span>
          <span className="text-[#32C6BE]">✦</span>
          <span>REQUEST</span>
          <span className="text-[#32C6BE]">✦</span>
          <span>CONNECT</span>
          <span className="text-[#32C6BE]">✦</span>
          <span className="bg-[#123C36] text-[#32C6BE] px-3.5 py-0.5 rounded-full">ACTIVATE</span>
          <span className="text-[#32C6BE]">✦</span>
          <span>SPACES</span>
          <span className="text-[#32C6BE]">✦</span>
          <span>PEOPLE</span>
          <span className="text-[#32C6BE]">✦</span>
          <span>ACTIVITIES</span>
          <span className="text-[#32C6BE]">✦</span>
          <span>COMMUNITY</span>
        </div>
      </section>

      {/* 3. LIGHT BLUE SECTION — FEATURED PUBLIC SPACES (Requirement #6) */}
      <section className="bg-soft-blue-pattern py-16 sm:py-20 border-b-2 border-[#123C36]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#123C36]/20 pb-4">
            <div className="text-left">
              <span className="text-xs font-extrabold text-[#123C36] bg-[#FFFDF7] px-3 py-1 rounded-full border border-[#123C36] uppercase tracking-wider inline-block mb-1">
                CIVIC CATALOG
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#123C36] uppercase tracking-tight">FEATURED PUBLIC SPACES</h2>
            </div>
            <Link
              to="/spaces"
              className="px-6 py-3 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] transition-colors rounded-full border-2 border-[#123C36]"
              data-cursor="CATALOG"
            >
              EXPLORE ALL SPACES →
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner text="LOADING PUBLIC SPACES FROM DATABASE..." />
          ) : featuredSpaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredSpaces.map((space, idx) => (
                <SpaceCard key={space._id} space={space} onBookClick={handleBookClick} featured={idx === 0} />
              ))}
            </div>
          ) : (
            <div className="organic-card p-8 text-center text-[#4D6B63] text-xs">
              NO PUBLIC SPACES CURRENTLY FOUND IN DATABASE.
            </div>
          )}
        </div>
      </section>

      {/* 4. CREAM SECTION — HOW IT WORKS WORKFLOW WITH CONNECTING ARROWS */}
      <section className="bg-[#F7F4EA] py-16 sm:py-20 border-b-2 border-[#123C36]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-left space-y-2">
            <span className="text-xs font-extrabold text-[#123C36] bg-[#C9E9EA] px-3.5 py-1 uppercase tracking-wider inline-block rounded-full border border-[#123C36]">
              WORKFLOW
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold font-display uppercase tracking-tight text-[#123C36]">
              HOW RESPACE WORKS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              { step: '01', title: 'DISCOVER', desc: 'Browse available public spaces filtered by capacity, facilities, and city location.' },
              { step: '02', title: 'REQUEST', desc: 'Submit date & time-slot booking requests backed by conflict validation.' },
              { step: '03', title: 'CONNECT', desc: 'Administrators review and approve requests, updating status instantly in MongoDB.' },
              { step: '04', title: 'ACTIVATE', desc: 'Host community workshops, fitness classes, hackathons, and public gatherings.' }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="organic-card p-6 flex flex-col justify-between space-y-6 text-left relative"
                data-cursor="STEP"
              >
                <span className="text-5xl font-extrabold font-display text-[#32C6BE] block">
                  {item.step}
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold font-display text-[#123C36] uppercase tracking-wider">{item.title}</h3>
                  <p className="text-xs text-[#4D6B63] leading-relaxed">{item.desc}</p>
                </div>

                {/* Hand-Drawn Arrow connector for desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#123C36" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DARK FOREST GREEN SECTION — URBAN PURPOSE & CHALLENGE */}
      <section className="bg-[#123C36] text-[#FFFDF7] py-16 sm:py-20 border-b-2 border-[#123C36]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0C2B26] p-8 sm:p-14 border-2 border-[#32C6BE] rounded-3xl shadow-organic text-left space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="px-3.5 py-1 bg-[#32C6BE] text-[#123C36] text-xs font-extrabold uppercase tracking-wider inline-block rounded-full">
                  URBAN CHALLENGE
                </span>
                <h2 className="text-3xl sm:text-6xl font-extrabold font-display uppercase tracking-tight text-white leading-[0.95]">
                  "GOOD SPACES <br />
                  SHOULDN'T SIT <br />
                  <span className="text-[#32C6BE]">EMPTY."</span>
                </h2>
                <p className="text-sm sm:text-base text-[#A9E4E2] leading-relaxed max-w-lg font-normal">
                  Across modern cities, hundreds of civic auditoriums, library labs, park amphitheaters, and rooftops sit vacant for hours every day due to fragmented procedures.
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                <div className="p-6 bg-[#123C36] border border-[#32C6BE]/30 rounded-2xl space-y-2 hover:border-[#32C6BE] transition-colors">
                  <span className="text-xs font-extrabold text-rose-300 uppercase block">IDLE CIVIC ASSETS</span>
                  <h4 className="text-lg font-extrabold text-white uppercase">UNMONITORED VENUES</h4>
                  <p className="text-xs text-[#A9E4E2]">Valuable public assets remain locked during off-peak hours.</p>
                </div>

                <div className="p-6 bg-[#123C36] border-2 border-[#32C6BE] rounded-2xl space-y-2">
                  <span className="text-xs font-extrabold text-[#32C6BE] uppercase block">RESPACE SOLUTION</span>
                  <h4 className="text-lg font-extrabold text-white uppercase">DIRECT RESERVATION PLATFORM</h4>
                  <p className="text-xs text-[#A9E4E2]">Real-time conflict validation & community activity scheduling.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SOFT TURQUOISE SECTION — IMPACT METRICS & TELEMETRY */}
      <section className="bg-[#A9E4E2] text-[#123C36] py-16 sm:py-20 border-b-2 border-[#123C36]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFDF7] p-8 sm:p-14 border-2 border-[#123C36] rounded-3xl shadow-organic text-left space-y-8">
            <div className="text-left space-y-2">
              <span className="text-xs font-extrabold text-[#FFFDF7] bg-[#123C36] px-3.5 py-1 uppercase tracking-wider inline-block rounded-full">
                IMPACT METRICS
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display uppercase tracking-tight text-[#123C36]">
                "MAKE EVERY SPACE COUNT."
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'TOTAL SPACES', value: totalCount.spaces, sub: 'REGISTERED VENUES' },
                { label: 'ACTIVE SPACES', value: totalCount.active, sub: 'AVAILABLE TODAY' },
                { label: 'ACTIVITIES HOSTED', value: totalCount.activities, sub: 'COMMUNITY EVENTS' },
                { label: 'TOTAL CAPACITY', value: `${totalCount.capacity}+`, sub: 'GUESTS SERVED' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#123C36] text-[#FFFDF7] p-6 border-2 border-[#123C36] rounded-2xl space-y-1 shadow-sm">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display text-[#32C6BE] block">{stat.value}</span>
                  <span className="text-xs font-extrabold text-white block uppercase tracking-wider">{stat.label}</span>
                  <span className="text-[10px] font-mono text-[#A9E4E2] block">{stat.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CREAM SECTION — COMMUNITY ACTIVITIES POSTERS */}
      <section className="bg-[#F7F4EA] py-16 sm:py-20 border-b-2 border-[#123C36]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#123C36]/20 pb-4">
            <div className="text-left">
              <span className="text-xs font-extrabold text-[#123C36] bg-[#32C6BE] px-3.5 py-1 uppercase tracking-wider inline-block rounded-full border border-[#123C36]">
                COMMUNITY EVENTS
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#123C36] uppercase tracking-tight">
                UPCOMING COMMUNITY ACTIVITIES
              </h2>
            </div>
            <Link
              to="/activities"
              className="px-6 py-3 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] transition-colors rounded-full border-2 border-[#123C36]"
              data-cursor="EVENTS"
            >
              EXPLORE ACTIVITIES →
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner text="LOADING COMMUNITY ACTIVITIES..." />
          ) : communityActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communityActivities.map((activity) => (
                <ActivityCard key={activity._id} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="organic-card p-8 text-center text-[#4D6B63] text-xs">
              NO UPCOMING COMMUNITY ACTIVITIES REGISTERED.
            </div>
          )}
        </div>
      </section>

      {/* 8. DARK FOREST GREEN SECTION — FINAL EDITORIAL CTA */}
      <section className="bg-[#123C36] text-[#FFFDF7] py-16 sm:py-20 border-t-2 border-[#123C36]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#32C6BE] text-[#123C36] p-8 sm:p-16 text-left space-y-8 border-2 border-[#123C36] rounded-3xl shadow-organic relative overflow-hidden">
            
            {/* Background Hand-Drawn Shape */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#FFFDF7]/30 rounded-full blur-xl pointer-events-none" />

            <h2 className="text-4xl sm:text-7xl font-extrabold font-display uppercase leading-[0.9] tracking-tight relative z-10">
              THERE'S ALWAYS <br />
              A <span className="bg-[#123C36] text-[#32C6BE] px-4 py-1 rounded-2xl">SPACE</span> FOR <br />
              SOMETHING MEANINGFUL.
            </h2>
            <p className="text-sm sm:text-base font-bold text-[#123C36] max-w-xl leading-relaxed relative z-10">
              Join ReSpace today as a community organizer or public space manager to start activating locations across your city.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 relative z-10">
              <Link
                to="/spaces"
                className="px-8 py-4 bg-[#123C36] text-[#FFFDF7] font-extrabold text-sm uppercase tracking-wider hover:bg-[#FFFDF7] hover:text-[#123C36] transition-all rounded-full border-2 border-[#123C36] flex items-center gap-2"
                data-cursor="EXPLORE"
              >
                FIND A SPACE →
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 bg-[#FFFDF7] text-[#123C36] font-extrabold text-sm uppercase tracking-wider hover:bg-[#123C36] hover:text-[#FFFDF7] transition-all rounded-full border-2 border-[#123C36]"
                data-cursor="REGISTER"
              >
                CREATE ACCOUNT →
              </Link>
            </div>
          </div>
        </div>
      </section>

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

export default LandingPage;
