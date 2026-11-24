import{e as N}from"./supabase-B6kY-wOV.js";document.addEventListener("DOMContentLoaded",()=>{window.lucide&&window.lucide.createIcons();const C=document.getElementById("mobileMenuBtn"),l=document.getElementById("mobileMenu"),q=document.getElementById("mobileMenuClose");C&&l&&(C.addEventListener("click",()=>{l.classList.remove("hidden"),document.body.classList.add("overflow-hidden")}),q&&q.addEventListener("click",()=>{l.classList.add("hidden"),document.body.classList.remove("overflow-hidden")}),l.addEventListener("click",e=>{e.target===l&&(l.classList.add("hidden"),document.body.classList.remove("overflow-hidden"))}),l.querySelectorAll("a, button").forEach(e=>{e.addEventListener("click",()=>{l.classList.add("hidden"),document.body.classList.remove("overflow-hidden")})}));const a=document.getElementById("bookingModal"),b=document.getElementById("modalContent"),$=document.querySelectorAll(".open-booking-modal"),S=document.getElementById("closeModalBtn"),A=document.querySelectorAll('input[name="modalCareType"]'),B=document.getElementById("modalLocationGroup"),y=document.getElementById("modalLocation");function H(e){B&&(e?(B.classList.remove("hidden"),y&&(y.required=!0)):(B.classList.add("hidden"),y&&(y.required=!1,y.value="")))}A.forEach(e=>{e.addEventListener("change",()=>{H(e.value==="home")})});const O=document.querySelectorAll('input[name="careType"]'),I=document.getElementById("quickLocationGroup"),h=document.getElementById("formLocation");function R(e){I&&(e?(I.classList.remove("hidden"),h&&(h.required=!0)):(I.classList.add("hidden"),h&&(h.required=!1,h.value="")))}O.forEach(e=>{e.addEventListener("change",()=>{R(e.value==="Home Visit")})});function j(e="clinic",t=""){if(!a)return;const o=document.getElementById("floatingNavbar");o&&(o.style.display="none");const s=document.getElementById("mobileStickyBar");s&&(s.style.display="none"),document.body.classList.add("overflow-hidden"),a.classList.remove("opacity-0","pointer-events-none"),a.classList.add("opacity-100","pointer-events-auto"),b&&(b.classList.remove("scale-95"),b.classList.add("scale-100")),A.forEach(i=>{i.value===e&&(i.checked=!0)}),H(e==="home");const n=document.getElementById("modalCondition");n&&t&&(n.value=t)}function w(){if(!a)return;a.classList.remove("opacity-100","pointer-events-auto"),a.classList.add("opacity-0","pointer-events-none"),b&&(b.classList.remove("scale-100"),b.classList.add("scale-95")),document.body.classList.remove("overflow-hidden");const e=document.getElementById("floatingNavbar");e&&(e.style.display="");const t=document.getElementById("mobileStickyBar");t&&(t.style.display="")}$.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const o=e.getAttribute("data-type")||"clinic",s=e.getAttribute("data-condition")||"";j(o,s)})}),S&&S.addEventListener("click",w),a&&a.addEventListener("click",e=>{e.target===a&&w()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&a&&!a.classList.contains("pointer-events-none")&&w()});function M(e){return e==null?"":String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function T(e){var i;let t=document.getElementById("bookingSuccessPopup");t||(t=document.createElement("div"),t.id="bookingSuccessPopup",t.className="fixed inset-0 z-[9999999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300",document.body.appendChild(t));const o=e.care_mode==="home",s="919999871475",n=encodeURIComponent(`Hello Dr. Manish Gupta, I have a query regarding my Accurate Healthcare booking:

📋 *Booking Reference:* ${e.booking_ref}
👤 *Patient:* ${e.patient_name}
📞 *Phone:* ${e.phone}
🏥 *Care Mode:* ${o?"Home Physio Visit":"NH-24 Clinic Consultation"}
`+(o&&e.location?`📍 *Location:* ${e.location}
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
            <span class="font-mono text-sm font-black text-[#367fb5] bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-lg">${M(e.booking_ref)}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500 font-bold">Patient Name:</span>
            <span class="font-bold text-slate-800">${M(e.patient_name)}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500 font-bold">Care Mode:</span>
            <span class="font-bold text-slate-800">${o?"Home Physio Care":"NH-24 Clinic Consultation"}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500 font-bold">Chief Problem:</span>
            <span class="font-bold text-slate-800 truncate max-w-[200px]">${M(e.condition)}</span>
          </div>
        </div>

        <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 mb-5 text-emerald-900 text-xs font-bold flex items-center gap-2.5 text-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span class="leading-snug">You will be notified on WhatsApp when your booking is confirmed.</span>
        </div>

        <div class="space-y-2.5">
          <a href="https://wa.me/${s}?text=${n}" target="_blank" class="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black italic uppercase text-xs sm:text-sm shadow-[3px_3px_0px_#0e1d3e] flex items-center justify-center gap-2 transition active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            <span>Contact on WhatsApp for More Queries</span>
          </a>

          <button id="closeSuccessPopupBtn" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black italic uppercase text-xs border border-slate-300 transition">
            Done / Return to Site
          </button>
        </div>
      </div>
    `,t.classList.remove("hidden"),(i=document.getElementById("closeSuccessPopupBtn"))==null||i.addEventListener("click",()=>{t.classList.add("hidden")})}const k=document.getElementById("quickBookingForm");k&&k.addEventListener("submit",async e=>{var m,f,g,u,v,p;e.preventDefault();const t=k.querySelector('button[type="submit"]'),o=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<span class="inline-block animate-spin mr-2">⏳</span> Registering Appointment...');const s=((m=document.getElementById("formName"))==null?void 0:m.value.trim())||"Patient",n=((f=document.getElementById("formPhone"))==null?void 0:f.value.trim())||"";if(n.replace(/\D/g,"").length<10){alert("Please enter a valid 10-digit mobile number so our doctors can confirm your slot."),t&&(t.disabled=!1,t.innerHTML=o);return}const r=((g=document.querySelector('input[name="careType"]:checked'))==null?void 0:g.value)==="Home Visit"?"home":"clinic",d=((u=document.getElementById("formLocation"))==null?void 0:u.value)||"",c=((v=document.getElementById("formCondition"))==null?void 0:v.value)||"General Consultation",x=((p=document.getElementById("formNotes"))==null?void 0:p.value)||"",L=await N({patient_name:s,phone:n,care_mode:r,location:d,condition:c,notes:x});t&&(t.disabled=!1,t.innerHTML=o),k.reset(),T(L.data)});const E=document.getElementById("modalBookingForm");E&&E.addEventListener("submit",async e=>{var m,f,g,u,v,p;e.preventDefault();const t=E.querySelector('button[type="submit"]'),o=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<span class="inline-block animate-spin mr-2">⏳</span> Registering...');const s=((m=document.getElementById("modalName"))==null?void 0:m.value.trim())||"Patient",n=((f=document.getElementById("modalPhone"))==null?void 0:f.value.trim())||"";if(n.replace(/\D/g,"").length<10){alert("Please enter a valid 10-digit mobile number so our doctors can confirm your slot."),t&&(t.disabled=!1,t.innerHTML=o);return}const r=((g=document.querySelector('input[name="modalCareType"]:checked'))==null?void 0:g.value)==="home"?"home":"clinic",d=((u=document.getElementById("modalLocation"))==null?void 0:u.value)||"",c=((v=document.getElementById("modalCondition"))==null?void 0:v.value)||"General Consultation",x=((p=document.getElementById("modalNotes"))==null?void 0:p.value)||"",L=await N({patient_name:s,phone:n,care_mode:r,location:d,condition:c,notes:x});t&&(t.disabled=!1,t.innerHTML=o),w(),E.reset(),T(L.data)});const P=document.querySelectorAll(".reveal-blur-up, .reveal-blur-left, .reveal-blur-right, .reveal-blur-zoom");if("IntersectionObserver"in window){const e=new IntersectionObserver((t,o)=>{t.forEach(s=>{s.isIntersecting&&(s.target.classList.add("revealed"),o.unobserve(s.target))})},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});P.forEach(t=>e.observe(t))}else P.forEach(e=>e.classList.add("revealed"));const _=document.querySelectorAll("[data-counter-target]");if("IntersectionObserver"in window&&_.length>0){const e=new IntersectionObserver((t,o)=>{t.forEach(s=>{if(s.isIntersecting){let m=function(f){const g=f-L,u=Math.min(g/x,1),v=1-Math.pow(1-u,3),p=i*v;c>0?n.textContent=d+p.toFixed(c)+r:n.textContent=d+Math.floor(p).toLocaleString("en-IN")+r,u<1?requestAnimationFrame(m):c>0?n.textContent=d+i.toFixed(c)+r:n.textContent=d+i.toLocaleString("en-IN")+r};const n=s.target,i=parseFloat(n.getAttribute("data-counter-target")||"0"),r=n.getAttribute("data-counter-suffix")||"",d=n.getAttribute("data-counter-prefix")||"",c=parseInt(n.getAttribute("data-counter-decimals")||"0"),x=1600,L=performance.now();requestAnimationFrame(m),o.unobserve(n)}})},{threshold:.2});_.forEach(t=>e.observe(t))}});
