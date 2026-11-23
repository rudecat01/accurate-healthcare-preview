// Accurate Healthcare & Physiotherapy Centre - Interactive Handlers

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
      mobileMenu.classList.toggle('hidden');
    });
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    }
    // Close mobile menu on clicking any navigation link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
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
    document.body.classList.add('overflow-hidden');
    bookingModal.classList.remove('opacity-0', 'pointer-events-none');
    bookingModal.classList.add('opacity-100', 'pointer-events-auto');
    if (modalContent) {
      modalContent.classList.remove('scale-95');
      modalContent.classList.add('scale-100');
    }
    document.body.classList.add('overflow-hidden');

    // Set care type
    careTypeRadios.forEach(radio => {
      if (radio.value === defaultType) {
        radio.checked = true;
      }
    });
    updateModalCareMode(defaultType === 'home');

    // Set condition if passed
    const conditionSelect = document.getElementById('modalCondition');
    if (conditionSelect && defaultCondition) {
      conditionSelect.value = defaultCondition;
    }
  }

  function closeModal() {
    if (!bookingModal) return;
    document.body.classList.remove('overflow-hidden');
    bookingModal.classList.add('opacity-0', 'pointer-events-none');
    bookingModal.classList.remove('opacity-100', 'pointer-events-auto');
    if (modalContent) {
      modalContent.classList.add('scale-95');
      modalContent.classList.remove('scale-100');
    }
    document.body.classList.remove('overflow-hidden');
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

  // --- WhatsApp Booking Form Logic ---
  const bookingForm = document.getElementById('quickBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName')?.value || 'Patient';
      const phone = document.getElementById('formPhone')?.value || '';
      const careType = document.querySelector('input[name="careType"]:checked')?.value || 'Clinic Visit';
      const location = document.getElementById('formLocation')?.value || '';
      const condition = document.getElementById('formCondition')?.value || 'General Consultation';
      const notes = document.getElementById('formNotes')?.value || 'None';

      // Save locally
      saveBookingLead({ name, phone, careType, location, condition, notes, source: 'Quick Form' });

      const whatsappNumber = '919999871475';
      const text = encodeURIComponent(
        `*New Consultation Request - Accurate Healthcare*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `🏥 *Care Mode:* ${careType}\n` +
        (location ? `📍 *Home Location:* ${location}\n` : '') +
        `🩺 *Condition:* ${condition}\n` +
        `📝 *Additional Details:* ${notes}\n\n` +
        `Please confirm available appointment slots.`
      );

      showSuccessBanner('Consultation request saved! Opening WhatsApp to send directly to clinic...');
      setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
      }, 800);
    });
  }

  // Modal Form Submission
  const modalForm = document.getElementById('modalBookingForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName')?.value || 'Patient';
      const phone = document.getElementById('modalPhone')?.value || '';
      const careType = document.querySelector('input[name="modalCareType"]:checked')?.value === 'home' ? 'Home Visit Care' : 'Clinic Consultation';
      const location = document.getElementById('modalLocation')?.value || '';
      const condition = document.getElementById('modalCondition')?.value || 'General Consultation';
      const date = document.getElementById('modalDate')?.value || 'Earliest available';
      const message = document.getElementById('modalMessage')?.value || '';

      // Save locally
      saveBookingLead({ name, phone, careType, location, condition, date, message, source: 'Popup Modal' });

      const whatsappNumber = '919999871475';
      const text = encodeURIComponent(
        `*Appointment Booking Request - Accurate Healthcare*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `🏥 *Type:* ${careType}\n` +
        (location ? `📍 *Address / Location in NCR:* ${location}\n` : '') +
        `🩺 *Condition / Problem:* ${condition}\n` +
        `📅 *Preferred Date:* ${date}\n` +
        (message ? `📝 *Notes:* ${message}\n` : '') +
        `\nPlease let me know the doctor's availability.`
      );

      closeModal();
      showSuccessBanner('Appointment details recorded! Redirecting to WhatsApp to send directly to doctor...');
      setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
      }, 800);
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
