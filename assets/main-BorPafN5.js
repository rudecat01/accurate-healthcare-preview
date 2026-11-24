import{d as N}from"./supabase-Dg5fMP_e.js";document.addEventListener("DOMContentLoaded",()=>{window.lucide&&window.lucide.createIcons();const I=document.getElementById("mobileMenuBtn"),d=document.getElementById("mobileMenu"),M=document.getElementById("mobileMenuClose");I&&d&&(I.addEventListener("click",()=>{d.classList.remove("hidden"),document.body.classList.add("overflow-hidden")}),M&&M.addEventListener("click",()=>{d.classList.add("hidden"),document.body.classList.remove("overflow-hidden")}),d.addEventListener("click",e=>{e.target===d&&(d.classList.add("hidden"),document.body.classList.remove("overflow-hidden"))}),d.querySelectorAll("a, button").forEach(e=>{e.addEventListener("click",()=>{d.classList.add("hidden"),document.body.classList.remove("overflow-hidden")})}));const i=document.getElementById("bookingModal"),b=document.getElementById("modalContent"),T=document.querySelectorAll(".open-booking-modal"),C=document.getElementById("closeModalBtn"),q=document.querySelectorAll('input[name="modalCareType"]'),E=document.getElementById("modalLocationGroup"),h=document.getElementById("modalLocation");function S(e){E&&(e?(E.classList.remove("hidden"),h&&(h.required=!0)):(E.classList.add("hidden"),h&&(h.required=!1,h.value="")))}q.forEach(e=>{e.addEventListener("change",()=>{S(e.value==="home")})});const P=document.querySelectorAll('input[name="careType"]'),B=document.getElementById("quickLocationGroup"),y=document.getElementById("formLocation");function j(e){B&&(e?(B.classList.remove("hidden"),y&&(y.required=!0)):(B.classList.add("hidden"),y&&(y.required=!1,y.value="")))}P.forEach(e=>{e.addEventListener("change",()=>{j(e.value==="Home Visit")})});function R(e="clinic",t=""){if(!i)return;const n=document.getElementById("floatingNavbar");n&&(n.style.display="none");const s=document.getElementById("mobileStickyBar");s&&(s.style.display="none"),document.body.classList.add("overflow-hidden"),i.classList.remove("opacity-0","pointer-events-none"),i.classList.add("opacity-100","pointer-events-auto"),b&&(b.classList.remove("scale-95"),b.classList.add("scale-100")),q.forEach(a=>{a.value===e&&(a.checked=!0)}),S(e==="home");const o=document.getElementById("modalCondition");o&&t&&(o.value=t)}function w(){if(!i)return;i.classList.remove("opacity-100","pointer-events-auto"),i.classList.add("opacity-0","pointer-events-none"),b&&(b.classList.remove("scale-100"),b.classList.add("scale-95")),document.body.classList.remove("overflow-hidden");const e=document.getElementById("floatingNavbar");e&&(e.style.display="");const t=document.getElementById("mobileStickyBar");t&&(t.style.display="")}T.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const n=e.getAttribute("data-type")||"clinic",s=e.getAttribute("data-condition")||"";R(n,s)})}),C&&C.addEventListener("click",w),i&&i.addEventListener("click",e=>{e.target===i&&w()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&i&&!i.classList.contains("pointer-events-none")&&w()});function A(e){var a;let t=document.getElementById("bookingSuccessPopup");t||(t=document.createElement("div"),t.id="bookingSuccessPopup",t.className="fixed inset-0 z-[9999999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300",document.body.appendChild(t));const n=e.care_mode==="home",s="919999871475",o=encodeURIComponent(`Hello Dr. Manish Gupta, I have a query regarding my Accurate Healthcare booking:

📋 *Booking Reference:* ${e.booking_ref}
👤 *Patient:* ${e.patient_name}
📞 *Phone:* ${e.phone}
🏥 *Care Mode:* ${n?"Home Physio Visit":"NH-24 Clinic Consultation"}
`+(n&&e.location?`📍 *Location:* ${e.location}
`:"")+`🩺 *Condition:* ${e.condition}

Kindly assist me with my queries.`);t.innerHTML=`
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
            <span class="font-mono text-sm font-black text-[#367fb5] bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-lg">${e.booking_ref}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500 font-bold">Patient Name:</span>
            <span class="font-bold text-slate-800">${e.patient_name}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500 font-bold">Care Mode:</span>
            <span class="font-bold text-slate-800">${n?"Home Physio Care":"NH-24 Clinic Consultation"}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500 font-bold">Chief Problem:</span>
            <span class="font-bold text-slate-800 truncate max-w-[200px]">${e.condition}</span>
          </div>
        </div>

        <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 mb-5 text-emerald-900 text-xs font-bold flex items-center gap-2.5 text-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span class="leading-snug">You will be notified on WhatsApp when your booking is confirmed.</span>
        </div>

        <div class="space-y-2.5">
          <a href="https://wa.me/${s}?text=${o}" target="_blank" class="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black italic uppercase text-xs sm:text-sm shadow-[3px_3px_0px_#0e1d3e] flex items-center justify-center gap-2 transition active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            <span>Contact on WhatsApp for More Queries</span>
          </a>

          <button id="closeSuccessPopupBtn" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black italic uppercase text-xs border border-slate-300 transition">
            Done / Return to Site
          </button>
        </div>
      </div>
    `,t.classList.remove("hidden"),(a=document.getElementById("closeSuccessPopupBtn"))==null||a.addEventListener("click",()=>{t.classList.add("hidden")})}const L=document.getElementById("quickBookingForm");L&&L.addEventListener("submit",async e=>{var p,m,f,v,u,g;e.preventDefault();const t=L.querySelector('button[type="submit"]'),n=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<span class="inline-block animate-spin mr-2">⏳</span> Registering Appointment...');const s=((p=document.getElementById("formName"))==null?void 0:p.value)||"Patient",o=((m=document.getElementById("formPhone"))==null?void 0:m.value)||"",a=((f=document.querySelector('input[name="careType"]:checked'))==null?void 0:f.value)==="Home Visit"?"home":"clinic",l=((v=document.getElementById("formLocation"))==null?void 0:v.value)||"",c=((u=document.getElementById("formCondition"))==null?void 0:u.value)||"General Consultation",r=((g=document.getElementById("formNotes"))==null?void 0:g.value)||"",x=await N({patient_name:s,phone:o,care_mode:a,location:l,condition:c,notes:r});t&&(t.disabled=!1,t.innerHTML=n),L.reset(),A(x.data)});const k=document.getElementById("modalBookingForm");k&&k.addEventListener("submit",async e=>{var p,m,f,v,u,g;e.preventDefault();const t=k.querySelector('button[type="submit"]'),n=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<span class="inline-block animate-spin mr-2">⏳</span> Registering...');const s=((p=document.getElementById("modalName"))==null?void 0:p.value)||"Patient",o=((m=document.getElementById("modalPhone"))==null?void 0:m.value)||"",a=((f=document.querySelector('input[name="modalCareType"]:checked'))==null?void 0:f.value)==="home"?"home":"clinic",l=((v=document.getElementById("modalLocation"))==null?void 0:v.value)||"",c=((u=document.getElementById("modalCondition"))==null?void 0:u.value)||"General Consultation",r=((g=document.getElementById("modalNotes"))==null?void 0:g.value)||"",x=await N({patient_name:s,phone:o,care_mode:a,location:l,condition:c,notes:r});t&&(t.disabled=!1,t.innerHTML=n),w(),k.reset(),A(x.data)}),document.addEventListener("keydown",e=>{if(e.ctrlKey&&e.altKey&&e.key.toLowerCase()==="b"){const t=JSON.parse(localStorage.getItem("accurate_bookings")||"[]");alert(`Stored Appointment Inquiries (${t.length} total):

`+(t.length?t.map(n=>`${n.submittedAt} | ${n.name} (${n.phone}) - ${n.condition} [${n.careType}]`).join(`
`):"No bookings stored yet. Submit the form to see leads!"))}});const $=document.querySelectorAll(".reveal-blur-up, .reveal-blur-left, .reveal-blur-right, .reveal-blur-zoom");if("IntersectionObserver"in window){const e=new IntersectionObserver((t,n)=>{t.forEach(s=>{s.isIntersecting&&(s.target.classList.add("revealed"),n.unobserve(s.target))})},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});$.forEach(t=>e.observe(t))}else $.forEach(e=>e.classList.add("revealed"));const _=document.querySelectorAll("[data-counter-target]");if("IntersectionObserver"in window&&_.length>0){const e=new IntersectionObserver((t,n)=>{t.forEach(s=>{if(s.isIntersecting){let m=function(f){const v=f-p,u=Math.min(v/x,1),g=1-Math.pow(1-u,3),H=a*g;r>0?o.textContent=c+H.toFixed(r)+l:o.textContent=c+Math.floor(H).toLocaleString("en-IN")+l,u<1?requestAnimationFrame(m):r>0?o.textContent=c+a.toFixed(r)+l:o.textContent=c+a.toLocaleString("en-IN")+l};const o=s.target,a=parseFloat(o.getAttribute("data-counter-target")||"0"),l=o.getAttribute("data-counter-suffix")||"",c=o.getAttribute("data-counter-prefix")||"",r=parseInt(o.getAttribute("data-counter-decimals")||"0"),x=1600,p=performance.now();requestAnimationFrame(m),n.unobserve(o)}})},{threshold:.2});_.forEach(t=>e.observe(t))}});
