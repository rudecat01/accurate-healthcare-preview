import{i as oe,g as U,a as ae,l as ie,b as le,s as W,f as re,u as de,c as ce}from"./supabase-DIHEjA5M.js";/* empty css              */document.addEventListener("DOMContentLoaded",()=>{const A=document.getElementById("authView"),$=document.getElementById("dashboardView"),T=document.getElementById("loginForm"),M=document.getElementById("loginEmail"),D=document.getElementById("loginPassword"),b=document.getElementById("loginError"),r=document.getElementById("loginSubmitBtn"),_=document.getElementById("quickDemoLoginBtn"),m=document.getElementById("logoutBtn"),g=document.getElementById("dbStatusBtn"),h=document.getElementById("dbStatusDot"),y=document.getElementById("dbStatusText"),d=document.getElementById("settingsModal"),H=document.getElementById("openSettingsBtn"),P=document.getElementById("closeSettingsBtn"),N=document.getElementById("settingsForm"),F=document.getElementById("settingUrl"),v=document.getElementById("settingAnonKey"),j=document.getElementById("useMockBtn"),Q=document.getElementById("statTotal"),Y=document.getElementById("statPending"),J=document.getElementById("statConfirmed"),X=document.getElementById("statHome"),w=document.getElementById("searchInput"),k=document.getElementById("careModeSelect"),q=document.querySelectorAll(".status-filter-btn"),V=document.getElementById("refreshBtn"),z=document.getElementById("refreshIcon"),R=document.getElementById("appointmentsList"),Z=document.getElementById("tableCountText");let B="all",C="all",E="",i=[];L(),I();function L(){const t=oe(),e=U();t?(h.className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse",y.textContent="Supabase Cloud (Live)",g.className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition bg-emerald-950/60 text-emerald-300 border-emerald-700 hover:border-emerald-500"):e.key?(h.className="w-2 h-2 rounded-full bg-emerald-400",y.textContent="Connecting..."):(h.className="w-2 h-2 rounded-full bg-amber-400",y.textContent="Demo Mode (Paste Key)",g.className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition bg-amber-950/60 text-amber-300 border-amber-700 hover:border-amber-500")}function I(){ae()?(A.classList.add("hidden"),$.classList.remove("hidden"),m.classList.remove("hidden"),c(),ee()):(A.classList.remove("hidden"),$.classList.add("hidden"),m.classList.add("hidden"))}T&&T.addEventListener("submit",async t=>{t.preventDefault(),b.classList.add("hidden"),r.disabled=!0,r.innerText="Signing In...";const e=await ie(M.value,D.value);r.disabled=!1,r.innerText="Sign In to Dashboard",e.success?I():(b.textContent=e.error||"Failed to authenticate.",b.classList.remove("hidden"))}),_&&_.addEventListener("click",async()=>{M.value="admin@accuratehealthcare.co.in",D.value="accurate2026",r.click()}),m&&m.addEventListener("click",async()=>{confirm("Are you sure you want to log out of the clinical dashboard?")&&(await le(),I())});function G(){const t=U();F.value=t.url||"https://esokkxwdzepdfsexebjr.supabase.co",v.value=t.key||"",d.classList.remove("hidden")}function f(){d.classList.add("hidden")}H&&H.addEventListener("click",G),g&&g.addEventListener("click",G),P&&P.addEventListener("click",f),d&&d.addEventListener("click",t=>{t.target===d&&f()}),N&&N.addEventListener("submit",t=>{t.preventDefault();const e=F.value.trim(),n=v.value.trim();W(e,n),L(),f(),c(),alert("Supabase credentials saved successfully!")}),j&&j.addEventListener("click",()=>{W("",""),v.value="",L(),f(),c(),alert("Switched to Local Demo Mode.")}),q.forEach(t=>{t.addEventListener("click",()=>{q.forEach(e=>{e.className="status-filter-btn px-2.5 py-1 rounded-lg text-slate-700 hover:text-navy-900 transition"}),t.className="status-filter-btn px-2.5 py-1 rounded-lg bg-navy-900 text-white transition",B=t.getAttribute("data-status"),u()})}),k&&k.addEventListener("change",()=>{C=k.value,u()});let K=null;w&&w.addEventListener("input",()=>{clearTimeout(K),K=setTimeout(()=>{E=w.value.trim(),u()},250)}),V&&V.addEventListener("click",()=>{z.classList.add("animate-spin"),c().finally(()=>{setTimeout(()=>z.classList.remove("animate-spin"),600)})});async function c(){const t=await re();t.success&&(i=t.data,O(i),u())}function O(t){const e=t.length,n=t.filter(s=>s.status==="pending").length,l=t.filter(s=>s.status==="confirmed").length,o=t.filter(s=>s.care_mode==="home").length;Q.textContent=e,Y.textContent=n,J.textContent=l,X.textContent=o}function u(){let t=[...i];if(B!=="all"&&(t=t.filter(e=>e.status===B)),C!=="all"&&(t=t.filter(e=>e.care_mode===C)),E){const e=E.toLowerCase();t=t.filter(n=>n.patient_name&&n.patient_name.toLowerCase().includes(e)||n.phone&&n.phone.includes(e)||n.booking_ref&&n.booking_ref.toLowerCase().includes(e)||n.condition&&n.condition.toLowerCase().includes(e))}if(Z.textContent=`Showing ${t.length} consultation inquiries`,!t.length){R.innerHTML=`
        <div class="p-12 text-center text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2 text-slate-300"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          <p class="text-sm font-bold text-slate-600">No appointments found</p>
          <p class="text-xs text-slate-400 mt-1">Try resetting search filters or submit a test booking from the homepage.</p>
        </div>
      `;return}R.innerHTML=t.map(e=>{const n=e.status==="pending",l=e.status==="confirmed",o=e.status==="completed",s=e.status==="cancelled";let a="";n?a='<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-amber-100 text-amber-800 border border-amber-300"><span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Pending</span>':l?a='<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">✓ Confirmed</span>':o?a='<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-sky-100 text-sky-800 border border-sky-300">✓ Completed</span>':a='<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-slate-100 text-slate-600 border border-slate-300">✕ Cancelled</span>';const x=e.created_at?new Date(e.created_at).toLocaleString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):"Recently",p=e.care_mode==="home",te=p?'<span class="inline-flex items-center gap-1 text-[11px] font-bold text-[#286491] bg-brand-50 px-2 py-0.5 rounded border border-brand-200">🏠 Home Physio</span>':'<span class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">🏥 Clinic Visit</span>',S=e.phone.replace(/[^0-9]/g,""),ne=S.startsWith("91")?S:"91"+S,se=encodeURIComponent(`Hello ${e.patient_name}, regarding your physiotherapy appointment at Accurate Healthcare (Ref: ${e.booking_ref}):

Your consultation for ${e.condition} (${p?"Home Physio":"NH-24 Ghaziabad Clinic"}) is confirmed with Dr. Manish Gupta & Dr. Vandana Choudhary.

Location: Ground Floor, 2C-Tower, Landcraft Golflinks Society, NH-24 Ghaziabad.
Clinic Phone: +91 99998 71475`);return`
        <div class="p-4 sm:p-5 hover:bg-slate-50/80 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4" data-id="${e.id}">
          
          <!-- Left Info Block -->
          <div class="space-y-1.5 flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-xs font-black text-navy-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md">
                ${e.booking_ref||"AH-BOOK"}
              </span>
              ${a}
              ${te}
              <span class="text-[11px] text-slate-400 font-medium ml-auto lg:ml-0">${x}</span>
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

            ${p&&e.location?`
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
            
            ${n?`
              <button data-action="confirm" data-id="${e.id}" class="action-btn px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black italic uppercase text-xs shadow-sm flex items-center gap-1 active:scale-95 transition">
                ✓ Confirm
              </button>
            `:""}

            <!-- 1-Click WhatsApp Button -->
            <a href="https://wa.me/${ne}?text=${se}" target="_blank" class="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center gap-1.5 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span>WhatsApp</span>
            </a>

            <!-- Direct Call Button -->
            <a href="tel:${e.phone}" class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold transition flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Call</span>
            </a>

            ${o?"":`
              <button data-action="complete" data-id="${e.id}" class="action-btn px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 text-xs font-bold transition" title="Mark consultation completed">
                ✓ Done
              </button>
            `}

            ${s?"":`
              <button data-action="cancel" data-id="${e.id}" class="action-btn px-2 py-1.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-700 text-xs transition" title="Cancel booking">
                ✕
              </button>
            `}

          </div>

        </div>
      `}).join(""),document.querySelectorAll(".action-btn").forEach(e=>{e.addEventListener("click",async n=>{const l=e.getAttribute("data-id"),o=e.getAttribute("data-action");let s="pending";if(o==="confirm")s="confirmed";else if(o==="complete")s="completed";else if(o==="cancel"){if(!confirm("Are you sure you want to cancel this appointment?"))return;s="cancelled"}e.disabled=!0,e.classList.add("opacity-50");const a=await de(l,s);if(a.success){const x=i.findIndex(p=>p.id===l);x!==-1&&(i[x].status=s,O(i),u())}else alert("Failed to update appointment: "+(a.error||"Unknown error"))})})}function ee(){ce(t=>{console.log("Realtime event received:",t);try{const e=new(window.AudioContext||window.webkitAudioContext),n=e.createOscillator();n.type="sine",n.frequency.setValueAtTime(587.33,e.currentTime),n.connect(e.destination),n.start(),n.stop(e.currentTime+.15)}catch{}c()})}});
