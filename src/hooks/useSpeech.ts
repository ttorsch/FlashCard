import { useState, useEffect, useCallback, useRef } from 'react';

const DEFAULT_API_KEY = 'sk_a94d385d4d9c20169d80025a3593d71275974e691fae7518';
const JOSH_VOICE_ID = 'TxGEqnHWrfWFTfGW9XjX'; // Josh - ElevenLabs Voice ID

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState<number>(1.0);

  // ElevenLabs State initialized with default API Key and Josh Voice ID
  const [apiKey] = useState<string>(DEFAULT_API_KEY);
  const [voiceId] = useState<string>(JOSH_VOICE_ID);

  // Web Speech Fallback State
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [selectedWebVoice, setSelectedWebVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Audio Playback & Quota Cache Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<Map<string, string>>(new Map());

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
              v.name.includes('Daniel') ||
              v.name.includes('Alex') ||
              v.name.includes('Google') ||
              v.name.includes('Natural') ||
              v.name.includes('Samantha')
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

  // Main Speak Function (ElevenLabs API using Josh with session cache & WebSpeech fallback)
  const speak = useCallback(
    async (text: string) => {
      stop();

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

      // Call ElevenLabs Text-to-Speech API (Josh)
      try {
        setIsSpeaking(true);
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': apiKey
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
    voiceId
  };
}
