import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Building2, Lock, Mail, Sparkles, ArrowRight, ShieldCheck, User, CheckCircle2, ArrowUpRight } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        showSuccess(`Welcome back, ${res.data.name}!`);
        navigate(res.data.role === 'admin' ? '/admin' : from, { replace: true });
      }
    } catch (err) {
      console.error('Login Error:', err);
      showError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoUser = (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 text-[#17352F] bg-[#F7F4EA]">
      <div className="w-full max-w-5xl organic-card grid grid-cols-1 lg:grid-cols-2 text-left overflow-hidden">
        {/* Left Side: Editorial Banner */}
        <div className="p-8 sm:p-12 bg-[#123C36] text-[#FFFDF7] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#32C6BE]/20 rounded-full blur-3xl pointer-events-none"></div>

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
                COMMUNITY ACCESS
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display uppercase tracking-tight leading-[0.95] text-white">
                "CONNECTING <br />
                URBAN SPACES <br />
                WITH <span className="text-[#32C6BE]">COMMUNITIES."</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#A9E4E2] leading-relaxed font-mono">
                Log in to discover vacant civic auditoriums, manage venue reservations, or organize public events.
              </p>
            </div>
          </div>

          <div className="pt-8 space-y-3 border-t border-[#32C6BE]/20 relative z-10 text-xs font-mono text-[#A9E4E2]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#32C6BE]" />
              <span>Conflict-checked real-time scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#32C6BE]" />
              <span>Full-Stack MongoDB & Express REST Engine</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 sm:p-12 space-y-6 flex flex-col justify-center bg-[#FFFDF7]">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold font-display uppercase tracking-tight text-[#123C36]">SIGN IN TO RESPACE</h2>
            <p className="text-xs text-[#4D6B63] font-mono">ACCESS YOUR ACCOUNT DASHBOARD AND REQUESTS</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold uppercase text-[#123C36] mb-1.5">EMAIL ADDRESS</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#4D6B63] absolute left-4 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="NAME@COMPANY.COM"
                  className="organic-input w-full pl-11 pr-4 py-3 text-xs font-mono text-[#17352F]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-[#123C36] mb-1.5">PASSWORD</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#4D6B63] absolute left-4 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="organic-input w-full pl-11 pr-4 py-3 text-xs font-mono text-[#17352F]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] transition-all border-2 border-[#123C36] rounded-xl flex items-center justify-center gap-2"
            >
              {loading ? 'AUTHENTICATING...' : 'SIGN IN →'}
            </button>
          </form>

          {/* Quick Demo Credentials Switcher for Viva */}
          <div className="pt-4 border-t border-[#123C36]/10 space-y-2">
            <span className="block text-[10px] font-extrabold text-[#4D6B63] uppercase tracking-wider text-center font-mono">
              QUICK VIVA DEMO CREDENTIALS
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoUser('user@respace.com', 'user123')}
                className="py-2.5 px-3 bg-[#F7F4EA] border-2 border-[#123C36] rounded-xl text-[11px] font-extrabold uppercase text-[#123C36] hover:bg-[#C9E9EA] flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-[#32C6BE]" />
                DEMO USER
              </button>
              <button
                type="button"
                onClick={() => fillDemoUser('admin@respace.com', 'admin123')}
                className="py-2.5 px-3 bg-[#123C36] border-2 border-[#123C36] rounded-xl text-[11px] font-extrabold uppercase text-[#32C6BE] hover:bg-[#32C6BE] hover:text-[#123C36] flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                DEMO ADMIN
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-[#4D6B63] font-mono">
            DON'T HAVE AN ACCOUNT?{' '}
            <Link to="/register" className="text-[#123C36] font-extrabold hover:underline">
              REGISTER HERE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
