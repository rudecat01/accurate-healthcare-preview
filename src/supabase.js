// Accurate Healthcare - Supabase Client & Appointment Service
import { createClient } from '@supabase/supabase-js';

// 1. Configuration Resolution
// Order: localStorage override -> import.meta.env -> default null
const STORAGE_KEY_URL = 'accurate_supabase_url';
const STORAGE_KEY_ANON = 'accurate_supabase_anon';
const STORAGE_KEY_MOCK_APPOINTMENTS = 'accurate_mock_appointments';
const STORAGE_KEY_ADMIN_SESSION = 'accurate_admin_session';

export const DEFAULT_SUPABASE_URL = 'https://esokkxwdzepdfsexebjr.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_TACvtgXAseF1RXwLRwrLRQ_eeiAPlp3';

export function getSupabaseCredentials() {
  const url = localStorage.getItem(STORAGE_KEY_URL) || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) || DEFAULT_SUPABASE_URL;
  const key = localStorage.getItem(STORAGE_KEY_ANON) || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) || DEFAULT_SUPABASE_ANON_KEY;
  return { url: url.trim(), key: key.trim() };
}

export function saveSupabaseCredentials(url, key) {
  if (url) localStorage.setItem(STORAGE_KEY_URL, url.trim());
  else localStorage.removeItem(STORAGE_KEY_URL);
  
  if (key) localStorage.setItem(STORAGE_KEY_ANON, key.trim());
  else localStorage.removeItem(STORAGE_KEY_ANON);
  
  initSupabase();
}

let supabaseInstance = null;

export function initSupabase() {
  const { url, key } = getSupabaseCredentials();
  if (url && key && url.startsWith('http')) {
    try {
      supabaseInstance = createClient(url, key);
      return supabaseInstance;
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e);
      supabaseInstance = null;
    }
  } else {
    supabaseInstance = null;
  }
  return null;
}

export function isLiveSupabaseActive() {
  const { url, key } = getSupabaseCredentials();
  return Boolean(url && key && url.startsWith('http') && supabaseInstance);
}

// Initialize on module load
initSupabase();

// ========================================================
// MOCK DATA STORE (For immediate testing before keys are entered)
// ========================================================
function getInitialMockAppointments() {
  const existing = localStorage.getItem(STORAGE_KEY_MOCK_APPOINTMENTS);
  if (existing) {
    try { return JSON.parse(existing); } catch (e) {}
  }
  const defaultList = [
    {
      id: 'mock-1',
      booking_ref: 'AH-1001',
      patient_name: 'Rajesh Sharma',
      phone: '98112 34567',
      care_mode: 'clinic',
      location: 'Shop-1, Mehrauli Underpass, NH-24 Clinic',
      condition: 'Stroke / Paralysis Rehabilitation',
      status: 'pending',
      notes: 'Right-side hemiparesis post-stroke. Prefers morning slot.',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'mock-2',
      booking_ref: 'AH-1002',
      patient_name: 'Sunita Verma',
      phone: '99998 12345',
      care_mode: 'home',
      location: 'Tower 4, Flat 602, Gaur City 1, Greater Noida West',
      condition: 'Senior Citizen Home Physiotherapy',
      status: 'confirmed',
      notes: 'Bilateral knee osteoarthritis. Home visits requested for 10 sessions.',
      created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'mock-3',
      booking_ref: 'AH-1003',
      patient_name: 'Amitabh Sengupta',
      phone: '98710 88231',
      care_mode: 'clinic',
      location: 'Shop-1, Mehrauli Underpass, NH-24 Clinic',
      condition: 'Spine, Slip Disc & Sciatica',
      status: 'completed',
      notes: 'L4-L5 disc protrusion. Completed 5 sessions of electrotherapy.',
      created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
    }
  ];
  localStorage.setItem(STORAGE_KEY_MOCK_APPOINTMENTS, JSON.stringify(defaultList));
  return defaultList;
}

// ========================================================
// APPOINTMENT SERVICE API
// ========================================================

/**
 * Create a new appointment
 */
