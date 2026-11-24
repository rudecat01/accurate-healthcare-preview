import{i as me,g as te,a as ge,l as he,b as fe,s as xe,c as ne,f as be,u as ve,d as ye}from"./supabase-B6kY-wOV.js";/* empty css              */document.addEventListener("DOMContentLoaded",()=>{const P=document.getElementById("authView"),F=document.getElementById("dashboardView"),H=document.getElementById("loginForm"),h=document.getElementById("loginEmail"),se=document.getElementById("loginPassword"),k=document.getElementById("loginError"),f=document.getElementById("loginSubmitBtn");document.getElementById("quickDemoLoginBtn");const x=document.getElementById("logoutBtn"),b=document.getElementById("dbStatusBtn"),B=document.getElementById("dbStatusDot"),E=document.getElementById("dbStatusText"),c=document.getElementById("settingsModal"),N=document.getElementById("openSettingsBtn"),R=document.getElementById("closeSettingsBtn"),j=document.getElementById("settingsForm"),V=document.getElementById("settingUrl"),L=document.getElementById("settingAnonKey"),q=document.getElementById("useMockBtn"),oe=document.getElementById("statTotal"),ae=document.getElementById("statPending"),ie=document.getElementById("statConfirmed"),re=document.getElementById("statHome"),C=document.getElementById("searchInput"),I=document.getElementById("careModeSelect"),G=document.querySelectorAll(".status-filter-btn"),U=document.getElementById("refreshBtn"),K=document.getElementById("refreshIcon"),O=document.getElementById("appointmentsList"),le=document.getElementById("tableCountText");let S="all",$="all",A="",i=[];M(),_();function M(){const t=me(),e=te();t?(B.className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse",E.textContent="Supabase Cloud (Live)",b.className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition bg-emerald-950/60 text-emerald-300 border-emerald-700 hover:border-emerald-500"):e.key?(B.className="w-2 h-2 rounded-full bg-emerald-400",E.textContent="Connecting..."):(B.className="w-2 h-2 rounded-full bg-amber-400",E.textContent="Demo Mode (Paste Key)",b.className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition bg-amber-950/60 text-amber-300 border-amber-700 hover:border-amber-500")}function a(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function _(){ge()?(P.classList.add("hidden"),F.classList.remove("hidden"),x.classList.remove("hidden"),u(),de()):(P.classList.remove("hidden"),F.classList.add("hidden"),x.classList.add("hidden"))}H&&H.addEventListener("submit",async t=>{t.preventDefault(),k.classList.add("hidden"),f.disabled=!0,f.innerText="Signing In...";const e=await he(h.value,se.value);f.disabled=!1,f.innerText="Sign In to Dashboard",e.success?_():(k.textContent=e.error||"Failed to authenticate.",k.classList.remove("hidden"))}),x&&x.addEventListener("click",async()=>{confirm("Are you sure you want to log out of the clinical dashboard?")&&(await fe(),_())});const p=document.getElementById("resetPasswordModal"),z=document.getElementById("openResetModalBtn"),W=document.getElementById("closeResetModalBtn"),J=document.getElementById("resetPasswordForm"),T=document.getElementById("resetEmail"),r=document.getElementById("resetFeedback"),v=document.getElementById("sendResetBtn");z&&z.addEventListener("click",()=>{p&&(T&&h.value&&(T.value=h.value.includes("@")?h.value:""),r.classList.add("hidden"),r.innerHTML="",p.classList.remove("hidden"))}),W&&W.addEventListener("click",()=>{p==null||p.classList.add("hidden")}),J&&J.addEventListener("submit",async t=>{t.preventDefault();const e=T.value.trim();if(!e)return;v.disabled=!0,v.innerHTML='<span class="inline-block animate-spin mr-1">⏳</span> Sending...';const n=await xe(e);v.disabled=!1,v.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        <span>Send Reset Link to Gmail</span>
      `,n.success?(r.className="p-3 rounded-xl text-xs font-bold leading-relaxed bg-emerald-50 border border-emerald-200 text-emerald-800",r.innerHTML=`
          <div class="flex items-center gap-2 mb-1.5 text-emerald-900 font-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <span>Reset Link Dispatched!</span>
          </div>
          <span>A secure reset link has been dispatched to <b>${e}</b>. Please check your Gmail inbox and Spam folder.</span>
          <a href="https://mail.google.com" target="_blank" class="mt-3.5 inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black uppercase text-[11px] shadow-[2px_2px_0px_#0e1d3e] transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span>Open Gmail Inbox</span>
          </a>
        `,r.classList.remove("hidden")):(r.className="p-3 rounded-xl text-xs font-bold leading-relaxed bg-rose-50 border border-rose-200 text-rose-800",r.textContent=n.error||"Failed to send reset link.",r.classList.remove("hidden"))});function Q(){const t=te();V.value=t.url||"https://esokkxwdzepdfsexebjr.supabase.co",L.value=t.key||"",c.classList.remove("hidden")}function y(){c.classList.add("hidden")}N&&N.addEventListener("click",Q),b&&b.addEventListener("click",Q),R&&R.addEventListener("click",y),c&&c.addEventListener("click",t=>{t.target===c&&y()}),j&&j.addEventListener("submit",t=>{t.preventDefault();const e=V.value.trim(),n=L.value.trim();ne(e,n),M(),y(),u(),alert("Supabase credentials saved successfully!")}),q&&q.addEventListener("click",()=>{ne("",""),L.value="",M(),y(),u(),alert("Switched to Local Demo Mode.")}),G.forEach(t=>{t.addEventListener("click",()=>{G.forEach(e=>{e.className="status-filter-btn px-2.5 py-1 rounded-lg text-slate-700 hover:text-navy-900 transition"}),t.className="status-filter-btn px-2.5 py-1 rounded-lg bg-navy-900 text-white transition",S=t.getAttribute("data-status"),m()})}),I&&I.addEventListener("change",()=>{$=I.value,m()});let Y=null;C&&C.addEventListener("input",()=>{clearTimeout(Y),Y=setTimeout(()=>{A=C.value.trim(),m()},250)}),U&&U.addEventListener("click",()=>{K.classList.add("animate-spin"),u().finally(()=>{setTimeout(()=>K.classList.remove("animate-spin"),600)})});async function u(){const t=await be();t.success&&(i=t.data,Z(i),m())}function Z(t){const e=t.length,n=t.filter(s=>s.status==="pending").length,l=t.filter(s=>s.status==="confirmed").length,o=t.filter(s=>s.care_mode==="home").length;oe.textContent=e,ae.textContent=n,ie.textContent=l,re.textContent=o}function m(){let t=[...i];if(S!=="all"&&(t=t.filter(e=>e.status===S)),$!=="all"&&(t=t.filter(e=>e.care_mode===$)),A){const e=A.toLowerCase();t=t.filter(n=>n.patient_name&&n.patient_name.toLowerCase().includes(e)||n.phone&&n.phone.includes(e)||n.booking_ref&&n.booking_ref.toLowerCase().includes(e)||n.condition&&n.condition.toLowerCase().includes(e))}if(le.textContent=`Showing ${t.length} consultation inquiries`,!t.length){O.innerHTML=`
        <div class="p-12 text-center text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2 text-slate-300"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          <p class="text-sm font-bold text-slate-600">No appointments found</p>
          <p class="text-xs text-slate-400 mt-1">Try resetting search filters or submit a test booking from the homepage.</p>
        </div>
      `;return}O.innerHTML=t.map(e=>{const n=e.status==="pending",l=e.status==="confirmed",o=e.status==="completed",s=e.status==="cancelled";let d="";n?d='<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-amber-100 text-amber-800 border border-amber-300"><span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Pending</span>':l?d='<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">✓ Confirmed</span>':o?d='<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-sky-100 text-sky-800 border border-sky-300">✓ Completed</span>':d='<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black italic uppercase bg-slate-100 text-slate-600 border border-slate-300">✕ Cancelled</span>';const w=e.created_at?new Date(e.created_at).toLocaleString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):"Recently",g=e.care_mode==="home",ce=g?'<span class="inline-flex items-center gap-1 text-[11px] font-bold text-[#286491] bg-brand-50 px-2 py-0.5 rounded border border-brand-200">🏠 Home Physio</span>':'<span class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">🏥 Clinic Visit</span>',D=(e.phone||"").replace(/[^0-9]/g,""),ee=(e.phone||"").replace(/[^0-9+]/g,""),pe=D.startsWith("91")?D:"91"+D,ue=encodeURIComponent(`Hello ${e.patient_name||"Patient"}, regarding your physiotherapy appointment at Accurate Healthcare (Ref: ${e.booking_ref||""}):

Your consultation for ${e.condition||"Physiotherapy"} (${g?"Home Physio":"NH-24 Mehrauli Clinic"}) is confirmed with Dr. Manish Gupta & Dr. Vandana Choudhary.

Location: Shop-1, Mehrauli Underpass, Near Vikranta Grand Farm House, NH-24, Mehrauli, Ghaziabad, UP
Google Maps: https://maps.app.goo.gl/MJFeaR4iK6EfgqxN7
Clinic Phone: +91 99998 71475 / 76690 32764`);return`
        <div class="p-4 sm:p-5 hover:bg-slate-50/80 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4" data-id="${a(e.id)}">
          
          <!-- Left Info Block -->
          <div class="space-y-1.5 flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-xs font-black text-navy-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md">
                ${a(e.booking_ref||"AH-BOOK")}
              </span>
              ${d}
              ${ce}
              <span class="text-[11px] text-slate-400 font-medium ml-auto lg:ml-0">${a(w)}</span>
            </div>

            <div class="flex flex-wrap items-baseline gap-2 pt-0.5">
              <h4 class="text-base font-black uppercase italic text-navy-900">${a(e.patient_name)}</h4>
              <a href="tel:${ee}" class="text-xs font-bold text-[#367fb5] hover:underline flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                ${a(e.phone)}
              </a>
            </div>

            <p class="text-xs font-bold text-slate-700">
              Condition: <span class="text-[#286491]">${a(e.condition)}</span>
            </p>

            ${g&&e.location?`
              <p class="text-xs text-slate-600 flex items-start gap-1">
                <span class="font-bold text-slate-700 shrink-0">📍 Address:</span>
                <span class="truncate">${a(e.location)}</span>
              </p>
            `:""}

            ${e.notes?`
              <p class="text-xs text-slate-500 italic bg-amber-50/80 border border-amber-200/80 p-2 rounded-lg mt-1">
                "${a(e.notes)}"
              </p>
            `:""}
          </div>

          <!-- Right Action Controls -->
          <div class="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            
            ${n?`
              <button data-action="confirm" data-id="${a(e.id)}" class="action-btn px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black italic uppercase text-xs shadow-sm flex items-center gap-1 active:scale-95 transition">
                ✓ Confirm
              </button>
            `:""}

            <!-- 1-Click WhatsApp Button -->
            <a href="https://wa.me/${pe}?text=${ue}" target="_blank" class="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center gap-1.5 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span>WhatsApp</span>
            </a>

            <!-- Direct Call Button -->
            <a href="tel:${ee}" class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold transition flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Call</span>
            </a>

            ${o?"":`
              <button data-action="complete" data-id="${a(e.id)}" class="action-btn px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 text-xs font-bold transition" title="Mark consultation completed">
                ✓ Done
              </button>
            `}

            ${s?"":`
              <button data-action="cancel" data-id="${a(e.id)}" class="action-btn px-2 py-1.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-700 text-xs transition" title="Cancel booking">
                ✕
              </button>
            `}

          </div>

        </div>
      `}).join(""),document.querySelectorAll(".action-btn").forEach(e=>{e.addEventListener("click",async n=>{const l=e.getAttribute("data-id"),o=e.getAttribute("data-action");let s="pending";if(o==="confirm")s="confirmed";else if(o==="complete")s="completed";else if(o==="cancel"){if(!confirm("Are you sure you want to cancel this appointment?"))return;s="cancelled"}e.disabled=!0,e.classList.add("opacity-50");const d=await ve(l,s);if(d.success){const w=i.findIndex(g=>g.id===l);w!==-1&&(i[w].status=s,Z(i),m())}else alert("Failed to update appointment: "+(d.error||"Unknown error"))})})}const X=document.getElementById("exportCsvBtn");X&&X.addEventListener("click",()=>{if(!i||!i.length){alert("No appointment records available to export.");return}const t=["Booking Ref","Patient Name","Phone","Care Mode","Location","Condition","Status","Booking Date","Doctor"],e=i.map(s=>[`"${s.booking_ref||""}"`,`"${(s.patient_name||"").replace(/"/g,'""')}"`,`"${s.phone||""}"`,`"${s.care_mode==="home"?"Home Physio":"Clinic Visit"}"`,`"${(s.location||"").replace(/"/g,'""')}"`,`"${(s.condition||"").replace(/"/g,'""')}"`,`"${s.status||"pending"}"`,`"${s.created_at?new Date(s.created_at).toLocaleDateString("en-IN"):""}"`,`"${(s.assigned_doctor||"Dr. Manish Gupta & Dr. Vandana Choudhary").replace(/"/g,'""')}"`]),n="data:text/csv;charset=utf-8,\uFEFF"+[t.join(","),...e.map(s=>s.join(","))].join(`
`),l=encodeURI(n),o=document.createElement("a");o.setAttribute("href",l),o.setAttribute("download",`accurate_healthcare_appointments_${new Date().toISOString().slice(0,10)}.csv`),document.body.appendChild(o),o.click(),document.body.removeChild(o)});function de(){ye(t=>{console.log("Realtime event received:",t);try{const e=new(window.AudioContext||window.webkitAudioContext),n=e.createOscillator();n.type="sine",n.frequency.setValueAtTime(587.33,e.currentTime),n.connect(e.destination),n.start(),n.stop(e.currentTime+.15)}catch{}u()})}});
