import{d as H}from"./supabase-Dg5fMP_e.js";document.addEventListener("DOMContentLoaded",()=>{window.lucide&&window.lucide.createIcons();const I=document.getElementById("mobileMenuBtn"),l=document.getElementById("mobileMenu"),M=document.getElementById("mobileMenuClose");I&&l&&(I.addEventListener("click",()=>{l.classList.remove("hidden"),document.body.classList.add("overflow-hidden")}),M&&M.addEventListener("click",()=>{l.classList.add("hidden"),document.body.classList.remove("overflow-hidden")}),l.addEventListener("click",e=>{e.target===l&&(l.classList.add("hidden"),document.body.classList.remove("overflow-hidden"))}),l.querySelectorAll("a, button").forEach(e=>{e.addEventListener("click",()=>{l.classList.add("hidden"),document.body.classList.remove("overflow-hidden")})}));const i=document.getElementById("bookingModal"),g=document.getElementById("modalContent"),T=document.querySelectorAll(".open-booking-modal"),C=document.getElementById("closeModalBtn"),S=document.querySelectorAll('input[name="modalCareType"]'),k=document.getElementById("modalLocationGroup"),y=document.getElementById("modalLocation");function q(e){k&&(e?(k.classList.remove("hidden"),y&&(y.required=!0)):(k.classList.add("hidden"),y&&(y.required=!1,y.value="")))}S.forEach(e=>{e.addEventListener("change",()=>{q(e.value==="home")})});const P=document.querySelectorAll('input[name="careType"]'),B=document.getElementById("quickLocationGroup"),h=document.getElementById("formLocation");function R(e){B&&(e?(B.classList.remove("hidden"),h&&(h.required=!0)):(B.classList.add("hidden"),h&&(h.required=!1,h.value="")))}P.forEach(e=>{e.addEventListener("change",()=>{R(e.value==="Home Visit")})});function j(e="clinic",t=""){if(!i)return;const n=document.getElementById("floatingNavbar");n&&(n.style.display="none");const a=document.getElementById("mobileStickyBar");a&&(a.style.display="none"),document.body.classList.add("overflow-hidden"),i.classList.remove("opacity-0","pointer-events-none"),i.classList.add("opacity-100","pointer-events-auto"),g&&(g.classList.remove("scale-95"),g.classList.add("scale-100")),S.forEach(s=>{s.value===e&&(s.checked=!0)}),q(e==="home");const o=document.getElementById("modalCondition");o&&t&&(o.value=t)}function L(){if(!i)return;i.classList.remove("opacity-100","pointer-events-auto"),i.classList.add("opacity-0","pointer-events-none"),g&&(g.classList.remove("scale-100"),g.classList.add("scale-95")),document.body.classList.remove("overflow-hidden");const e=document.getElementById("floatingNavbar");e&&(e.style.display="");const t=document.getElementById("mobileStickyBar");t&&(t.style.display="")}T.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const n=e.getAttribute("data-type")||"clinic",a=e.getAttribute("data-condition")||"";j(n,a)})}),C&&C.addEventListener("click",L),i&&i.addEventListener("click",e=>{e.target===i&&L()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&i&&!i.classList.contains("pointer-events-none")&&L()});function A(e){var s;let t=document.getElementById("bookingSuccessPopup");t||(t=document.createElement("div"),t.id="bookingSuccessPopup",t.className="fixed inset-0 z-[9999999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300",document.body.appendChild(t));const n=e.care_mode==="home",a="919999871475",o=encodeURIComponent(`Hello Dr. Manish Gupta, I have registered an appointment on the Accurate Healthcare portal.

📋 *Booking Reference:* ${e.booking_ref}
👤 *Patient:* ${e.patient_name}
📞 *Phone:* ${e.phone}
🏥 *Care Mode:* ${n?"Home Physio Visit":"NH-24 Clinic Consultation"}
`+(n&&e.location?`📍 *Location:* ${e.location}
`:"")+`🩺 *Condition:* ${e.condition}

Kindly confirm my consultation slot.`);t.innerHTML=`
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

        <p class="text-[11px] text-slate-500 mb-5 leading-relaxed">
          Dr. Manish Gupta & Dr. Vandana Choudhary's team will review your slot. You can also send this reference via WhatsApp for instant confirmation.
        </p>

        <div class="space-y-2.5">
          <a href="https://wa.me/${a}?text=${o}" target="_blank" class="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black italic uppercase text-xs sm:text-sm shadow-[3px_3px_0px_#0e1d3e] flex items-center justify-center gap-2 transition active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            <span>Notify on WhatsApp (+91 99998 71475)</span>
          </a>

          <button id="closeSuccessPopupBtn" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black italic uppercase text-xs border border-slate-300 transition">
            Done / Return to Site
          </button>
        </div>
      </div>
    `,t.classList.remove("hidden"),(s=document.getElementById("closeSuccessPopupBtn"))==null||s.addEventListener("click",()=>{t.classList.add("hidden")})}const w=document.getElementById("quickBookingForm");w&&w.addEventListener("submit",async e=>{var p,m,f,v,u,b;e.preventDefault();const t=w.querySelector('button[type="submit"]'),n=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<span class="inline-block animate-spin mr-2">⏳</span> Registering Appointment...');const a=((p=document.getElementById("formName"))==null?void 0:p.value)||"Patient",o=((m=document.getElementById("formPhone"))==null?void 0:m.value)||"",s=((f=document.querySelector('input[name="careType"]:checked'))==null?void 0:f.value)==="Home Visit"?"home":"clinic",c=((v=document.getElementById("formLocation"))==null?void 0:v.value)||"",d=((u=document.getElementById("formCondition"))==null?void 0:u.value)||"General Consultation",r=((b=document.getElementById("formNotes"))==null?void 0:b.value)||"",x=await H({patient_name:a,phone:o,care_mode:s,location:c,condition:d,notes:r});t&&(t.disabled=!1,t.innerHTML=n),w.reset(),A(x.data)});const E=document.getElementById("modalBookingForm");E&&E.addEventListener("submit",async e=>{var p,m,f,v,u,b;e.preventDefault();const t=E.querySelector('button[type="submit"]'),n=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<span class="inline-block animate-spin mr-2">⏳</span> Registering...');const a=((p=document.getElementById("modalName"))==null?void 0:p.value)||"Patient",o=((m=document.getElementById("modalPhone"))==null?void 0:m.value)||"",s=((f=document.querySelector('input[name="modalCareType"]:checked'))==null?void 0:f.value)==="home"?"home":"clinic",c=((v=document.getElementById("modalLocation"))==null?void 0:v.value)||"",d=((u=document.getElementById("modalCondition"))==null?void 0:u.value)||"General Consultation",r=((b=document.getElementById("modalNotes"))==null?void 0:b.value)||"",x=await H({patient_name:a,phone:o,care_mode:s,location:c,condition:d,notes:r});t&&(t.disabled=!1,t.innerHTML=n),L(),E.reset(),A(x.data)}),document.addEventListener("keydown",e=>{if(e.ctrlKey&&e.altKey&&e.key.toLowerCase()==="b"){const t=JSON.parse(localStorage.getItem("accurate_bookings")||"[]");alert(`Stored Appointment Inquiries (${t.length} total):

`+(t.length?t.map(n=>`${n.submittedAt} | ${n.name} (${n.phone}) - ${n.condition} [${n.careType}]`).join(`
`):"No bookings stored yet. Submit the form to see leads!"))}});const $=document.querySelectorAll(".reveal-blur-up, .reveal-blur-left, .reveal-blur-right, .reveal-blur-zoom");if("IntersectionObserver"in window){const e=new IntersectionObserver((t,n)=>{t.forEach(a=>{a.isIntersecting&&(a.target.classList.add("revealed"),n.unobserve(a.target))})},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});$.forEach(t=>e.observe(t))}else $.forEach(e=>e.classList.add("revealed"));const N=document.querySelectorAll("[data-counter-target]");if("IntersectionObserver"in window&&N.length>0){const e=new IntersectionObserver((t,n)=>{t.forEach(a=>{if(a.isIntersecting){let m=function(f){const v=f-p,u=Math.min(v/x,1),b=1-Math.pow(1-u,3),_=s*b;r>0?o.textContent=d+_.toFixed(r)+c:o.textContent=d+Math.floor(_).toLocaleString("en-IN")+c,u<1?requestAnimationFrame(m):r>0?o.textContent=d+s.toFixed(r)+c:o.textContent=d+s.toLocaleString("en-IN")+c};const o=a.target,s=parseFloat(o.getAttribute("data-counter-target")||"0"),c=o.getAttribute("data-counter-suffix")||"",d=o.getAttribute("data-counter-prefix")||"",r=parseInt(o.getAttribute("data-counter-decimals")||"0"),x=1600,p=performance.now();requestAnimationFrame(m),n.unobserve(o)}})},{threshold:.2});N.forEach(t=>e.observe(t))}});
