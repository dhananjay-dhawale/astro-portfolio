export default function MyProjects() {
  return (
    <section id="projects" className="py-20 px-6 text-white max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-purple-300 text-center drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)]">Projects</h2>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur max-w-xs w-full">
          <h3 className="text-xl font-semibold mb-2 text-white">GitHub README</h3>
          <p className="text-white/70">
            A personalized README with GitHub stats, activity graph, and profile overview—built using Markdown.
          </p>
        </div>
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur max-w-xs w-full">
          <h3 className="text-xl font-semibold mb-2 text-white">Portfolio Website</h3>
          <p className="text-white/70">
            A minimalist personal portfolio built using Astro, React, and TailwindCSS. Fully responsive and fast.
          </p>
        </div>
      </div>
    </section>
  );
}
