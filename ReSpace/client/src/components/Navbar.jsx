import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  MapPin, 
  CalendarCheck, 
  Users, 
  LayoutDashboard, 
  ShieldAlert, 
  User, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  ChevronDown,
  ArrowUpRight,
  Heart
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
      isActive
        ? 'text-[#123C36] bg-[#32C6BE] font-extrabold shadow-sm'
        : 'text-[#17352F] hover:text-[#123C36] hover:bg-[#32C6BE]/20'
    }`;

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-[#FFFDF7]/95 backdrop-blur-md border-b-2 border-[#123C36]/15 shadow-card py-2.5' 
        : 'bg-[#F7F4EA]/90 backdrop-blur-md border-b border-[#123C36]/10 py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" data-cursor="RESPACE">
            <div className="w-10 h-10 bg-[#123C36] text-[#32C6BE] font-extrabold flex items-center justify-center rounded-xl border-2 border-[#123C36] shadow-organic group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
              <Building2 className="w-5 h-5 text-[#32C6BE] stroke-[2.5]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-extrabold tracking-tight text-[#123C36] flex items-center gap-1 font-display">
                Re<span className="text-[#32C6BE]">Space</span>
                <span className="w-2 h-2 rounded-full bg-[#32C6BE] animate-ping"></span>
              </span>
              <span className="text-[9px] text-[#4D6B63] tracking-widest font-mono uppercase -mt-1 font-semibold">
                CIVIC PLATFORM • CAT2
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#FFFDF7] p-1.5 rounded-full border-2 border-[#123C36]/15 shadow-sm">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/spaces" className={navLinkClass}>
              Explore Spaces
            </NavLink>
            <NavLink to="/activities" className={navLinkClass}>
              Activities
            </NavLink>

            {user && (
              <>
                <NavLink to="/my-requests" className={navLinkClass}>
                  My Requests
                </NavLink>

                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>

                {isAdmin && (
                  <NavLink to="/admin" className={navLinkClass}>
                    Admin Panel
                  </NavLink>
                )}
              </>
            )}
          </nav>

          {/* User Auth Buttons / Profile Menu */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 bg-[#FFFDF7] border-2 border-[#123C36] rounded-full hover:bg-[#32C6BE]/15 transition-all shadow-sm"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border-2 border-[#32C6BE]"
                  />
                  <div className="text-left leading-none">
                    <span className="block text-xs font-extrabold text-[#123C36] uppercase tracking-wider">{user.name}</span>
                    <span className={`inline-block text-[9px] uppercase font-extrabold tracking-widest mt-0.5 ${user.role === 'admin' ? 'text-[#32C6BE]' : 'text-[#123C36]'}`}>
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#123C36] ml-1" />
                </button>

                {/* Dropdown menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#FFFDF7] p-2 shadow-card border-2 border-[#123C36] rounded-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-[#123C36]/10">
                      <p className="text-[10px] font-mono uppercase text-[#4D6B63]">Signed in as</p>
                      <p className="text-xs font-bold text-[#123C36] truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#123C36] hover:bg-[#32C6BE] hover:text-[#123C36] rounded-xl transition-colors mt-1"
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#123C36] hover:bg-[#32C6BE] hover:text-[#123C36] rounded-xl transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      User Dashboard
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#123C36] hover:bg-[#A9E4E2] rounded-xl transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-1 border-t border-[#123C36]/10"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#123C36] hover:text-[#32C6BE] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#FFFDF7] bg-[#123C36] hover:bg-[#32C6BE] hover:text-[#123C36] transition-all flex items-center gap-1.5 rounded-full border-2 border-[#123C36] shadow-organic"
                  data-cursor="JOIN"
                >
                  Get Started
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#123C36] hover:bg-[#32C6BE]/20 rounded-xl border-2 border-[#123C36]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#123C36]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF7] border-t-2 border-[#123C36] px-4 pt-4 pb-6 space-y-2 animate-in fade-in duration-200">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#123C36] hover:bg-[#32C6BE] rounded-xl border-b border-[#123C36]/10"
          >
            Home
          </NavLink>
          <NavLink
            to="/spaces"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#123C36] hover:bg-[#32C6BE] rounded-xl border-b border-[#123C36]/10"
          >
            Explore Spaces
          </NavLink>
          <NavLink
            to="/activities"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#123C36] hover:bg-[#32C6BE] rounded-xl border-b border-[#123C36]/10"
          >
            Community Activities
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/my-requests"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#123C36] hover:bg-[#32C6BE] rounded-xl border-b border-[#123C36]/10"
              >
                My Requests
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#123C36] hover:bg-[#32C6BE] rounded-xl border-b border-[#123C36]/10"
              >
                User Dashboard
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#32C6BE] hover:bg-[#123C36] rounded-xl"
                >
                  Admin Panel
                </NavLink>
              )}
              <div className="pt-3 border-t border-[#123C36]/10 flex items-center justify-between">
                <span className="text-xs font-bold text-[#123C36] uppercase">{user.name} ({user.role})</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-xs font-extrabold text-rose-600 uppercase"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="pt-3 border-t border-[#123C36]/10 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-3 text-xs font-extrabold uppercase text-[#123C36] bg-[#F7F4EA] border-2 border-[#123C36] rounded-xl"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-3 text-xs font-extrabold uppercase text-[#FFFDF7] bg-[#123C36] rounded-xl"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