export async function createAppointment(data) {
  const bookingRef = 'AH-' + Math.floor(1000 + Math.random() * 9000);
  const newRecord = {
    booking_ref: bookingRef,
    patient_name: data.patient_name || data.patientName || 'Anonymous',
    phone: data.phone || data.whatsapp || '',
    care_mode: data.care_mode || data.careMode || 'clinic',
    location: data.location || (data.care_mode === 'clinic' ? 'Shop-1, Mehrauli Underpass, NH-24 Clinic' : 'Home Visit'),
    condition: data.condition || 'General Consultation',
    preferred_date: data.preferred_date || new Date().toISOString().split('T')[0],
    preferred_time: data.preferred_time || 'Morning',
    status: 'pending',
    notes: data.notes || '',
    created_at: new Date().toISOString()
  };

  // 1. If Supabase is live, insert to Supabase
  if (isLiveSupabaseActive() && supabaseInstance) {
    try {
      const { data: inserted, error } = await supabaseInstance
        .from('appointments')
        .insert([newRecord])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data: inserted, bookingRef: inserted.booking_ref || bookingRef };
    } catch (err) {
      console.error('Supabase insert failed, saving to local backup:', err);
      // Fall through to mock store so the patient's appointment is NEVER lost
    }
  }

  // 2. Mock / LocalStorage fallback
  const list = getInitialMockAppointments();
  newRecord.id = 'loc-' + Date.now();
  list.unshift(newRecord);
  localStorage.setItem(STORAGE_KEY_MOCK_APPOINTMENTS, JSON.stringify(list));

  // Dispatch custom event for real-time local listeners
  window.dispatchEvent(new CustomEvent('accurate_appointment_created', { detail: newRecord }));

  return { success: true, data: newRecord, bookingRef };
}

/**
 * Fetch all appointments with optional filters
 */
