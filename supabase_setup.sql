-- ===================================================
-- SURF FLASHCARD APP - SUPABASE REALTIME SETUP SQL
-- Copy and run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new
-- ===================================================

-- 1. Create Vocabulary Table
CREATE TABLE IF NOT EXISTS public.vocabulary (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  english TEXT NOT NULL,
  thai_meaning TEXT NOT NULL,
  thai_phonetic TEXT DEFAULT '',
  example TEXT DEFAULT '',
  audio_text TEXT DEFAULT '',
  surf_tip TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Useful Phrases Table
CREATE TABLE IF NOT EXISTS public.phrases (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  english TEXT NOT NULL,
  thai_meaning TEXT NOT NULL,
  thai_phonetic TEXT DEFAULT '',
  context TEXT DEFAULT '',
  audio_text TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS) & Allow Public Read/Write Access
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phrases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access on vocabulary" ON public.vocabulary;
CREATE POLICY "Allow public access on vocabulary"
  ON public.vocabulary FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access on phrases" ON public.phrases;
CREATE POLICY "Allow public access on phrases"
  ON public.phrases FOR ALL USING (true) WITH CHECK (true);

-- 4. Enable Supabase Realtime Replication for Both Tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.vocabulary;
ALTER PUBLICATION supabase_realtime ADD TABLE public.phrases;
