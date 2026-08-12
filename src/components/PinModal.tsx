import React, { useState } from 'react';
import { Lock, KeyRound, X, AlertCircle } from 'lucide-react';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  correctPin?: string;
}

export const PinModal: React.FC<PinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  correctPin = '2026'
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === correctPin) {
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
      setPin('');
    }
  };

  const handleClose = () => {
    setPin('');
    setError(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-2xl bg-slate-900/95 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 border border-cyan-500/40 shadow-lg shadow-cyan-500/20">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white">Enter Admin PIN</h3>
          <p className="text-xs text-slate-400 mt-1">
            Please enter your PIN to manage flashcards
          </p>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="password"
              maxLength={8}
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter PIN..."
              className={`w-full pl-11 pr-4 py-3 bg-slate-950/80 rounded-xl border ${
                error
                  ? 'border-rose-500 text-rose-200 focus:ring-rose-500'
                  : 'border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400'
              } focus:outline-none focus:ring-2 text-center text-lg font-mono tracking-widest transition-all`}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Incorrect PIN. Please try again.</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-[0.98]"
          >
            Unlock Card Manager
          </button>
        </form>

      </div>
    </div>
  );
};
