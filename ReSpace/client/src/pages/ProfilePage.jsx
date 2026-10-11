import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Phone, Briefcase, FileText, Lock, Shield, CheckCircle2, Sparkles } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    organization: user?.organization || '',
    avatar: user?.avatar || '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateProfile(formData);
      if (res.success) {
        showSuccess('Profile updated successfully in MongoDB!');
      }
    } catch (error) {
      console.error('Update Profile Error:', error);
      showError(error.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#17352F] bg-[#F7F4EA]">
      <div className="space-y-2 text-left">
        <span className="px-3.5 py-1 text-xs font-extrabold bg-[#32C6BE] text-[#123C36] uppercase tracking-wider inline-block rounded-full border border-[#123C36]">
          ACCOUNT SETTINGS
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display uppercase tracking-tight text-[#123C36]">USER PROFILE</h1>
        <p className="text-xs sm:text-sm text-[#4D6B63] font-mono">Manage your personal information, organization details, and security</p>
      </div>

      <div className="organic-card p-8 text-left space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-[#123C36]/10">
          <img
            src={formData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
            alt={formData.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#32C6BE]"
          />
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold font-display text-[#123C36] uppercase">{user?.name}</h3>
            <p className="text-xs text-[#4D6B63] font-mono">{user?.email}</p>
            <span className={`inline-block px-3 py-1 text-[10px] font-extrabold uppercase rounded-full border ${
              user?.role === 'admin' ? 'bg-[#123C36] text-[#32C6BE] border-[#123C36]' : 'bg-[#32C6BE] text-[#123C36] border-[#123C36]'
            }`}>
              {user?.role} ACCOUNT
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1.5">FULL NAME</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#4D6B63] absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="organic-input w-full pl-11 pr-4 py-3 text-xs font-mono text-[#17352F]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1.5">PHONE NUMBER</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#4D6B63] absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="organic-input w-full pl-11 pr-4 py-3 text-xs font-mono text-[#17352F]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1.5">ORGANIZATION / GROUP</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-[#4D6B63] absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="organic-input w-full pl-11 pr-4 py-3 text-xs font-mono text-[#17352F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1.5">AVATAR IMAGE URL</label>
              <input
                type="text"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                placeholder="https://..."
                className="organic-input w-full px-4 py-3 text-xs font-mono text-[#17352F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1.5">ORGANIZER BIO / SUMMARY</label>
            <textarea
              rows="3"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="TELL US ABOUT YOUR COMMUNITY INITIATIVES..."
              className="organic-input w-full px-4 py-3 text-xs font-mono text-[#17352F] resize-none"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-[#123C36]/10 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] border-2 border-[#123C36] rounded-xl transition-all"
            >
              {loading ? 'SAVING...' : 'UPDATE PROFILE →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