export async function fetchAppointments(filters = {}) {
  if (isLiveSupabaseActive() && supabaseInstance) {
    try {
      let query = supabaseInstance
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      if (filters.care_mode && filters.care_mode !== 'all') {
        query = query.eq('care_mode', filters.care_mode);
      }
      if (filters.search) {
        query = query.or(`patient_name.ilike.%${filters.search}%,phone.ilike.%${filters.search}%,booking_ref.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local store:', err);
    }
  }

  // Mock / LocalStorage Fallback
  let list = getInitialMockAppointments();
  if (filters.status && filters.status !== 'all') {
    list = list.filter(item => item.status === filters.status);
  }
  if (filters.care_mode && filters.care_mode !== 'all') {
    list = list.filter(item => item.care_mode === filters.care_mode);
  }
  if (filters.search) {
    const s = filters.search.toLowerCase();
    list = list.filter(item => 
      (item.patient_name && item.patient_name.toLowerCase().includes(s)) ||
      (item.phone && item.phone.toLowerCase().includes(s)) ||
      (item.booking_ref && item.booking_ref.toLowerCase().includes(s))
    );
  }
  return { success: true, data: list };
}

/**
 * Update appointment status & notes
 */
export async function updateAppointmentStatus(id, status, notes = null) {
  const updates = { status, updated_at: new Date().toISOString() };
  if (notes !== null) updates.notes = notes;

  if (isLiveSupabaseActive() && supabaseInstance) {
    try {
      const { data, error } = await supabaseInstance
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Supabase update failed, applying to local store:', err);
    }
  }

  // Mock Fallback
  const list = getInitialMockAppointments();
  const idx = list.findIndex(item => item.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates };
    localStorage.setItem(STORAGE_KEY_MOCK_APPOINTMENTS, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('accurate_appointment_updated', { detail: list[idx] }));
    return { success: true, data: list[idx] };
  }
  return { success: false, error: 'Appointment not found' };
}

/**
 * Realtime Subscription
 */
export function subscribeToAppointments(callback) {
  if (isLiveSupabaseActive() && supabaseInstance) {
    try {
      const channel = supabaseInstance
        .channel('public:appointments')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, payload => {
          callback(payload);
        })
        .subscribe();

      return () => {
        supabaseInstance.removeChannel(channel);
      };
    } catch (e) {
      console.warn('Supabase realtime failed:', e);
    }
  }

  // Local storage / Window event fallback
  const handleLocal = (e) => {
    callback({ eventType: 'INSERT', new: e.detail });
  };
  const handleUpdate = (e) => {
    callback({ eventType: 'UPDATE', new: e.detail });
  };
  window.addEventListener('accurate_appointment_created', handleLocal);
  window.addEventListener('accurate_appointment_updated', handleUpdate);

  return () => {
    window.removeEventListener('accurate_appointment_created', handleLocal);
    window.removeEventListener('accurate_appointment_updated', handleUpdate);
  };
}

// ========================================================
// ADMIN AUTHENTICATION
// ========================================================

export async function loginAdmin(email, password) {
  const cleanEmail = (email || '').toLowerCase().trim();
  const cleanPass = (password || '').trim();

  if (!cleanEmail || !cleanPass) {
    return { success: false, error: 'Please enter both your staff email and password.' };
  }

  // Authenticate strictly with Supabase Auth
  if (isLiveSupabaseActive() && supabaseInstance) {
    try {
      const { data, error } = await supabaseInstance.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPass
      });
      if (error) {
        return { success: false, error: error.message || 'Invalid email or password.' };
      }
      if (data?.session) {
        localStorage.setItem(STORAGE_KEY_ADMIN_SESSION, JSON.stringify(data.session));
        return { success: true, user: data.user, session: data.session };
      }
    } catch (err) {
      return { success: false, error: err.message || 'Authentication error.' };
    }
  }

  return { 
    success: false, 
    error: 'Supabase connection is not active or authentication failed.' 
  };
}

export async function logoutAdmin() {
  if (isLiveSupabaseActive() && supabaseInstance) {
    try {
      await supabaseInstance.auth.signOut();
    } catch (e) {}
  }
  localStorage.removeItem(STORAGE_KEY_ADMIN_SESSION);
  return { success: true };
}

export async function sendPasswordResetEmail(email) {
  const cleanEmail = (email || '').toLowerCase().trim();
  if (!cleanEmail) {
    return { success: false, error: 'Please enter a valid Gmail / email address.' };
  }

  if (!isLiveSupabaseActive() || !supabaseInstance) {
    return { success: false, error: 'Supabase connection is not active. Check API settings.' };
  }

  try {
    const redirectUrl = `${window.location.origin}/admin.html`;
    const { error } = await supabaseInstance.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: redirectUrl
    });
    if (error) {
      const msg = error.message || 'Could not send reset email.';
      const isRateLimit = msg.toLowerCase().includes('rate') || error.status === 429;
      return {
        success: false,
        error: isRateLimit
          ? 'Supabase email rate limit reached (max ~2–4 emails/hour on free built-in mailer). Please wait a bit or reset the user password directly in Supabase Dashboard → Authentication → Users.'
          : msg
      };
    }
    return {
      success: true,
      email: cleanEmail,
      message: `A secure password reset link has been dispatched to ${cleanEmail}. Check your Gmail inbox and spam folder.`
    };
  } catch (err) {
    return { success: false, error: err.message || 'Network error while requesting reset link.' };
  }
}

export function onAdminAuthStateChange(callback) {
  if (!isLiveSupabaseActive() || !supabaseInstance) return () => {};
  const { data } = supabaseInstance.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  return () => data?.subscription?.unsubscribe();
}

export async function updateAdminPassword(newPassword) {
  const cleanPass = (newPassword || '').trim();
  if (cleanPass.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }
  if (!isLiveSupabaseActive() || !supabaseInstance) {
    return { success: false, error: 'Supabase connection is not active.' };
  }
  try {
    const { data, error } = await supabaseInstance.auth.updateUser({ password: cleanPass });
    if (error) {
      return { success: false, error: error.message || 'Failed to update password.' };
    }
    const { data: sessionData } = await supabaseInstance.auth.getSession();
    if (sessionData?.session) {
      localStorage.setItem(STORAGE_KEY_ADMIN_SESSION, JSON.stringify(sessionData.session));
    }
    return { success: true, user: data?.user };
  } catch (err) {
    return { success: false, error: err.message || 'Password update error.' };
  }
}

export function getAdminSession() {
  const raw = localStorage.getItem(STORAGE_KEY_ADMIN_SESSION);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}
