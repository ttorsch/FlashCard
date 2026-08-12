import React, { useState } from 'react';
import { Lock, KeyRound, X, AlertCircle } from 'lucide-react';
import type { TranslationKeys } from '../data/translations';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  correctPin?: string;
  t: TranslationKeys;
}

export const PinModal: React.FC<PinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  correctPin = '2026',
  t
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F214A]/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm glass-panel p-6 rounded-3xl border border-[#0F214A]/20 shadow-2xl bg-white text-[#0F214A]">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#0F214A]/40 hover:text-[#0F214A] p-1 rounded-full hover:bg-[#FAF8F5] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#E52E2A]/10 text-[#E52E2A] flex items-center justify-center mb-3 border border-[#E52E2A]/30 shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-[#0F214A]">{t.enterPinTitle}</h3>
          <p className="text-xs text-[#0F214A]/70 font-semibold mt-1">
            {t.enterPinDesc}
          </p>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0F214A]/40" />
            <input
              type="password"
              maxLength={8}
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError(false);
              }}
              placeholder={t.enterPinPlaceholder}
              className={`w-full pl-11 pr-4 py-3 bg-[#FAF8F5] rounded-xl border ${
                error
                  ? 'border-[#E52E2A] text-[#E52E2A] focus:ring-[#E52E2A]'
                  : 'border-[#0F214A]/20 text-[#0F214A] focus:border-[#1D52B8] focus:ring-[#1D52B8]'
              } focus:outline-none focus:ring-2 text-center text-lg font-mono tracking-widest transition-all`}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-[#E52E2A] text-xs bg-[#E52E2A]/10 p-2.5 rounded-lg border border-[#E52E2A]/20 font-bold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{t.incorrectPin}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#E52E2A] hover:bg-[#D4221E] text-white font-black text-sm shadow-md shadow-[#E52E2A]/20 transition-all duration-200 active:scale-[0.98]"
          >
            {t.unlockManager}
          </button>
        </form>

      </div>
    </div>
  );
};
