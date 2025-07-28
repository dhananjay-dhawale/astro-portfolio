export default function Hero() {
  return (
    <section
      className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-black via-slate-900 to-black pt-8 pb-8"
      id="hero"
    >
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-2xl w-full border border-white/10">
        <h2 className="text-4xl sm:text-6xl font-bold text-sky-400 mb-4 drop-shadow-md animate-fade-in">
          hi, i’m dhananjay 👋
        </h2>
        <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
          i’m a software developer specializing in <span className="text-sky-300 font-medium">java</span>,{' '}
          <span className="text-sky-300 font-medium">spring boot</span>, and{' '}
          <span className="text-sky-300 font-medium">angular</span> — with a love for competitive programming
          and building clean web experiences.
        </p>
      </div>
    </section>
  );
}
