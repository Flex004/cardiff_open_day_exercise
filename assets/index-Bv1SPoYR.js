(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const d="/CUOpenDayTest/vite.svg",c="/CUOpenDayTest/tailwindcss-mark.svg",f="/CUOpenDayTest/typescript.svg",a="/CUOpenDayTest/cu-logo.svg";async function m(){return await(await fetch("/CUOpenDayTest/api/OpenDay.json")).json()}function l(s){const r=document.querySelector("#app");if(!s.topics){r.innerHTML='<p class="text-red-600">No Open Day data found.</p>';return}const i=document.getElementById("topicFilter")?.value,n=i&&i!=="all"?s.topics.filter(e=>e.name===i):s.topics;r.innerHTML=`
  <a 
    href="#page-title" 
    class="absolute left-0 top-0 m-2 p-2 bg-white text-cardiff-red border border-cardiff-red rounded shadow focus:translate-y-0 -translate-y-20 focus:outline-none transition"
  >
    Skip to main content
  </a>


    <div class="demo-banner w-full bg-yellow-300 text-black flex flex-col sm:flex-row items-center justify-between px-4 py-2 mb-6 gap-2 border-b-2 border-yellow-500">
      <div class="font-bold text-lg flex-1 text-center sm:text-left">This is a demo app</div>
      <div class="flex flex-row items-center gap-3 justify-center">
        <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">
          <img src="${d}" alt="Vite Logo" class="h-8 w-auto" />
        </a>
        <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
          <img src="${c}" alt="Tailwind CSS Logo" class="h-8 w-auto" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
          <img src="${f}" alt="TypeScript Logo" class="h-8 w-auto" />
        </a>
      </div>
    </div>
    <main class="min-h-screen bg-gray-50 font-sans px-4 py-8">
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer">
          <img src="${a}" alt="Cardiff University Logo" class="h-16 w-auto" />
        </a>
      </div>
      <div class="w-full bg-cardiff-red py-10">
        <div class="container mx-auto px-4">
          <h1 
            id="page-title"
            class="text-white text-3xl sm:text-5xl font-bold"
          >
            Cardiff University Open Day
          </h1>
        </div>
      </div>

      <div class="sticky top-0 z-10 bg-gray-50 py-4 mb-6 shadow-sm">
        <div class="text-center">
          <select
            id="topicFilter"
            class="p-3 border border-gray-300 rounded-lg shadow-md bg-white text-gray-800 focus:ring-2 focus:ring-cardiff-red focus:border-cardiff-red transition"
          >
            <option value="all">All Subjects</option>
            ${s.topics.map(e=>`
              <option value="${e.name}" ${i===e.name?"selected":""}>
                ${e.name}
              </option>
            `).join("")}
          </select>
        </div>
      </div>

      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start">
        ${n.map(e=>e&&e.name?`
          <div 
              class="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition p-6 flex flex-col cursor-pointer"
              onclick="toggleEvents(${e.id})"
              tabindex="0"
              role="button"
              aria-expanded="false"
              aria-controls="events-${e.id}"
              onkeydown="if(event.key === 'Enter') toggleEvents(${e.id})"
            >
            <img 
              src="${e.cover_image??a}" 
              alt="${e.name} cover image" 
              class="h-40 w-full object-cover rounded-lg mb-4 bg-gray-200" 
            />

            <h2 class="text-xl font-semibold text-gray-900 mb-2">${e.name}</h2>
            <p class="text-cardiff-dark mb-2">${e.description||""}</p>
            ${e.programs&&e.programs.length?`
              <div class="mt-2 hidden" id="events-${e.id}">
                <h3 class="font-semibold text-cardiff-dark mb-1">Events:</h3>
                <ul class="list-disc list-inside text-sm">
                  ${[...e.programs].sort((t,o)=>new Date(t.start_time).getTime()-new Date(o.start_time).getTime()).map(t=>t&&t.title?`
    <li class="mb-3">
      <div class="font-semibold text-cardiff-dark">${t.title}</div>
      <div class="text-sm text-gray-600">
        ${t.start_time?new Date(t.start_time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""}
        ${t.end_time?` - ${new Date(t.end_time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:""}
        ${t.room?` • ${t.room}`:""}
      </div>
    </li>
  `:"").join("")}
                </ul>
              </div>
            `:""}
          </div>
        `:"").join("")}
      </div>
    </div>
  `,document.getElementById("topicFilter")?.addEventListener("change",()=>{l(s)})}m().then(l);window.toggleEvents=s=>{document.querySelectorAll('[id^="events-"]').forEach(i=>{i.id!==`events-${s}`&&i.classList.add("hidden")});const r=document.getElementById(`events-${s}`);r&&r.classList.toggle("hidden")};
