import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Building2, Lock, Mail, User, ShieldAlert, ArrowRight, Briefcase, CheckCircle2 } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    organization: '',
    bio: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      showError('Please complete all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      showError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const res = await register(formData);
      if (res.success) {
        showSuccess('Account registered and saved in MongoDB!');
        navigate(formData.role === 'admin' ? '/admin' : '/dashboard');
      }
    } catch (err) {
      console.error('Registration Error:', err);
      showError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 text-[#17352F] bg-[#F7F4EA]">
      <div className="w-full max-w-5xl organic-card grid grid-cols-1 lg:grid-cols-2 text-left overflow-hidden">
        {/* Left Side: Editorial Banner */}
        <div className="p-8 sm:p-12 bg-[#123C36] text-[#FFFDF7] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-[#32C6BE]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-6 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-9 h-9 bg-[#32C6BE] text-[#123C36] font-extrabold flex items-center justify-center rounded-xl border border-[#123C36]">
                <Building2 className="w-5 h-5 text-[#123C36]" />
              </div>
              <span className="text-xl font-extrabold font-display tracking-tight text-white">
                Re<span className="text-[#32C6BE]">Space</span>
              </span>
            </Link>

            <div className="space-y-3 pt-6">
              <span className="bg-[#32C6BE] text-[#123C36] px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest inline-block rounded-full">
                JOIN THE PLATFORM
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display uppercase tracking-tight leading-[0.95] text-white">
                "ACTIVATE <br />
                SPACES. LEAD <br />
                <span className="text-[#32C6BE]">ACTIVITIES."</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#A9E4E2] leading-relaxed font-mono">
                Create a ReSpace account to submit booking requests, organize workshops, or manage civic spaces across the city.
              </p>
            </div>
          </div>

          <div className="pt-8 space-y-3 border-t border-[#32C6BE]/20 relative z-10 text-xs font-mono text-[#A9E4E2]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#32C6BE]" />
              <span>Free community organizer account</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#32C6BE]" />
              <span>Full MongoDB document persistence</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 sm:p-12 space-y-6 flex flex-col justify-center bg-[#FFFDF7]">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold font-display uppercase tracking-tight text-[#123C36]">CREATE RESPACE ACCOUNT</h2>
            <p className="text-xs text-[#4D6B63] font-mono">REGISTER AS A USER OR PLATFORM ADMINISTRATOR</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold uppercase text-[#123C36] mb-1.5">FULL NAME *</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#4D6B63] absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ALEX RIVERA"
                  className="organic-input w-full pl-11 pr-4 py-3 text-xs font-mono text-[#17352F]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-[#123C36] mb-1.5">EMAIL ADDRESS *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#4D6B63] absolute left-4 top-3.5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ALEX@COMMUNITY.ORG"
                  className="organic-input w-full pl-11 pr-4 py-3 text-xs font-mono text-[#17352F]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-[#123C36] mb-1.5">PASSWORD *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#4D6B63] absolute left-4 top-3.5" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="MIN 6 CHARS"
                    className="organic-input w-full pl-11 pr-4 py-3 text-xs font-mono text-[#17352F]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-[#123C36] mb-1.5">ACCOUNT ROLE *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="organic-input w-full px-4 py-3 text-xs font-mono text-[#17352F]"
                >
                  <option value="user">COMMUNITY USER</option>
                  <option value="admin">PLATFORM ADMIN</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-[#123C36] mb-1.5">ORGANIZATION / GROUP NAME</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-[#4D6B63] absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="E.G. CIVIC TECH ALLIANCE"
                  className="organic-input w-full pl-11 pr-4 py-3 text-xs font-mono text-[#17352F]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] transition-all border-2 border-[#123C36] rounded-xl flex items-center justify-center gap-2"
            >
              {loading ? 'CREATING ACCOUNT IN MONGODB...' : 'REGISTER ACCOUNT →'}
            </button>
          </form>

          <div className="text-center text-xs text-[#4D6B63] font-mono">
            ALREADY REGISTERED?{' '}
            <Link to="/login" className="text-[#123C36] font-extrabold hover:underline">
              LOG IN HERE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
