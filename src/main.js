// Accurate Healthcare & Physiotherapy Centre - Interactive Handlers
import { createAppointment } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    }
    // Close mobile menu when clicking outside drawer panel
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
    // Close mobile menu on clicking any navigation link or action button
    mobileMenu.querySelectorAll('a, button').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }

  // --- Booking Modal Handlers ---
  const bookingModal = document.getElementById('bookingModal');
  const modalContent = document.getElementById('modalContent');
  const openModalButtons = document.querySelectorAll('.open-booking-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const careTypeRadios = document.querySelectorAll('input[name="modalCareType"]');
  const modalLocationGroup = document.getElementById('modalLocationGroup');
  const modalLocationInput = document.getElementById('modalLocation');

  function updateModalCareMode(isHome) {
    if (!modalLocationGroup) return;
    if (isHome) {
      modalLocationGroup.classList.remove('hidden');
      if (modalLocationInput) {
        modalLocationInput.required = true;
      }
    } else {
      modalLocationGroup.classList.add('hidden');
      if (modalLocationInput) {
        modalLocationInput.required = false;
        modalLocationInput.value = '';
      }
    }
  }

  careTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      updateModalCareMode(radio.value === 'home');
    });
  });

  // Quick Inline Form Location toggle
  const quickCareRadios = document.querySelectorAll('input[name="careType"]');
  const quickLocationGroup = document.getElementById('quickLocationGroup');
  const quickLocationInput = document.getElementById('formLocation');

  function updateQuickCareMode(isHome) {
    if (!quickLocationGroup) return;
    if (isHome) {
      quickLocationGroup.classList.remove('hidden');
      if (quickLocationInput) quickLocationInput.required = true;
    } else {
      quickLocationGroup.classList.add('hidden');
      if (quickLocationInput) {
        quickLocationInput.required = false;
        quickLocationInput.value = '';
      }
    }
  }

  quickCareRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      updateQuickCareMode(radio.value === 'Home Visit');
    });
  });

  function openModal(defaultType = 'clinic', defaultCondition = '') {
    if (!bookingModal) return;

    // Hide floating navbar & mobile sticky bar so modal has 100% clean takeover without obscuring header/footer
    const floatingNav = document.getElementById('floatingNavbar');
    if (floatingNav) floatingNav.style.display = 'none';
    const stickyBar = document.getElementById('mobileStickyBar');
    if (stickyBar) stickyBar.style.display = 'none';

    document.body.classList.add('overflow-hidden');

    bookingModal.classList.remove('opacity-0', 'pointer-events-none');
    bookingModal.classList.add('opacity-100', 'pointer-events-auto');
    if (modalContent) {
      modalContent.classList.remove('scale-95');
      modalContent.classList.add('scale-100');
    }

    // Set care type
    careTypeRadios.forEach(radio => {
      if (radio.value === defaultType) {
        radio.checked = true;
      }
    });
    updateModalCareMode(defaultType === 'home');

    // Set condition if provided
    const modalCondition = document.getElementById('modalCondition');
    if (modalCondition && defaultCondition) {
      modalCondition.value = defaultCondition;
    }
  }

  function closeModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('opacity-100', 'pointer-events-auto');
    bookingModal.classList.add('opacity-0', 'pointer-events-none');
    if (modalContent) {
      modalContent.classList.remove('scale-100');
      modalContent.classList.add('scale-95');
    }
    document.body.classList.remove('overflow-hidden');

    // Restore floating navbar and mobile sticky bar
    const floatingNav = document.getElementById('floatingNavbar');
    if (floatingNav) floatingNav.style.display = '';
    const stickyBar = document.getElementById('mobileStickyBar');
    if (stickyBar) stickyBar.style.display = '';
  }

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-type') || 'clinic';
      const condition = btn.getAttribute('data-condition') || '';
      openModal(type, condition);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal && !bookingModal.classList.contains('pointer-events-none')) {
      closeModal();
    }
  });

  // --- Lead Storage Helper ---
  function saveBookingLead(leadData) {
    try {
      const existing = JSON.parse(localStorage.getItem('accurate_bookings') || '[]');
      existing.unshift({
        ...leadData,
        id: 'AH-' + Date.now(),
        submittedAt: new Date().toLocaleString('en-IN')
      });
      localStorage.setItem('accurate_bookings', JSON.stringify(existing));
      console.log('Saved lead to localStorage: accurate_bookings', leadData);
    } catch (err) {
      console.error('Error saving lead:', err);
    }
  }

  // --- Booking Confirmation Popup Modal ---
  function showBookingSuccessModal(booking) {
    let modal = document.getElementById('bookingSuccessPopup');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'bookingSuccessPopup';
      modal.className = 'fixed inset-0 z-[9999999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300';
      document.body.appendChild(modal);
    }

    const isHome = booking.care_mode === 'home';
    const cleanPhone = '919999871475';
    const waMessage = encodeURIComponent(
      `Hello Dr. Manish Gupta, I have a query regarding my Accurate Healthcare booking:\n\n` +
      `📋 *Booking Reference:* ${booking.booking_ref}\n` +
      `👤 *Patient:* ${booking.patient_name}\n` +
      `📞 *Phone:* ${booking.phone}\n` +
      `🏥 *Care Mode:* ${isHome ? 'Home Physio Visit' : 'NH-24 Clinic Consultation'}\n` +
      (isHome && booking.location ? `📍 *Location:* ${booking.location}\n` : '') +
      `🩺 *Condition:* ${booking.condition}\n\n` +
      `Kindly assist me with my queries.`
    );

    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border-2 border-navy-900 shadow-2xl text-center transform scale-100 transition-all">
        <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center text-emerald-600 shadow-[3px_3px_0px_#0e1d3e]">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>

        <span class="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black italic uppercase tracking-wider mb-2">
          Request Recorded in System
        </span>

        <h3 class="text-2xl font-black italic uppercase text-navy-900">Booking Confirmed!</h3>
        <p class="text-xs text-slate-500 mt-1 mb-4">Your appointment has been logged in our clinic database.</p>

        <!-- Booking Ref Badge -->
        <div class="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4 mb-4 text-left space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Booking Reference</span>
            <span class="font-mono text-sm font-black text-[#367fb5] bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-lg">${booking.booking_ref}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500 font-bold">Patient Name:</span>
            <span class="font-bold text-slate-800">${booking.patient_name}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500 font-bold">Care Mode:</span>
            <span class="font-bold text-slate-800">${isHome ? 'Home Physio Care' : 'NH-24 Clinic Consultation'}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500 font-bold">Chief Problem:</span>
            <span class="font-bold text-slate-800 truncate max-w-[200px]">${booking.condition}</span>
          </div>
        </div>

        <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 mb-5 text-emerald-900 text-xs font-bold flex items-center gap-2.5 text-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span class="leading-snug">You will be notified on WhatsApp when your booking is confirmed.</span>
        </div>

        <div class="space-y-2.5">
          <a href="https://wa.me/${cleanPhone}?text=${waMessage}" target="_blank" class="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black italic uppercase text-xs sm:text-sm shadow-[3px_3px_0px_#0e1d3e] flex items-center justify-center gap-2 transition active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            <span>Contact on WhatsApp for More Queries</span>
          </a>

          <button id="closeSuccessPopupBtn" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black italic uppercase text-xs border border-slate-300 transition">
            Done / Return to Site
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    document.getElementById('closeSuccessPopupBtn')?.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  // --- Real Booking Form Logic (Connected to Supabase) ---
  const bookingForm = document.getElementById('quickBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="inline-block animate-spin mr-2">⏳</span> Registering Appointment...';
      }

      const name = document.getElementById('formName')?.value || 'Patient';
      const phone = document.getElementById('formPhone')?.value || '';
      const careType = document.querySelector('input[name="careType"]:checked')?.value === 'Home Visit' ? 'home' : 'clinic';
      const location = document.getElementById('formLocation')?.value || '';
      const condition = document.getElementById('formCondition')?.value || 'General Consultation';
      const notes = document.getElementById('formNotes')?.value || '';

      const res = await createAppointment({
        patient_name: name,
        phone,
        care_mode: careType,
        location,
        condition,
        notes
      });

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      bookingForm.reset();
      showBookingSuccessModal(res.data);
    });
  }

  // Modal Form Submission
  const modalForm = document.getElementById('modalBookingForm');
  if (modalForm) {
    modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = modalForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="inline-block animate-spin mr-2">⏳</span> Registering...';
      }

      const name = document.getElementById('modalName')?.value || 'Patient';
      const phone = document.getElementById('modalPhone')?.value || '';
      const careType = document.querySelector('input[name="modalCareType"]:checked')?.value === 'home' ? 'home' : 'clinic';
      const location = document.getElementById('modalLocation')?.value || '';
      const condition = document.getElementById('modalCondition')?.value || 'General Consultation';
      const notes = document.getElementById('modalNotes')?.value || '';

      const res = await createAppointment({
        patient_name: name,
        phone,
        care_mode: careType,
        location,
        condition,
        notes
      });

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      closeModal();
      modalForm.reset();
      showBookingSuccessModal(res.data);
    });
  }

  // Helper notification toast
  function showSuccessBanner(msg) {
    const banner = document.createElement('div');
    banner.className = 'fixed top-5 right-5 z-[999] bg-navy-900 text-white border-2 border-gold-500 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all transform translate-y-0 text-xs sm:text-sm font-bold';
    banner.innerHTML = `<span class="w-6 h-6 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center font-black">✓</span><span>${msg}</span>`;
    document.body.appendChild(banner);
    setTimeout(() => {
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 400);
    }, 4500);
  }

  // Stored Leads Viewer (Press Ctrl+Alt+B to see all captured leads)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'b') {
      const leads = JSON.parse(localStorage.getItem('accurate_bookings') || '[]');
      alert(`Stored Appointment Inquiries (${leads.length} total):\n\n` + 
        (leads.length ? leads.map(l => `${l.submittedAt} | ${l.name} (${l.phone}) - ${l.condition} [${l.careType}]`).join('\n') : 'No bookings stored yet. Submit the form to see leads!')
      );
    }
  });

  // ================= MOBILE-FIRST SCROLL REVEAL & BLUR-APPEAR OBSERVER =================
  const revealElements = document.querySelectorAll(
    '.reveal-blur-up, .reveal-blur-left, .reveal-blur-right, .reveal-blur-zoom'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -8% 0px', // Triggers smoothly just as element enters view
      threshold: 0.08
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ================= ANIMATED NUMERIC STATS COUNTERS =================
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if ('IntersectionObserver' in window && counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-counter-target') || '0');
          const suffix = el.getAttribute('data-counter-suffix') || '';
          const prefix = el.getAttribute('data-counter-prefix') || '';
          const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0');
          const duration = 1600;
          const start = performance.now();

          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = target * ease;
            
            if (decimals > 0) {
              el.textContent = prefix + current.toFixed(decimals) + suffix;
            } else {
              el.textContent = prefix + Math.floor(current).toLocaleString('en-IN') + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              if (decimals > 0) {
                el.textContent = prefix + target.toFixed(decimals) + suffix;
              } else {
                el.textContent = prefix + target.toLocaleString('en-IN') + suffix;
              }
            }
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counterElements.forEach(el => counterObserver.observe(el));
  }
});
