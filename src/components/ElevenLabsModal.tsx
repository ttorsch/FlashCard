import React, { useState } from 'react';
import { X, Sparkles, Key, Volume2, Check, ShieldCheck } from 'lucide-react';
import { ELEVEN_LABS_VOICES } from '../hooks/useSpeech';
import type { TranslationKeys } from '../data/translations';

interface ElevenLabsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  voiceId: string;
  onSaveVoiceId: (id: string) => void;
  onTestSpeak: (text: string) => void;
  isSpeaking: boolean;
  t: TranslationKeys;
}

export const ElevenLabsModal: React.FC<ElevenLabsModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
  voiceId,
  onSaveVoiceId,
  onTestSpeak,
  isSpeaking
}) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveApiKey(inputKey);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F3B]/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#0B1F3B]/15 shadow-2xl p-6 text-[#0B1F3B] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#0B1F3B]/40 hover:text-[#0B1F3B] rounded-full hover:bg-[#F6F1EA] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#EB6F43]/10 text-[#EB6F43] flex items-center justify-center border border-[#EB6F43]/25 shrink-0">
            <Sparkles className="w-6 h-6 text-[#EB6F43]" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#0B1F3B]">Charlie AI Voice (ElevenLabs)</h2>
            <p className="text-xs text-[#0B1F3B]/60 font-semibold">
              Default studio voice engine for all users
            </p>
          </div>
        </div>

        {/* Studio Voices Selection */}
        <div className="space-y-3 mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1F3B]/60">
            Active AI Voice Engine
          </label>

          <div className="space-y-2">
            {ELEVEN_LABS_VOICES.map((v) => {
              const isSelected = voiceId === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => onSaveVoiceId(v.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#0B1F3B] text-white border-[#0B1F3B] shadow-md'
                      : 'bg-[#F6F1EA] text-[#0B1F3B] border-[#0B1F3B]/10 hover:border-[#EB6F43]/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        isSelected ? 'bg-[#EB6F43]' : 'bg-[#0B1F3B]/20'
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold">{v.name}</span>
                        <span
                          className={`text-[10px] px-2 py-0.2 rounded-full font-mono font-bold ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#0B1F3B]/60'
                          }`}
                        >
                          {v.gender}
                        </span>
                      </div>
                      <p className={`text-xs ${isSelected ? 'text-white/70' : 'text-[#0B1F3B]/60'}`}>
                        {v.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSaveVoiceId(v.id);
                      onTestSpeak(`Hello! I am ${v.name}, your surf instructor voice.`);
                    }}
                    className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#EB6F43] border-[#EB6F43] text-white'
                        : 'bg-white border-[#0B1F3B]/15 text-[#0B1F3B]/70 hover:text-[#EB6F43]'
                    }`}
                    title="Test Voice"
                  >
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* API Key Form */}
        <form onSubmit={handleSave} className="space-y-4 border-t border-[#0B1F3B]/10 pt-5">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B1F3B]/60 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-[#EB6F43]" />
                API Key (Default Provided)
              </label>
            </div>

            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Default API Key active for everyone"
              className="w-full px-3.5 py-2.5 bg-[#F6F1EA] rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] text-xs font-mono focus:outline-none focus:border-[#0B1F3B]"
            />
          </div>

          {/* Quota saving info tip */}
          <div className="p-3 bg-[#EB6F43]/10 rounded-2xl border border-[#EB6F43]/20 flex items-start gap-2.5 text-xs text-[#0B1F3B]/80 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#EB6F43] shrink-0 mt-0.5" />
            <p>
              <strong className="font-bold text-[#EB6F43]">Automatic Fallback:</strong> If ElevenLabs is unavailable or quota is exceeded, audio automatically falls back to browser voice speech generator.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#0B1F3B]/60 hover:text-[#0B1F3B] bg-[#F6F1EA] transition-all"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#EB6F43] hover:bg-[#D85F35] shadow-md transition-all flex items-center gap-1.5"
            >
              {copiedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  Saved!
                </>
              ) : (
                'Save Key'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
