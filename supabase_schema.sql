-- ========================================================
-- ACCURATE HEALTHCARE - SUPABASE BACKEND SCHEMA
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

-- 2. Index for high performance querying
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

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 5. Security Policies:
-- (a) Anyone can submit/create an appointment (Public Patient Booking)
DROP POLICY IF EXISTS "Public can create appointments" ON public.appointments;
CREATE POLICY "Public can create appointments" 
ON public.appointments 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- (b) Authenticated users (Clinic Admin / Doctors) have full access to view, edit, confirm appointments
DROP POLICY IF EXISTS "Admins have full access" ON public.appointments;
CREATE POLICY "Admins have full access" 
ON public.appointments 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- (c) Enable Realtime for live updates on the Admin Dashboard
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
