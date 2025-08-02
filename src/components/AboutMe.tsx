export default function AboutMe() {
  return (
    <section
      id="about"
      className="max-w-6xl mx-auto py-16 px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://via.placeholder.com/320"
            alt="Dhananjay Dhawale"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-lg border-4 border-purple-400"
          />
        </div>

        {/* Right Column: Text & Skills */}
        <div className="space-y-6">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-bold text-purple-300 drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)]">
            Full-Stack Developer
          </h1>

          {/* Bio */}
          <p className="text-lg text-gray-200 leading-relaxed">
            I'm a passionate software developer who loves building clean backends and smooth user experiences. I currently work with <strong>Spring Boot</strong> and <strong>Angular</strong>, and I'm always exploring new tools and frameworks to push my limits.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed">
            My background in <strong>competitive programming</strong> sharpens how I approach code—focusing on logic, performance, and clarity. Beyond code, you'll find me experimenting with frameworks like <strong>Astro</strong> and <strong>React</strong>, or playing a game of chess to stay sharp.
          </p>

          {/* Skills */}
          <div>
            <h2 className="text-2xl font-bold text-purple-300 mb-4 drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)]">
              Core Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                'Java',
                'Spring Boot',
                'Angular',
                'React',
                'PostgreSQL',
                'MongoDB',
                'Docker',
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 transition duration-200 hover:bg-purple-500 hover:text-white hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
