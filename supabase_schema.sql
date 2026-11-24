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

-- 4. Grant table & sequence access to Supabase API roles (anon, authenticated, service_role)
GRANT ALL ON TABLE public.appointments TO anon, authenticated, service_role;
GRANT ALL ON SEQUENCE booking_ref_seq TO anon, authenticated, service_role;

-- 5. Security & Access:
-- Disable RLS or enable open policies so both public booking forms (INSERT) 
-- and the doctor Admin Portal (SELECT, UPDATE, DELETE) work seamlessly with the publishable key.
ALTER TABLE public.appointments DISABLE ROW LEVEL SECURITY;

-- (Optional) If you prefer RLS enabled, uncomment below:
-- ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "Full access to appointments" ON public.appointments;
-- CREATE POLICY "Full access to appointments" ON public.appointments FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 6. Enable Realtime for live updates on the Admin Dashboard
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
