import React, { useState } from 'react';
import { X, Calendar, Clock, Users, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { bookingService } from '../services/bookingService';
import { useToast } from '../context/ToastContext';

const BookingModal = ({ space, isOpen, onClose, onSuccess }) => {
  const { showSuccess, showError } = useToast();

  const [requestedDate, setRequestedDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('12:00');
  const [purpose, setPurpose] = useState('');
  const [expectedParticipants, setExpectedParticipants] = useState(10);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !space) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!requestedDate || !startTime || !endTime || !purpose || !expectedParticipants) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (startTime >= endTime) {
      setErrorMsg('Start time must be strictly before end time.');
      return;
    }

    if (Number(expectedParticipants) > space.capacity) {
      setErrorMsg(`Expected participants (${expectedParticipants}) exceeds space capacity limit of ${space.capacity}.`);
      return;
    }

    setSubmitting(true);

    try {
      const response = await bookingService.createBooking({
        spaceId: space._id,
        requestedDate,
        startTime,
        endTime,
        purpose,
        expectedParticipants: Number(expectedParticipants)
      });

      if (response.success) {
        showSuccess('Booking request submitted successfully! Pending admin approval.');
        if (onSuccess) onSuccess(response.data);
        onClose();
      }
    } catch (err) {
      console.error('Booking Submission Error:', err);
      const msg = err.message || 'Failed to submit booking request.';
      setErrorMsg(msg);
      showError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123C36]/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="organic-card w-full max-w-lg p-6 sm:p-8 text-left relative my-8 text-[#17352F]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#4D6B63] hover:text-[#123C36] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 space-y-1">
          <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-[#32C6BE] text-[#123C36] rounded-full border border-[#123C36]">
            {space.category}
          </span>
          <h2 className="text-2xl font-extrabold font-display uppercase tracking-tight text-[#123C36] mt-2">REQUEST SPACE BOOKING</h2>
          <p className="text-xs text-[#4D6B63] font-mono mt-1">
            RESERVING <span className="font-bold text-[#123C36]">{space.name}</span> • MAX CAPACITY: {space.capacity} GUESTS
          </p>
        </div>

        {/* Form error alert */}
        {errorMsg && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-start gap-2.5 font-mono rounded-xl">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMsg}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Selector */}
          <div>
            <label className="block text-xs font-extrabold uppercase text-[#123C36] mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#32C6BE]" />
              REQUESTED DATE *
            </label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={requestedDate}
              onChange={(e) => setRequestedDate(e.target.value)}
              className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
              required
            />
          </div>

          {/* Time Slots Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold uppercase text-[#123C36] mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#32C6BE]" />
                START TIME *
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="organic-input w-full px-3 py-2.5 text-xs font-mono text-[#17352F]"
              >
                {['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-[#123C36] mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#32C6BE]" />
                END TIME *
              </label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="organic-input w-full px-3 py-2.5 text-xs font-mono text-[#17352F]"
              >
                {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Expected Participants */}
          <div>
            <label className="block text-xs font-extrabold uppercase text-[#123C36] mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#32C6BE]" />
              EXPECTED PARTICIPANTS (MAX: {space.capacity}) *
            </label>
            <input
              type="number"
              min="1"
              max={space.capacity}
              value={expectedParticipants}
              onChange={(e) => setExpectedParticipants(e.target.value)}
              className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F]"
              required
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-xs font-extrabold uppercase text-[#123C36] mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#32C6BE]" />
              PURPOSE OF REQUEST / EVENT DESCRIPTION *
            </label>
            <textarea
              rows="3"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="DESCRIBE THE ACTIVITY OR EVENT YOU PLAN TO HOST IN THIS SPACE..."
              className="organic-input w-full px-4 py-2.5 text-xs font-mono text-[#17352F] resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Action */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#123C36]/10">
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
              className="px-6 py-2.5 bg-[#123C36] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#32C6BE] hover:text-[#123C36] border-2 border-[#123C36] rounded-xl transition-colors disabled:opacity-50"
            >
              {submitting ? 'SUBMITTING...' : 'SUBMIT REQUEST →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
