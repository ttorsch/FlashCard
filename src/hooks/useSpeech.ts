import { useState, useEffect, useCallback, useRef } from 'react';

export interface ElevenLabsVoiceOption {
  id: string;
  name: string;
  description: string;
  gender: 'Female' | 'Male';
}

export const ELEVEN_LABS_VOICES: ElevenLabsVoiceOption[] = [
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', description: 'Warm, natural & clear', gender: 'Female' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', description: 'Deep, encouraging & confident', gender: 'Male' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', description: 'Casual, friendly & conversational', gender: 'Male' },
  { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh', description: 'Young, enthusiastic & energetic', gender: 'Male' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', description: 'Bright, expressive & friendly', gender: 'Female' }
];

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState<number>(1.0);

  // ElevenLabs State
  const [apiKey, setApiKey] = useState<string>(() => {
    try {
      return (
        localStorage.getItem('surf_flashcard_elevenlabs_key') ||
        import.meta.env.VITE_ELEVENLABS_API_KEY ||
        ''
      );
    } catch {
      return import.meta.env.VITE_ELEVENLABS_API_KEY || '';
    }
  });

  const [voiceId, setVoiceId] = useState<string>(() => {
    try {
      return localStorage.getItem('surf_flashcard_elevenlabs_voice') || '21m00Tcm4TlvDq8ikWAM';
    } catch {
      return '21m00Tcm4TlvDq8ikWAM';
    }
  });

  const [isElevenLabsActive, setIsElevenLabsActive] = useState<boolean>(() => !!apiKey.trim());

  // Web Speech Fallback State
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [selectedWebVoice, setSelectedWebVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Audio Playback & Quota Cache Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<Map<string, string>>(new Map());

  // Save API Key
  const saveApiKey = useCallback((key: string) => {
    const trimmed = key.trim();
    setApiKey(trimmed);
    setIsElevenLabsActive(!!trimmed);
    try {
      if (trimmed) {
        localStorage.setItem('surf_flashcard_elevenlabs_key', trimmed);
      } else {
        localStorage.removeItem('surf_flashcard_elevenlabs_key');
      }
    } catch (e) {
      console.error('Failed to save ElevenLabs API key', e);
    }
  }, []);

  // Save Voice ID
  const saveVoiceId = useCallback((id: string) => {
    setVoiceId(id);
    try {
      localStorage.setItem('surf_flashcard_elevenlabs_voice', id);
    } catch (e) {
      console.error('Failed to save ElevenLabs Voice ID', e);
    }
  }, []);

  // Initialize Web Speech API Fallback
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const englishVoices = voices.filter(
          (v) => v.lang.startsWith('en') || v.lang.includes('US') || v.lang.includes('GB')
        );
        const preferred =
          englishVoices.find(
            (v) =>
              v.name.includes('Google') ||
              v.name.includes('Natural') ||
              v.name.includes('Samantha') ||
              v.name.includes('Daniel')
          ) ||
          englishVoices[0] ||
          voices[0] ||
          null;

        setSelectedWebVoice(preferred);
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  // Stop any active audio
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
  }, []);

  // Speak via Web Speech API (Fallback)
  const speakWebSpeech = useCallback(
    (text: string) => {
      if (!synthRef.current) return;
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      if (selectedWebVoice) {
        utterance.voice = selectedWebVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utterance);
    },
    [rate, selectedWebVoice]
  );

  // Main Speak Function (ElevenLabs API with Quota Cache & WebSpeech Fallback)
  const speak = useCallback(
    async (text: string) => {
      stop();

      // If no ElevenLabs API key, use Browser WebSpeech immediately
      if (!apiKey.trim()) {
        speakWebSpeech(text);
        return;
      }

      const cacheKey = `${text}_${voiceId}_${rate}`;

      // Check session cache to save ElevenLabs character quota
      if (cacheRef.current.has(cacheKey)) {
        const cachedUrl = cacheRef.current.get(cacheKey)!;
        const audio = new Audio(cachedUrl);
        audioRef.current = audio;
        audio.playbackRate = rate;

        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => {
          setIsSpeaking(false);
          speakWebSpeech(text);
        };

        audio.play().catch(() => speakWebSpeech(text));
        return;
      }

      // Call ElevenLabs Text-to-Speech API
      try {
        setIsSpeaking(true);
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': apiKey.trim()
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75
            }
          })
        });

        if (!response.ok) {
          throw new Error(`ElevenLabs API error: ${response.status}`);
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        // Save in quota cache
        cacheRef.current.set(cacheKey, objectUrl);

        const audio = new Audio(objectUrl);
        audioRef.current = audio;
        audio.playbackRate = rate;

        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => {
          setIsSpeaking(false);
          speakWebSpeech(text);
        };

        await audio.play();
      } catch (error) {
        console.warn('ElevenLabs API failed, falling back to WebSpeech:', error);
        setIsSpeaking(false);
        speakWebSpeech(text);
      }
    },
    [apiKey, voiceId, rate, stop, speakWebSpeech]
  );

  return {
    speak,
    stop,
    isSpeaking,
    rate,
    setRate,
    apiKey,
    saveApiKey,
    voiceId,
    saveVoiceId,
    isElevenLabsActive
  };
}
