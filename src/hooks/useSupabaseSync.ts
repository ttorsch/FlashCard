import { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { SurfVocabulary } from '../data/surfVocabulary';
import type { SurfPhrase } from '../data/surfPhrases';

interface UseSupabaseSyncOptions {
  initialVocabulary: SurfVocabulary[];
  initialPhrases: SurfPhrase[];
}

export function useSupabaseSync({ initialVocabulary, initialPhrases }: UseSupabaseSyncOptions) {
  const [vocabulary, setVocabulary] = useState<SurfVocabulary[]>(initialVocabulary);
  const [phrases, setPhrases] = useState<SurfPhrase[]>(initialPhrases);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isConnected, setIsConnected] = useState(isSupabaseConfigured);

  // Helper to map DB row to SurfVocabulary
  const mapDbToVocab = (row: any): SurfVocabulary => ({
    id: row.id,
    category: row.category,
    english: row.english,
    thaiMeaning: row.thai_meaning,
    thaiPhonetic: row.thai_phonetic || '',
    example: row.example || '',
    audioText: row.audio_text || row.english,
    surfTip: row.surf_tip || ''
  });

  // Helper to map DB row to SurfPhrase
  const mapDbToPhrase = (row: any): SurfPhrase => ({
    id: row.id,
    category: row.category,
    english: row.english,
    thaiMeaning: row.thai_meaning,
    thaiPhonetic: row.thai_phonetic || '',
    context: row.context || '',
    audioText: row.audio_text || row.english
  });

  // Initial Fetch & Seed from Supabase
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let isMounted = true;

    async function loadData() {
      try {
        setIsSyncing(true);

        // Fetch Vocabulary
        const { data: dbVocab, error: vocabErr } = await supabase
          .from('vocabulary')
          .select('*')
          .order('created_at', { ascending: false });

        if (!vocabErr && dbVocab) {
          if (dbVocab.length > 0) {
            if (isMounted) setVocabulary(dbVocab.map(mapDbToVocab));
          } else {
            // Seed initial vocabulary if DB is empty
            const seedData = initialVocabulary.map((v) => ({
              id: v.id,
              category: v.category,
              english: v.english,
              thai_meaning: v.thaiMeaning,
              thai_phonetic: v.thaiPhonetic || '',
              example: v.example || '',
              audio_text: v.audioText || v.english,
              surf_tip: v.surfTip || ''
            }));
            await supabase.from('vocabulary').insert(seedData);
          }
        }

        // Fetch Phrases
        const { data: dbPhrases, error: phraseErr } = await supabase
          .from('phrases')
          .select('*')
          .order('created_at', { ascending: false });

        if (!phraseErr && dbPhrases) {
          if (dbPhrases.length > 0) {
            if (isMounted) setPhrases(dbPhrases.map(mapDbToPhrase));
          } else {
            // Seed initial phrases if DB is empty
            const seedPhrases = initialPhrases.map((p) => ({
              id: p.id,
              category: p.category,
              english: p.english,
              thai_meaning: p.thaiMeaning,
              thai_phonetic: p.thaiPhonetic || '',
              context: p.context || '',
              audio_text: p.audioText || p.english
            }));
            await supabase.from('phrases').insert(seedPhrases);
          }
        }

        if (isMounted) setIsConnected(true);
      } catch (err) {
        console.error('Supabase load error:', err);
      } finally {
        if (isMounted) setIsSyncing(false);
      }
    }

    loadData();

    // Subscribe to Realtime Postgres Changes
    const vocabChannel = supabase
      .channel('realtime-vocab-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'vocabulary' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newCard = mapDbToVocab(payload.new);
            setVocabulary((prev) => [newCard, ...prev.filter((c) => c.id !== newCard.id)]);
          } else if (payload.eventType === 'UPDATE') {
            const updated = mapDbToVocab(payload.new);
            setVocabulary((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
          } else if (payload.eventType === 'DELETE') {
            const deletedId = payload.old.id;
            setVocabulary((prev) => prev.filter((c) => c.id !== deletedId));
          }
        }
      )
      .subscribe();

    const phraseChannel = supabase
      .channel('realtime-phrase-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'phrases' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newPhrase = mapDbToPhrase(payload.new);
            setPhrases((prev) => [newPhrase, ...prev.filter((p) => p.id !== newPhrase.id)]);
          } else if (payload.eventType === 'UPDATE') {
            const updated = mapDbToPhrase(payload.new);
            setPhrases((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
          } else if (payload.eventType === 'DELETE') {
            const deletedId = payload.old.id;
            setPhrases((prev) => prev.filter((p) => p.id !== deletedId));
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(vocabChannel);
      supabase.removeChannel(phraseChannel);
    };
  }, [initialVocabulary, initialPhrases]);

  // Mutations
  const addCard = useCallback(async (cardData: Omit<SurfVocabulary, 'id'>) => {
    const newCard: SurfVocabulary = {
      ...cardData,
      id: `surf-custom-${Date.now()}`
    };

    setVocabulary((prev) => [newCard, ...prev]);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('vocabulary').insert({
          id: newCard.id,
          category: newCard.category,
          english: newCard.english,
          thai_meaning: newCard.thaiMeaning,
          thai_phonetic: newCard.thaiPhonetic || '',
          example: newCard.example || '',
          audio_text: newCard.audioText || newCard.english,
          surf_tip: newCard.surfTip || ''
        });
      } catch (err) {
        console.error('Failed to sync insert to Supabase:', err);
      }
    }
  }, []);

  const editCard = useCallback(async (updatedCard: SurfVocabulary) => {
    setVocabulary((prev) => prev.map((c) => (c.id === updatedCard.id ? updatedCard : c)));

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('vocabulary')
          .update({
            category: updatedCard.category,
            english: updatedCard.english,
            thai_meaning: updatedCard.thaiMeaning,
            thai_phonetic: updatedCard.thaiPhonetic || '',
            example: updatedCard.example || '',
            audio_text: updatedCard.audioText || updatedCard.english,
            surf_tip: updatedCard.surfTip || ''
          })
          .eq('id', updatedCard.id);
      } catch (err) {
        console.error('Failed to sync update to Supabase:', err);
      }
    }
  }, []);

  const deleteCard = useCallback(async (id: string) => {
    setVocabulary((prev) => prev.filter((c) => c.id !== id));

    if (isSupabaseConfigured) {
      try {
        await supabase.from('vocabulary').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to sync delete to Supabase:', err);
      }
    }
  }, []);

  const addPhrase = useCallback(async (phraseData: Omit<SurfPhrase, 'id'>) => {
    const newPhrase: SurfPhrase = {
      ...phraseData,
      id: `phrase-custom-${Date.now()}`
    };

    setPhrases((prev) => [newPhrase, ...prev]);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('phrases').insert({
          id: newPhrase.id,
          category: newPhrase.category,
          english: newPhrase.english,
          thai_meaning: newPhrase.thaiMeaning,
          thai_phonetic: newPhrase.thaiPhonetic || '',
          context: newPhrase.context || '',
          audio_text: newPhrase.audioText || newPhrase.english
        });
      } catch (err) {
        console.error('Failed to sync phrase insert to Supabase:', err);
      }
    }
  }, []);

  const editPhrase = useCallback(async (updatedPhrase: SurfPhrase) => {
    setPhrases((prev) => prev.map((p) => (p.id === updatedPhrase.id ? updatedPhrase : p)));

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('phrases')
          .update({
            category: updatedPhrase.category,
            english: updatedPhrase.english,
            thai_meaning: updatedPhrase.thaiMeaning,
            thai_phonetic: updatedPhrase.thaiPhonetic || '',
            context: updatedPhrase.context || '',
            audio_text: updatedPhrase.audioText || updatedPhrase.english
          })
          .eq('id', updatedPhrase.id);
      } catch (err) {
        console.error('Failed to sync phrase update to Supabase:', err);
      }
    }
  }, []);

  const deletePhrase = useCallback(async (id: string) => {
    setPhrases((prev) => prev.filter((p) => p.id !== id));

    if (isSupabaseConfigured) {
      try {
        await supabase.from('phrases').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to sync phrase delete to Supabase:', err);
      }
    }
  }, []);

  return {
    vocabulary,
    phrases,
    isSyncing,
    isConnected,
    addCard,
    editCard,
    deleteCard,
    addPhrase,
    editPhrase,
    deletePhrase
  };
}
