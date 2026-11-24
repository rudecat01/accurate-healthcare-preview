import{i as ie,g as W,a as re,l as Q,b as le,s as Y,f as de,u as ce,c as ue}from"./supabase-Dg5fMP_e.js";/* empty css              */document.addEventListener("DOMContentLoaded",()=>{const $=document.getElementById("authView"),A=document.getElementById("dashboardView"),D=document.getElementById("loginForm"),_=document.getElementById("loginEmail"),T=document.getElementById("loginPassword"),b=document.getElementById("loginError"),p=document.getElementById("loginSubmitBtn"),M=document.getElementById("quickDemoLoginBtn"),m=document.getElementById("logoutBtn"),g=document.getElementById("dbStatusBtn"),v=document.getElementById("dbStatusDot"),y=document.getElementById("dbStatusText"),l=document.getElementById("settingsModal"),P=document.getElementById("openSettingsBtn"),N=document.getElementById("closeSettingsBtn"),F=document.getElementById("settingsForm"),H=document.getElementById("settingUrl"),w=document.getElementById("settingAnonKey"),j=document.getElementById("useMockBtn"),J=document.getElementById("statTotal"),X=document.getElementById("statPending"),Z=document.getElementById("statConfirmed"),ee=document.getElementById("statHome"),k=document.getElementById("searchInput"),B=document.getElementById("careModeSelect"),V=document.querySelectorAll(".status-filter-btn"),R=document.getElementById("refreshBtn"),q=document.getElementById("refreshIcon"),z=document.getElementById("appointmentsList"),te=document.getElementById("tableCountText");let C="all",E="all",L="",a=[];I(),f();function I(){const t=ie(),e=W();t?(v.className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse",y.textContent="Supabase Cloud (Live)",g.className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition bg-emerald-950/60 text-emerald-300 border-emerald-700 hover:border-emerald-500"):e.key?(v.className="w-2 h-2 rounded-full bg-emerald-400",y.textContent="Connecting..."):(v.className="w-2 h-2 rounded-full bg-amber-400",y.textContent="Demo Mode (Paste Key)",g.className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition bg-amber-950/60 text-amber-300 border-amber-700 hover:border-amber-500")}function f(){re()?($.classList.add("hidden"),A.classList.remove("hidden"),m.classList.remove("hidden"),d(),ne()):($.classList.remove("hidden"),A.classList.add("hidden"),m.classList.add("hidden"))}D&&D.addEventListener("submit",async t=>{t.preventDefault(),b.classList.add("hidden"),p.disabled=!0,p.innerText="Signing In...";const e=await Q(_.value,T.value);p.disabled=!1,p.innerText="Sign In to Dashboard",e.success?f():(b.textContent=e.error||"Failed to authenticate.",b.classList.remove("hidden"))}),M&&M.addEventListener("click",async t=>{t.preventDefault(),_.value="admin@accuratehealthcare.co.in",T.value="accurate2026",(await Q("admin@accuratehealthcare.co.in","accurate2026")).success&&f()}),m&&m.addEventListener("click",async()=>{confirm("Are you sure you want to log out of the clinical dashboard?")&&(await le(),f())});function G(){const t=W();H.value=t.url||"https://esokkxwdzepdfsexebjr.supabase.co",w.value=t.key||"",l.classList.remove("hidden")}function x(){l.classList.add("hidden")}P&&P.addEventListener("click",G),g&&g.addEventListener("click",G),N&&N.addEventListener("click",x),l&&l.addEventListener("click",t=>{t.target===l&&x()}),F&&F.addEventListener("submit",t=>{t.preventDefault();const e=H.value.trim(),o=w.value.trim();Y(e,o),I(),x(),d(),alert("Supabase credentials saved successfully!")}),j&&j.addEventListener("click",()=>{Y("",""),w.value="",I(),x(),d(),alert("Switched to Local Demo Mode.")}),V.forEach(t=>{t.addEventListener("click",()=>{V.forEach(e=>{e.className="status-filter-btn px-2.5 py-1 rounded-lg text-slate-700 hover:text-navy-900 transition"}),t.className="status-filter-btn px-2.5 py-1 rounded-lg bg-navy-900 text-white transition",C=t.getAttribute("data-status"),c()})}),B&&B.addEventListener("change",()=>{E=B.value,c()});let U=null;k&&k.addEventListener("input",()=>{clearTimeout(U),U=setTimeout(()=>{L=k.value.trim(),c()},250)}),R&&R.addEventListener("click",()=>{q.classList.add("animate-spin"),d().finally(()=>{setTimeout(()=>q.classList.remove("animate-spin"),600)})});async function d(){const t=await de();t.success&&(a=t.data,K(a),c())}function K(t){const e=t.length,o=t.filter(n=>n.status==="pending").length,i=t.filter(n=>n.status==="confirmed").length,s=t.filter(n=>n.care_mode==="home").length;J.textContent=e,X.textContent=o,Z.textContent=i,ee.textContent=s}function c(){let t=[...a];if(C!=="all"&&(t=t.filter(e=>e.status===C)),E!=="all"&&(t=t.filter(e=>e.care_mode===E)),L){const e=L.toLowerCase();t=t.filter(o=>o.patient_name&&o.patient_name.toLowerCase().includes(e)||o.phone&&o.phone.includes(e)||o.booking_ref&&o.booking_ref.toLowerCase().includes(e)||o.condition&&o.condition.toLowerCase().includes(e))}if(te.textContent=`Showing ${t.length} consultation inquiries`,!t.length){z.innerHTML=`
        <div class="p-12 text-center text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2 text-slate-300"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          <p class="text-sm font-bold text-slate-600">No appointments found</p>
          <p class="text-xs text-slate-400 mt-1">Try resetting search filters or submit a test booking from the homepage.</p>
        </div>
      `;return}z.innerHTML=t.map(e=>{const o=e.status==="pending",i=e.status==="confirmed",s=e.status==="completed",n=e.status==="cancelled";let r="";o?r='<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-amber-100 text-amber-800 border border-amber-300"><span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Pending</span>':i?r='<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">✓ Confirmed</span>':s?r='<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-sky-100 text-sky-800 border border-sky-300">✓ Completed</span>':r='<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-slate-100 text-slate-600 border border-slate-300">✕ Cancelled</span>';const h=e.created_at?new Date(e.created_at).toLocaleString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):"Recently",u=e.care_mode==="home",oe=u?'<span class="inline-flex items-center gap-1 text-[11px] font-bold text-[#286491] bg-brand-50 px-2 py-0.5 rounded border border-brand-200">🏠 Home Physio</span>':'<span class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">🏥 Clinic Visit</span>',S=e.phone.replace(/[^0-9]/g,""),se=S.startsWith("91")?S:"91"+S,ae=encodeURIComponent(`Hello ${e.patient_name}, regarding your physiotherapy appointment at Accurate Healthcare (Ref: ${e.booking_ref}):

Your consultation for ${e.condition} (${u?"Home Physio":"NH-24 Ghaziabad Clinic"}) is confirmed with Dr. Manish Gupta & Dr. Vandana Choudhary.

Location: Ground Floor, 2C-Tower, Landcraft Golflinks Society, NH-24 Ghaziabad.
Clinic Phone: +91 99998 71475`);return`
        <div class="p-4 sm:p-5 hover:bg-slate-50/80 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4" data-id="${e.id}">
          
          <!-- Left Info Block -->
          <div class="space-y-1.5 flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-xs font-black text-navy-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md">
                ${e.booking_ref||"AH-BOOK"}
              </span>
              ${r}
              ${oe}
              <span class="text-[11px] text-slate-400 font-medium ml-auto lg:ml-0">${h}</span>
            </div>

            <div class="flex flex-wrap items-baseline gap-2 pt-0.5">
              <h4 class="text-base font-black uppercase italic text-navy-900">${e.patient_name}</h4>
              <a href="tel:${e.phone}" class="text-xs font-bold text-[#367fb5] hover:underline flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                ${e.phone}
              </a>
            </div>

            <p class="text-xs font-bold text-slate-700">
              Condition: <span class="text-[#286491]">${e.condition}</span>
            </p>

            ${u&&e.location?`
              <p class="text-xs text-slate-600 flex items-start gap-1">
                <span class="font-bold text-slate-700 shrink-0">📍 Address:</span>
                <span class="truncate">${e.location}</span>
              </p>
            `:""}

            ${e.notes?`
              <p class="text-xs text-slate-500 italic bg-amber-50/80 border border-amber-200/80 p-2 rounded-lg mt-1">
                "${e.notes}"
              </p>
            `:""}
          </div>

          <!-- Right Action Controls -->
          <div class="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            
            ${o?`
              <button data-action="confirm" data-id="${e.id}" class="action-btn px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black italic uppercase text-xs shadow-sm flex items-center gap-1 active:scale-95 transition">
                ✓ Confirm
              </button>
            `:""}

            <!-- 1-Click WhatsApp Button -->
            <a href="https://wa.me/${se}?text=${ae}" target="_blank" class="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center gap-1.5 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span>WhatsApp</span>
            </a>

            <!-- Direct Call Button -->
            <a href="tel:${e.phone}" class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold transition flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Call</span>
            </a>

            ${s?"":`
              <button data-action="complete" data-id="${e.id}" class="action-btn px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 text-xs font-bold transition" title="Mark consultation completed">
                ✓ Done
              </button>
            `}

            ${n?"":`
              <button data-action="cancel" data-id="${e.id}" class="action-btn px-2 py-1.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-700 text-xs transition" title="Cancel booking">
                ✕
              </button>
            `}

          </div>

        </div>
      `}).join(""),document.querySelectorAll(".action-btn").forEach(e=>{e.addEventListener("click",async o=>{const i=e.getAttribute("data-id"),s=e.getAttribute("data-action");let n="pending";if(s==="confirm")n="confirmed";else if(s==="complete")n="completed";else if(s==="cancel"){if(!confirm("Are you sure you want to cancel this appointment?"))return;n="cancelled"}e.disabled=!0,e.classList.add("opacity-50");const r=await ce(i,n);if(r.success){const h=a.findIndex(u=>u.id===i);h!==-1&&(a[h].status=n,K(a),c())}else alert("Failed to update appointment: "+(r.error||"Unknown error"))})})}const O=document.getElementById("exportCsvBtn");O&&O.addEventListener("click",()=>{if(!a||!a.length){alert("No appointment records available to export.");return}const t=["Booking Ref","Patient Name","Phone","Care Mode","Location","Condition","Status","Booking Date","Doctor"],e=a.map(n=>[`"${n.booking_ref||""}"`,`"${(n.patient_name||"").replace(/"/g,'""')}"`,`"${n.phone||""}"`,`"${n.care_mode==="home"?"Home Physio":"Clinic Visit"}"`,`"${(n.location||"").replace(/"/g,'""')}"`,`"${(n.condition||"").replace(/"/g,'""')}"`,`"${n.status||"pending"}"`,`"${n.created_at?new Date(n.created_at).toLocaleDateString("en-IN"):""}"`,`"${(n.assigned_doctor||"Dr. Manish Gupta & Dr. Vandana Choudhary").replace(/"/g,'""')}"`]),o="data:text/csv;charset=utf-8,\uFEFF"+[t.join(","),...e.map(n=>n.join(","))].join(`
`),i=encodeURI(o),s=document.createElement("a");s.setAttribute("href",i),s.setAttribute("download",`accurate_healthcare_appointments_${new Date().toISOString().slice(0,10)}.csv`),document.body.appendChild(s),s.click(),document.body.removeChild(s)});function ne(){ue(t=>{console.log("Realtime event received:",t);try{const e=new(window.AudioContext||window.webkitAudioContext),o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(587.33,e.currentTime),o.connect(e.destination),o.start(),o.stop(e.currentTime+.15)}catch{}d()})}});
