-- ========================================================
-- ACCURATE HEALTHCARE - PRODUCTION SUPABASE BACKEND SCHEMA
-- Copy and paste this directly into your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new
-- ========================================================

-- 1. Create the appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_ref TEXT NOT NULL UNIQUE,
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    care_mode TEXT NOT NULL DEFAULT 'clinic' CHECK (care_mode IN ('clinic', 'home')),
    location TEXT,
    condition TEXT NOT NULL,
    preferred_date DATE DEFAULT CURRENT_DATE,
    preferred_time TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    notes TEXT,
    assigned_doctor TEXT DEFAULT 'Dr. Manish Gupta & Dr. Vandana Choudhary',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Indexes for high performance querying
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON public.appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_phone ON public.appointments(phone);

-- 3. Automatic booking reference generator sequence (e.g. AH-1001, AH-1002...)
CREATE SEQUENCE IF NOT EXISTS booking_ref_seq START WITH 1001;

CREATE OR REPLACE FUNCTION set_booking_ref()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.booking_ref IS NULL OR NEW.booking_ref = '' THEN
        NEW.booking_ref := 'AH-' || nextval('booking_ref_seq');
    END IF;
    NEW.updated_at := timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_booking_ref ON public.appointments;
CREATE TRIGGER trigger_set_booking_ref
BEFORE INSERT OR UPDATE ON public.appointments
FOR EACH ROW EXECUTE FUNCTION set_booking_ref();

-- 4. Enable Row Level Security (RLS) - Medical Data Protection
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Revoke all direct permissions from anon, grant controlled access
REVOKE ALL ON TABLE public.appointments FROM anon;
GRANT INSERT ON TABLE public.appointments TO anon;
GRANT USAGE ON SEQUENCE booking_ref_seq TO anon;

-- Staff role permissions (authenticated Supabase users)
GRANT ALL ON TABLE public.appointments TO authenticated;
GRANT ALL ON SEQUENCE booking_ref_seq TO authenticated;

-- Service role permissions (admin backend functions)
GRANT ALL ON TABLE public.appointments TO service_role;
GRANT ALL ON SEQUENCE booking_ref_seq TO service_role;

-- 5. Strict RLS Policies

-- Policy A: Public anonymous visitors can ONLY insert new appointment bookings.
-- They CANNOT select/read existing patient data, update, or delete records.
DROP POLICY IF EXISTS "Allow public booking insert" ON public.appointments;
CREATE POLICY "Allow public booking insert" 
ON public.appointments 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Policy B: Authenticated clinic staff have full access (view, update status, add notes, delete)
DROP POLICY IF EXISTS "Allow staff full access" ON public.appointments;
CREATE POLICY "Allow staff full access" 
ON public.appointments 
FOR ALL 
TO authenticated 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- 6. Enable Realtime for live updates on the Admin Dashboard
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
