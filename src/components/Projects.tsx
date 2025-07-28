// src/components/Projects.tsx
export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-black text-white max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-sky-400">projects</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur">
          <h3 className="text-xl font-semibold mb-2 text-white">github readme</h3>
          <p className="text-white/70">custom readme with github stats, activity graph, and profile overview using markdown.</p>
        </div>
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur">
          <h3 className="text-xl font-semibold mb-2 text-white">portfolio website</h3>
          <p className="text-white/70">minimal personal portfolio built using astro, react, and tailwind. fully responsive.</p>
        </div>
      </div>
    </section>
  );
}
