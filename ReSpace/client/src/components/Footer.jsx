import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Sparkles, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t-2 border-[#123C36] bg-[#123C36] text-[#FFFDF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#32C6BE] text-[#123C36] flex items-center justify-center font-extrabold shadow-sm border border-[#123C36]">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1 font-display">
              Re<span className="text-[#32C6BE]">Space</span>
              <Sparkles className="w-3.5 h-3.5 text-[#32C6BE]" />
            </span>
          </div>
          <p className="text-xs text-[#A9E4E2] max-w-sm leading-relaxed">
            Reclaiming underused public and community spaces. Transforming idle urban areas into vibrant hotspots for workshops, fitness, cultural events, and civic collaboration.
          </p>
          <div className="text-[11px] text-[#A9E4E2]/80 font-mono">
            College CAT2 Project Demonstration • Full-Stack MERN Architecture
          </div>
        </div>

        <div>
          <h4 className="text-xs font-extrabold text-[#32C6BE] uppercase tracking-wider mb-4">Platform</h4>
          <ul className="space-y-2.5 text-xs text-[#A9E4E2] font-medium">
            <li><Link to="/spaces" className="hover:text-[#32C6BE] transition-colors">Explore Spaces</Link></li>
            <li><Link to="/activities" className="hover:text-[#32C6BE] transition-colors">Community Activities</Link></li>
            <li><Link to="/my-requests" className="hover:text-[#32C6BE] transition-colors">Booking Requests</Link></li>
            <li><Link to="/dashboard" className="hover:text-[#32C6BE] transition-colors">User Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold text-[#32C6BE] uppercase tracking-wider mb-4">MERN Stack Tech</h4>
          <ul className="space-y-2.5 text-xs text-[#A9E4E2] font-medium">
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#32C6BE]"></span>React.js & Tailwind CSS</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#A9E4E2]"></span>Node.js & Express REST APIs</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#32C6BE]"></span>MongoDB & Mongoose ODM</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#A9E4E2]"></span>JWT Security & Bcrypt Hashing</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#32C6BE]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A9E4E2] gap-4 font-medium">
        <p>© {new Date().getFullYear()} ReSpace Platform. Built with <Heart className="w-3.5 h-3.5 text-rose-400 inline mx-0.5" /> for College CAT2 Viva Demonstration.</p>
        <div className="flex items-center gap-6">
          <span className="text-[#32C6BE] font-mono text-[11px] font-bold">Status: MongoDB Connected</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
