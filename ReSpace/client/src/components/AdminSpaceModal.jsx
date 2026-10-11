import React, { useState, useEffect } from 'react';
import { X, Building2, MapPin, Layers, Users, DollarSign, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { spaceService } from '../services/spaceService';
import { useToast } from '../context/ToastContext';

const AdminSpaceModal = ({ space, isOpen, onClose, onSuccess }) => {
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Community Hall',
    capacity: 50,
    hourlyRate: 0,
    address: '',
    city: '',
    state: 'CA',
    zipCode: '',
    facilities: '',
    rules: '',
    image: '',
    description: '',
    isAvailable: true
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (space) {
      setFormData({
        name: space.name || '',
        category: space.category || 'Community Hall',
        capacity: space.capacity || 50,
        hourlyRate: space.hourlyRate || 0,
        address: space.location?.address || '',
        city: space.location?.city || '',
        state: space.location?.state || 'CA',
        zipCode: space.location?.zipCode || '',
        facilities: Array.isArray(space.facilities) ? space.facilities.join(', ') : '',
        rules: Array.isArray(space.rules) ? space.rules.join(', ') : '',
        image: space.image || '',
        description: space.description || '',
        isAvailable: space.isAvailable !== undefined ? space.isAvailable : true
      });
    } else {
      setFormData({
        name: '',
        category: 'Community Hall',
        capacity: 50,
        hourlyRate: 0,
        address: '',
        city: '',
        state: 'CA',
        zipCode: '',
        facilities: 'Wi-Fi, Restrooms, Parking',
        rules: 'Clean up after use',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
        description: '',
        isAvailable: true
      });
    }
  }, [space, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const payload = {
      name: formData.name,
      category: formData.category,
      capacity: Number(formData.capacity),
      hourlyRate: Number(formData.hourlyRate),
      location: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      },
      facilities: formData.facilities.split(',').map(s => s.trim()).filter(Boolean),
      rules: formData.rules.split(',').map(s => s.trim()).filter(Boolean),
      image: formData.image || undefined,
      description: formData.description,
      isAvailable: formData.isAvailable
    };

    try {
      if (space?._id) {
        const res = await spaceService.updateSpace(space._id, payload);
        if (res.success) {
          showSuccess('Space updated successfully in MongoDB!');
          if (onSuccess) onSuccess(res.data);
          onClose();
        }
      } else {
        const res = await spaceService.createSpace(payload);
        if (res.success) {
          showSuccess('New space created and persisted in MongoDB!');
          if (onSuccess) onSuccess(res.data);
          onClose();
        }
      }
    } catch (err) {
      console.error('Save Space Error:', err);
      const msg = err.message || 'Failed to save space.';
      setErrorMsg(msg);
      showError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123C36]/80 backdrop-blur-md overflow-y-auto">
      <div className="organic-card w-full max-w-2xl p-6 sm:p-8 text-left relative my-8 text-[#17352F]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#4D6B63] hover:text-[#123C36]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 space-y-1">
          <span className="px-3.5 py-1 text-[10px] font-extrabold uppercase bg-[#123C36] text-[#32C6BE] rounded-full border border-[#123C36]">
            ADMIN SPACE OPERATIONS
          </span>
          <h2 className="text-2xl font-extrabold font-display uppercase tracking-tight text-[#123C36] mt-2">
            {space ? 'EDIT PUBLIC SPACE' : 'ADD NEW PUBLIC SPACE'}
          </h2>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2 font-mono rounded-xl">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">SPACE NAME *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">CATEGORY *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
              >
                {['Park', 'Community Hall', 'Library', 'Sports Ground', 'Auditorium', 'Rooftop', 'Courtyard', 'Co-working'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">MAX CAPACITY *</label>
              <input
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">HOURLY RATE ($) *</label>
              <input
                type="number"
                min="0"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">STREET ADDRESS *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">CITY *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">FACILITIES (COMMA-SEPARATED)</label>
            <input
              type="text"
              value={formData.facilities}
              onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
              placeholder="WI-FI, PROJECTOR, SOUND SYSTEM, RESTROOMS"
              className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">IMAGE URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#123C36] uppercase mb-1">DESCRIPTION *</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F] resize-none"
              required
            ></textarea>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isAvailableToggle"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
              className="w-4 h-4 rounded text-[#123C36] focus:ring-0"
            />
            <label htmlFor="isAvailableToggle" className="text-xs font-extrabold uppercase text-[#123C36] cursor-pointer">
              SPACE IS AVAILABLE FOR BOOKING
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#123C36]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-extrabold uppercase text-[#4D6B63] hover:text-[#123C36]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] border-2 border-[#123C36] rounded-xl transition-all disabled:opacity-50"
            >
              {submitting ? 'SAVING TO MONGODB...' : space ? 'UPDATE SPACE →' : 'CREATE SPACE →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSpaceModal;
