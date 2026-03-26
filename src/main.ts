// Utility to fetch and display Open Day data from public/OpenDay14.json
import './style.css'
import viteLogo from '/vite.svg'
import tailwindLogo from '/tailwindcss-mark.svg'
import typeScriptLogo from '/typescript.svg'
import cuLogo from '/cu-logo.svg'

async function loadOpenDay() {
  // Use the correct base path for GitHub Pages
  const base = import.meta.env.BASE_URL || '/';
  const res = await fetch(`${base}api/OpenDay.json`)
  const data = await res.json()
  return data
}

function renderOpenDay(data: any) {
  
  const app = document.querySelector<HTMLDivElement>('#app')!
  if (!data.topics) {
    app.innerHTML = '<p class="text-red-600">No Open Day data found.</p>'
    return
  }
  const selected = (document.getElementById('topicFilter') as HTMLSelectElement)?.value

  const filteredTopics = selected && selected !== "all"
    ? data.topics.filter((t: any) => t.name === selected)
    : data.topics
  app.innerHTML = `
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
          <img src="${viteLogo}" alt="Vite Logo" class="h-8 w-auto" />
        </a>
        <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
          <img src="${tailwindLogo}" alt="Tailwind CSS Logo" class="h-8 w-auto" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
          <img src="${typeScriptLogo}" alt="TypeScript Logo" class="h-8 w-auto" />
        </a>
      </div>
    </div>
    <main class="min-h-screen bg-gray-50 font-sans px-4 py-8">
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer">
          <img src="${cuLogo}" alt="Cardiff University Logo" class="h-16 w-auto" />
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
            ${data.topics.map((t: any) => `
              <option value="${t.name}" ${selected === t.name ? 'selected' : ''}>
                ${t.name}
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start">
        ${filteredTopics.map((topic: any) => topic && topic.name ? `
          <div 
              class="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition p-6 flex flex-col cursor-pointer"
              onclick="toggleEvents(${topic.id})"
              tabindex="0"
              role="button"
              aria-expanded="false"
              aria-controls="events-${topic.id}"
              onkeydown="if(event.key === 'Enter') toggleEvents(${topic.id})"
            >
            <img 
              src="${topic.cover_image ?? cuLogo}" 
              alt="${topic.name} cover image" 
              class="h-40 w-full object-cover rounded-lg mb-4 bg-gray-200" 
            />

            <h2 class="text-xl font-semibold text-gray-900 mb-2">${topic.name}</h2>
            <p class="text-cardiff-dark mb-2">${topic.description || ''}</p>
            ${topic.programs && topic.programs.length ? `
              <div class="mt-2 hidden" id="events-${topic.id}">
                <h3 class="font-semibold text-cardiff-dark mb-1">Events:</h3>
                <ul class="list-disc list-inside text-sm">
                  ${[...topic.programs]
  .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
  .map((prog: any) => prog && prog.title ? `
    <li class="mb-3">
      <div class="font-semibold text-cardiff-dark">${prog.title}</div>
      <div class="text-sm text-gray-600">
        ${
          prog.start_time
            ? new Date(prog.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            : ''
        }
        ${
          prog.end_time
            ? ` - ${new Date(prog.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
            : ''
        }
        ${prog.room ? ` • ${prog.room}` : ''}
      </div>
    </li>
  ` : '').join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        ` : '').join('')}
      </div>
    </div>
  `
  document.getElementById('topicFilter')?.addEventListener('change', () => {
  renderOpenDay(data)
})

}

loadOpenDay().then(renderOpenDay);

(window as any).toggleEvents = (id: number) => {
  // Close all other open sections
  document.querySelectorAll('[id^="events-"]').forEach((el) => {
    if (el.id !== `events-${id}`) {
      el.classList.add('hidden')
    }
  })

  // Toggle the clicked one
  const el = document.getElementById(`events-${id}`)
  if (el) {
    el.classList.toggle('hidden')
  }
}
