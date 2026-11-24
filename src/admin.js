// Accurate Healthcare - Admin Portal Controller
import { 
  loginAdmin, 
  logoutAdmin, 
  sendPasswordResetEmail,
  getAdminSession, 
  fetchAppointments, 
  updateAppointmentStatus, 
  subscribeToAppointments,
  getSupabaseCredentials,
  saveSupabaseCredentials,
  isLiveSupabaseActive
} from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const authView = document.getElementById('authView');
  const dashboardView = document.getElementById('dashboardView');
  const loginForm = document.getElementById('loginForm');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const loginError = document.getElementById('loginError');
  const loginSubmitBtn = document.getElementById('loginSubmitBtn');
  const quickDemoLoginBtn = document.getElementById('quickDemoLoginBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  const dbStatusBtn = document.getElementById('dbStatusBtn');
  const dbStatusDot = document.getElementById('dbStatusDot');
  const dbStatusText = document.getElementById('dbStatusText');

  const settingsModal = document.getElementById('settingsModal');
  const openSettingsBtn = document.getElementById('openSettingsBtn');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  const settingsForm = document.getElementById('settingsForm');
  const settingUrl = document.getElementById('settingUrl');
  const settingAnonKey = document.getElementById('settingAnonKey');
  const useMockBtn = document.getElementById('useMockBtn');

  const statTotal = document.getElementById('statTotal');
  const statPending = document.getElementById('statPending');
  const statConfirmed = document.getElementById('statConfirmed');
  const statHome = document.getElementById('statHome');

  const searchInput = document.getElementById('searchInput');
  const careModeSelect = document.getElementById('careModeSelect');
  const statusFilterBtns = document.querySelectorAll('.status-filter-btn');
  const refreshBtn = document.getElementById('refreshBtn');
  const refreshIcon = document.getElementById('refreshIcon');
  const appointmentsList = document.getElementById('appointmentsList');
  const tableCountText = document.getElementById('tableCountText');

  let currentStatusFilter = 'all';
  let currentCareMode = 'all';
  let searchQuery = '';
  let appointmentsCache = [];

  // --- Initialize UI State ---
  updateConnectionBadge();
  checkAuth();

  // --- Connection Status Badge ---
  function updateConnectionBadge() {
    const isLive = isLiveSupabaseActive();
    const creds = getSupabaseCredentials();

    if (isLive) {
      dbStatusDot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
      dbStatusText.textContent = 'Supabase Cloud (Live)';
      dbStatusBtn.className = 'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition bg-emerald-950/60 text-emerald-300 border-emerald-700 hover:border-emerald-500';
    } else if (creds.key) {
      dbStatusDot.className = 'w-2 h-2 rounded-full bg-emerald-400';
      dbStatusText.textContent = 'Connecting...';
    } else {
      dbStatusDot.className = 'w-2 h-2 rounded-full bg-amber-400';
      dbStatusText.textContent = 'Demo Mode (Paste Key)';
      dbStatusBtn.className = 'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition bg-amber-950/60 text-amber-300 border-amber-700 hover:border-amber-500';
    }
  }

  // --- Auth Check ---
  function checkAuth() {
    const session = getAdminSession();
    if (session) {
      authView.classList.add('hidden');
      dashboardView.classList.remove('hidden');
      logoutBtn.classList.remove('hidden');
      loadAppointments();
      startRealtime();
    } else {
      authView.classList.remove('hidden');
      dashboardView.classList.add('hidden');
      logoutBtn.classList.add('hidden');
    }
  }

  // --- Login Handler ---
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      loginError.classList.add('hidden');
      loginSubmitBtn.disabled = true;
      loginSubmitBtn.innerText = 'Signing In...';

      const res = await loginAdmin(loginEmail.value, loginPassword.value);
      loginSubmitBtn.disabled = false;
      loginSubmitBtn.innerText = 'Sign In to Dashboard';

      if (res.success) {
        checkAuth();
      } else {
        loginError.textContent = res.error || 'Failed to authenticate.';
        loginError.classList.remove('hidden');
      }
    });
  }

  // Quick Demo Login Button (Guaranteed 1-Click Access)
  if (quickDemoLoginBtn) {
    quickDemoLoginBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      loginEmail.value = 'admin@accuratehealthcare.co.in';
      loginPassword.value = 'accurate2026';
      const res = await loginAdmin('admin@accuratehealthcare.co.in', 'accurate2026');
      if (res.success) {
        checkAuth();
      }
    });
  }

  // Logout Handler
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (confirm('Are you sure you want to log out of the clinical dashboard?')) {
        await logoutAdmin();
        checkAuth();
      }
    });
  }

  // --- Password Reset via Gmail Handlers ---
  const resetPasswordModal = document.getElementById('resetPasswordModal');
  const openResetModalBtn = document.getElementById('openResetModalBtn');
  const closeResetModalBtn = document.getElementById('closeResetModalBtn');
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  const resetEmailInput = document.getElementById('resetEmail');
  const resetFeedback = document.getElementById('resetFeedback');
  const sendResetBtn = document.getElementById('sendResetBtn');

  if (openResetModalBtn) {
    openResetModalBtn.addEventListener('click', () => {
      if (resetPasswordModal) {
        if (resetEmailInput && loginEmail.value) {
          resetEmailInput.value = loginEmail.value.includes('@') ? loginEmail.value : '';
        }
        resetFeedback.classList.add('hidden');
        resetFeedback.innerHTML = '';
        resetPasswordModal.classList.remove('hidden');
      }
    });
  }

  if (closeResetModalBtn) {
    closeResetModalBtn.addEventListener('click', () => {
      resetPasswordModal?.classList.add('hidden');
    });
  }

  if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = resetEmailInput.value.trim();
      if (!email) return;

      sendResetBtn.disabled = true;
      sendResetBtn.innerHTML = '<span class="inline-block animate-spin mr-1">⏳</span> Sending...';

      const res = await sendPasswordResetEmail(email);

      sendResetBtn.disabled = false;
      sendResetBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        <span>Send Reset Link to Gmail</span>
      `;

      if (res.success) {
        resetFeedback.className = 'p-3 rounded-xl text-xs font-bold leading-relaxed bg-emerald-50 border border-emerald-200 text-emerald-800';
        resetFeedback.innerHTML = `
          <div class="flex items-center gap-2 mb-1.5 text-emerald-900 font-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <span>Reset Link Dispatched!</span>
          </div>
          <span>A secure reset link has been dispatched to <b>${email}</b>. Please check your Gmail inbox and Spam folder.</span>
          <a href="https://mail.google.com" target="_blank" class="mt-3.5 inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black uppercase text-[11px] shadow-[2px_2px_0px_#0e1d3e] transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span>Open Gmail Inbox</span>
          </a>
        `;
        resetFeedback.classList.remove('hidden');
      } else {
        resetFeedback.className = 'p-3 rounded-xl text-xs font-bold leading-relaxed bg-rose-50 border border-rose-200 text-rose-800';
        resetFeedback.textContent = res.error || 'Failed to send reset link.';
        resetFeedback.classList.remove('hidden');
      }
    });
  }

  // --- Settings Modal ---
  function openSettings() {
    const creds = getSupabaseCredentials();
    settingUrl.value = creds.url || 'https://esokkxwdzepdfsexebjr.supabase.co';
    settingAnonKey.value = creds.key || '';
    settingsModal.classList.remove('hidden');
  }

  function closeSettings() {
    settingsModal.classList.add('hidden');
  }

  if (openSettingsBtn) openSettingsBtn.addEventListener('click', openSettings);
  if (dbStatusBtn) dbStatusBtn.addEventListener('click', openSettings);
  if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettings);

  if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) closeSettings();
    });
  }

  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = settingUrl.value.trim();
      const key = settingAnonKey.value.trim();
      saveSupabaseCredentials(url, key);
      updateConnectionBadge();
      closeSettings();
      loadAppointments();
      alert('Supabase credentials saved successfully!');
    });
  }

  if (useMockBtn) {
    useMockBtn.addEventListener('click', () => {
      saveSupabaseCredentials('', '');
      settingAnonKey.value = '';
      updateConnectionBadge();
      closeSettings();
      loadAppointments();
      alert('Switched to Local Demo Mode.');
    });
  }

  // --- Filter and Search Handlers ---
  statusFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      statusFilterBtns.forEach(b => {
        b.className = 'status-filter-btn px-2.5 py-1 rounded-lg text-slate-700 hover:text-navy-900 transition';
      });
      btn.className = 'status-filter-btn px-2.5 py-1 rounded-lg bg-navy-900 text-white transition';
      currentStatusFilter = btn.getAttribute('data-status');
      renderFilteredAppointments();
    });
  });

  if (careModeSelect) {
    careModeSelect.addEventListener('change', () => {
      currentCareMode = careModeSelect.value;
      renderFilteredAppointments();
    });
  }

  let searchTimeout = null;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchQuery = searchInput.value.trim();
        renderFilteredAppointments();
      }, 250);
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshIcon.classList.add('animate-spin');
      loadAppointments().finally(() => {
        setTimeout(() => refreshIcon.classList.remove('animate-spin'), 600);
      });
    });
  }

  // --- Load Appointments ---
  async function loadAppointments() {
    const res = await fetchAppointments();
    if (res.success) {
      appointmentsCache = res.data;
      updateKpis(appointmentsCache);
      renderFilteredAppointments();
    }
  }

  function updateKpis(list) {
    const total = list.length;
    const pending = list.filter(a => a.status === 'pending').length;
    const confirmed = list.filter(a => a.status === 'confirmed').length;
    const home = list.filter(a => a.care_mode === 'home').length;

    statTotal.textContent = total;
    statPending.textContent = pending;
    statConfirmed.textContent = confirmed;
    statHome.textContent = home;
  }

  function renderFilteredAppointments() {
    let list = [...appointmentsCache];

    if (currentStatusFilter !== 'all') {
      list = list.filter(a => a.status === currentStatusFilter);
    }
    if (currentCareMode !== 'all') {
      list = list.filter(a => a.care_mode === currentCareMode);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a => 
        (a.patient_name && a.patient_name.toLowerCase().includes(q)) ||
        (a.phone && a.phone.includes(q)) ||
        (a.booking_ref && a.booking_ref.toLowerCase().includes(q)) ||
        (a.condition && a.condition.toLowerCase().includes(q))
      );
    }

    tableCountText.textContent = `Showing ${list.length} consultation inquiries`;

    if (!list.length) {
      appointmentsList.innerHTML = `
        <div class="p-12 text-center text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2 text-slate-300"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          <p class="text-sm font-bold text-slate-600">No appointments found</p>
          <p class="text-xs text-slate-400 mt-1">Try resetting search filters or submit a test booking from the homepage.</p>
        </div>
      `;
      return;
    }

    appointmentsList.innerHTML = list.map(item => {
      const isPending = item.status === 'pending';
      const isConfirmed = item.status === 'confirmed';
      const isCompleted = item.status === 'completed';
      const isCancelled = item.status === 'cancelled';

      let statusBadge = '';
      if (isPending) {
        statusBadge = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-amber-100 text-amber-800 border border-amber-300"><span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Pending</span>';
      } else if (isConfirmed) {
        statusBadge = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">✓ Confirmed</span>';
      } else if (isCompleted) {
        statusBadge = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-sky-100 text-sky-800 border border-sky-300">✓ Completed</span>';
      } else {
        statusBadge = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-slate-100 text-slate-600 border border-slate-300">✕ Cancelled</span>';
      }

      const dateStr = item.created_at ? new Date(item.created_at).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
      }) : 'Recently';

      const isHome = item.care_mode === 'home';
      const careBadge = isHome 
        ? '<span class="inline-flex items-center gap-1 text-[11px] font-bold text-[#286491] bg-brand-50 px-2 py-0.5 rounded border border-brand-200">🏠 Home Physio</span>'
        : '<span class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">🏥 Clinic Visit</span>';

      const cleanPhone = item.phone.replace(/[^0-9]/g, '');
      const waPhone = cleanPhone.startsWith('91') ? cleanPhone : ('91' + cleanPhone);
      const waText = encodeURIComponent(
        `Hello ${item.patient_name}, regarding your physiotherapy appointment at Accurate Healthcare (Ref: ${item.booking_ref}):\n\n` +
        `Your consultation for ${item.condition} (${isHome ? 'Home Physio' : 'NH-24 Mehrauli Clinic'}) is confirmed with Dr. Manish Gupta & Dr. Vandana Choudhary.\n\n` +
        `Location: Shop-1, Mehrauli Underpass, Near Vikranta Grand Farm House, NH-24, Mehrauli, Ghaziabad, UP\n` +
        `Google Maps: https://maps.app.goo.gl/MJFeaR4iK6EfgqxN7\n` +
        `Clinic Phone: +91 76690 32765 / 64 / 63`
      );

      return `
        <div class="p-4 sm:p-5 hover:bg-slate-50/80 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4" data-id="${item.id}">
          
          <!-- Left Info Block -->
          <div class="space-y-1.5 flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-xs font-black text-navy-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md">
                ${item.booking_ref || 'AH-BOOK'}
              </span>
              ${statusBadge}
              ${careBadge}
              <span class="text-[11px] text-slate-400 font-medium ml-auto lg:ml-0">${dateStr}</span>
            </div>

            <div class="flex flex-wrap items-baseline gap-2 pt-0.5">
              <h4 class="text-base font-black uppercase italic text-navy-900">${item.patient_name}</h4>
              <a href="tel:${item.phone}" class="text-xs font-bold text-[#367fb5] hover:underline flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                ${item.phone}
              </a>
            </div>

            <p class="text-xs font-bold text-slate-700">
              Condition: <span class="text-[#286491]">${item.condition}</span>
            </p>

            ${isHome && item.location ? `
              <p class="text-xs text-slate-600 flex items-start gap-1">
                <span class="font-bold text-slate-700 shrink-0">📍 Address:</span>
                <span class="truncate">${item.location}</span>
              </p>
            ` : ''}

            ${item.notes ? `
              <p class="text-xs text-slate-500 italic bg-amber-50/80 border border-amber-200/80 p-2 rounded-lg mt-1">
                "${item.notes}"
              </p>
            ` : ''}
          </div>

          <!-- Right Action Controls -->
          <div class="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            
            ${isPending ? `
              <button data-action="confirm" data-id="${item.id}" class="action-btn px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black italic uppercase text-xs shadow-sm flex items-center gap-1 active:scale-95 transition">
                ✓ Confirm
              </button>
            ` : ''}

            <!-- 1-Click WhatsApp Button -->
            <a href="https://wa.me/${waPhone}?text=${waText}" target="_blank" class="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center gap-1.5 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span>WhatsApp</span>
            </a>

            <!-- Direct Call Button -->
            <a href="tel:${item.phone}" class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold transition flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Call</span>
            </a>

            ${!isCompleted ? `
              <button data-action="complete" data-id="${item.id}" class="action-btn px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 text-xs font-bold transition" title="Mark consultation completed">
                ✓ Done
              </button>
            ` : ''}

            ${!isCancelled ? `
              <button data-action="cancel" data-id="${item.id}" class="action-btn px-2 py-1.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-700 text-xs transition" title="Cancel booking">
                ✕
              </button>
            ` : ''}

          </div>

        </div>
      `;
    }).join('');

    // Attach Action Listeners
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = btn.getAttribute('data-id');
        const action = btn.getAttribute('data-action');
        
        let targetStatus = 'pending';
        if (action === 'confirm') targetStatus = 'confirmed';
        else if (action === 'complete') targetStatus = 'completed';
        else if (action === 'cancel') {
          if (!confirm('Are you sure you want to cancel this appointment?')) return;
          targetStatus = 'cancelled';
        }

        btn.disabled = true;
        btn.classList.add('opacity-50');

        const res = await updateAppointmentStatus(id, targetStatus);
        if (res.success) {
          // Update in local cache
          const idx = appointmentsCache.findIndex(a => a.id === id);
          if (idx !== -1) {
            appointmentsCache[idx].status = targetStatus;
            updateKpis(appointmentsCache);
            renderFilteredAppointments();
          }
        } else {
          alert('Failed to update appointment: ' + (res.error || 'Unknown error'));
        }
      });
    });
  }

  // --- CSV Export Handler ---
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      if (!appointmentsCache || !appointmentsCache.length) {
        alert('No appointment records available to export.');
        return;
      }
      const headers = ['Booking Ref', 'Patient Name', 'Phone', 'Care Mode', 'Location', 'Condition', 'Status', 'Booking Date', 'Doctor'];
      const rows = appointmentsCache.map(a => [
        `"${a.booking_ref || ''}"`,
        `"${(a.patient_name || '').replace(/"/g, '""')}"`,
        `"${a.phone || ''}"`,
        `"${a.care_mode === 'home' ? 'Home Physio' : 'Clinic Visit'}"`,
        `"${(a.location || '').replace(/"/g, '""')}"`,
        `"${(a.condition || '').replace(/"/g, '""')}"`,
        `"${a.status || 'pending'}"`,
        `"${a.created_at ? new Date(a.created_at).toLocaleDateString('en-IN') : ''}"`,
        `"${(a.assigned_doctor || 'Dr. Manish Gupta & Dr. Vandana Choudhary').replace(/"/g, '""')}"`
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `accurate_healthcare_appointments_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // --- Realtime Updates ---
  function startRealtime() {
    subscribeToAppointments(payload => {
      console.log('Realtime event received:', payload);
      // Play subtle notification tone if available
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } catch (e) {}

      loadAppointments();
    });
  }

});
